import { CrmLead, CrmLeadPayload, CrmConfig, LeadStatus } from '../types/crm';

const LOCAL_STORAGE_KEY = 'pentagram_crm_leads';
const LOCAL_CONFIG_KEY = 'pentagram_crm_config';

const DEFAULT_CONFIG: CrmConfig = {
  webhookUrl: '',
  apiKey: '',
  autoSync: true,
};

// Seed sample leads if local store is empty so the CRM portal is immediately functional
const INITIAL_DEMO_LEADS: CrmLead[] = [
  {
    id: 'LEAD-PNT-1092',
    name: 'Vikram & Aarti Sharma',
    phone: '9810145290',
    email: 'vikram.sharma@dlf.in',
    city: 'Gurgaon',
    society: 'DLF The Crest (Sector 54)',
    source: 'design_os_estimator',
    projectType: 'Full Home Interior',
    propertyType: '3 BHK',
    budgetRange: '₹14.5L - ₹18.0L',
    estimatedCost: 1580000,
    possessionStatus: 'Within 30 Days',
    notes: 'Interested in German CNC acrylic finish for modular kitchen with quartz counter.',
    otpVerified: true,
    status: 'Site Visit Scheduled',
    syncedToWebhook: true,
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'LEAD-PNT-1091',
    name: 'Dr. Ananya Sen',
    phone: '9873210456',
    email: 'ananya.sen@maxhealthcare.com',
    city: 'Noida',
    society: 'ATS Knightsbridge (Sector 129)',
    source: 'consultation_modal',
    projectType: 'Modular Kitchen & Wardrobes',
    propertyType: '4 BHK / Villa',
    budgetRange: '₹8.0L - ₹12.0L',
    estimatedCost: 950000,
    possessionStatus: 'Ready to Move',
    notes: 'Needs floor-to-ceiling lacquered glass wardrobes and Hafele soft-close fittings.',
    otpVerified: true,
    status: 'Quotation Sent',
    syncedToWebhook: true,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'LEAD-PNT-1090',
    name: 'Rohan Mehra',
    phone: '9911883344',
    email: 'rohan.mehra@gmail.com',
    city: 'Delhi',
    society: 'Greater Kailash II Floors',
    source: 'whatsapp_site_visit',
    projectType: 'Renovation & Civil',
    propertyType: '3 BHK',
    budgetRange: '₹12.0L - ₹16.0L',
    estimatedCost: 1320000,
    possessionStatus: 'Ready to Move',
    notes: 'Booked direct site measurement via WhatsApp verification.',
    otpVerified: true,
    status: 'New',
    syncedToWebhook: false,
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

export function getLocalLeads(): CrmLead[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_LEADS;
  }
}

export function saveLocalLeads(leads: CrmLead[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save CRM leads locally:', e);
  }
}

export function getCrmConfig(): CrmConfig {
  try {
    const raw = localStorage.getItem(LOCAL_CONFIG_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveCrmConfig(config: CrmConfig) {
  try {
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save CRM config:', e);
  }
}

/**
 * Submit Lead to CRM:
 * 1. Posts to /api/crm/leads backend
 * 2. Saves to local store backup
 * 3. Triggers Webhook if configured
 * 4. Dispatches custom browser event
 */
export async function submitLeadToCrm(payload: CrmLeadPayload): Promise<{
  success: boolean;
  leadId: string;
  lead: CrmLead;
  webhookSynced: boolean;
}> {
  const newLead: CrmLead = {
    ...payload,
    id: `LEAD-PNT-${Date.now().toString().slice(-4)}`,
    status: 'New',
    syncedToWebhook: false,
    createdAt: new Date().toISOString(),
  };

  // 1. Immediately save to local backup
  const currentLeads = getLocalLeads();
  const updatedLeads = [newLead, ...currentLeads];
  saveLocalLeads(updatedLeads);

  // 2. Attempt server backend delivery
  let serverAccepted = false;
  try {
    const res = await fetch('/api/crm/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLead),
    });

    if (res.ok) {
      const data = await res.json();
      serverAccepted = true;
      if (data.lead) {
        newLead.syncedToWebhook = data.lead.syncedToWebhook;
        newLead.webhookResponse = data.lead.webhookResponse;
        newLead.dzyloSynced = data.lead.dzyloSynced;
        newLead.dzyloResponse = data.lead.dzyloResponse;
        // Update local backup with server response
        saveLocalLeads([newLead, ...currentLeads.filter((l) => l.id !== newLead.id)]);
      }
    }
  } catch (err) {
    console.warn('Backend CRM endpoint unreachable, saved to client queue:', err);
  }

  // 3. If direct client-configured webhook is present and server hasn't forwarded it:
  const config = getCrmConfig();
  if (config.webhookUrl && !newLead.syncedToWebhook) {
    try {
      await forwardToExternalWebhook(config.webhookUrl, config.apiKey, newLead);
      newLead.syncedToWebhook = true;
      newLead.webhookResponse = 'Dispatched from browser client';
      saveLocalLeads([newLead, ...currentLeads.filter((l) => l.id !== newLead.id)]);
    } catch (e) {
      console.warn('Direct client webhook forward error (may be CORS):', e);
    }
  }

  // 4. Notify app components (CRM Dashboard, toasts, badges)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('crm:lead-added', {
        detail: { lead: newLead, serverAccepted },
      })
    );
  }

  return {
    success: true,
    leadId: newLead.id,
    lead: newLead,
    webhookSynced: !!newLead.syncedToWebhook,
  };
}

/**
 * Update a lead's pipeline status
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus,
  notes?: string
): Promise<boolean> {
  const currentLeads = getLocalLeads();
  const updated = currentLeads.map((l) => {
    if (l.id === leadId) {
      return {
        ...l,
        status: newStatus,
        notes: notes !== undefined ? notes : l.notes,
        updatedAt: new Date().toISOString(),
      };
    }
    return l;
  });

  saveLocalLeads(updated);

  try {
    await fetch(`/api/crm/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    });
  } catch {
    // Offline update successful in local storage
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('crm:lead-updated', { detail: { leadId, newStatus } }));
  }

  return true;
}

/**
 * Fetch all leads from server or fallback to local storage
 */
export async function fetchAllLeads(): Promise<CrmLead[]> {
  try {
    const res = await fetch('/api/crm/leads');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.leads) && data.leads.length > 0) {
        // Merge with local leads to prevent loss of offline submissions
        const local = getLocalLeads();
        const mergedMap = new Map<string, CrmLead>();
        data.leads.forEach((l: CrmLead) => mergedMap.set(l.id, l));
        local.forEach((l) => {
          if (!mergedMap.has(l.id)) mergedMap.set(l.id, l);
        });
        const finalLeads = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        saveLocalLeads(finalLeads);
        return finalLeads;
      }
    }
  } catch {
    // Server offline, use local
  }
  return getLocalLeads();
}

/**
 * Test external CRM webhook endpoint
 */
export async function testWebhookEndpoint(
  webhookUrl: string,
  apiKey?: string
): Promise<{ success: boolean; status?: number; message: string }> {
  try {
    const testPayload = {
      event: 'crm.webhook.test',
      timestamp: new Date().toISOString(),
      testLead: {
        id: 'TEST-LEAD-001',
        fullName: 'Test Customer (Pentagram Verification)',
        phoneNumber: '+919999999999',
        email: 'test@pentagram.expert',
        city: 'Gurgaon',
        societySector: 'DLF Phase 5',
        projectScope: 'Full Home Interior',
        estimatedValue: 1500000,
        status: 'Test Connection',
      },
    };

    // First try via backend proxy to bypass browser CORS restrictions
    const backendTest = await fetch('/api/crm/test-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ webhookUrl, apiKey, payload: testPayload }),
    });

    if (backendTest.ok) {
      const resData = await backendTest.json();
      return {
        success: resData.success,
        status: resData.status,
        message: resData.message || 'Webhook successfully received test payload!',
      };
    }

    // Direct browser attempt fallback
    const directRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(testPayload),
    });

    return {
      success: directRes.ok,
      status: directRes.status,
      message: directRes.ok
        ? `Webhook endpoint returned HTTP ${directRes.status} OK`
        : `Webhook endpoint returned HTTP ${directRes.status}`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error or CORS restriction';
    return {
      success: false,
      message: `Failed to reach webhook: ${msg}`,
    };
  }
}

async function forwardToExternalWebhook(url: string, apiKey: string | undefined, lead: CrmLead) {
  const payload = {
    event: 'pentagram.lead.created',
    leadId: lead.id,
    timestamp: lead.createdAt,
    customer: {
      name: lead.name,
      phone: `+91${lead.phone.replace(/\D/g, '')}`,
      email: lead.email || '',
      city: lead.city,
      society: lead.society || '',
      projectType: lead.projectType,
      propertyType: lead.propertyType || '',
      budgetRange: lead.budgetRange || '',
      estimatedCost: lead.estimatedCost || 0,
      possessionStatus: lead.possessionStatus || '',
      notes: lead.notes || '',
      source: lead.source,
      otpVerified: !!lead.otpVerified,
    },
    meta: {
      brand: 'Pentagram: Your Space Expert',
      company: 'Verdoire Interiors & Furnishings Pvt. Ltd.',
      website: 'pentagram.expert',
      serviceScope: 'Strictly Delhi NCR',
    },
  };

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(payload),
    mode: 'no-cors', // Avoid breaking if external CRM doesn't provide CORS headers
  });
}

/**
 * Export Leads to CSV Format
 */
export function exportLeadsToCsv(leads: CrmLead[]): string {
  const headers = [
    'Lead ID',
    'Date & Time',
    'Customer Name',
    'Phone Number',
    'Email',
    'City',
    'Society / Sector',
    'Project Type',
    'Property Type',
    'Estimated Cost (INR)',
    'Budget Range',
    'Source Channel',
    'Phone OTP Verified',
    'Status',
    'Notes',
  ];

  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString('en-IN')}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"+91 ${l.phone}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${l.city}"`,
    `"${(l.society || '').replace(/"/g, '""')}"`,
    `"${(l.projectType || '').replace(/"/g, '""')}"`,
    `"${(l.propertyType || '').replace(/"/g, '""')}"`,
    l.estimatedCost ? `${l.estimatedCost}` : '""',
    `"${(l.budgetRange || '').replace(/"/g, '""')}"`,
    `"${l.source}"`,
    l.otpVerified ? '"Yes"' : '"No"',
    `"${l.status}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
