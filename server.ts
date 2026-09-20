import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface ServerCrmLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  society?: string;
  location?: string;
  source: string;
  projectType: string;
  propertyType?: string;
  budgetRange?: string;
  budget?: string;
  estimatedCost?: number;
  possessionStatus?: string;
  notes?: string;
  projectDetails?: string;
  specs?: Record<string, unknown>;
  otpVerified?: boolean;
  status: string;
  dzyloSynced?: boolean;
  dzyloResponse?: any;
  syncedToWebhook?: boolean;
  webhookResponse?: string;
  createdAt: string;
  updatedAt?: string;
}

interface ServerCrmConfig {
  webhookUrl: string;
  apiKey?: string;
  autoSync: boolean;
  notifyEmail?: string;
}

// -------------------------------------------------------------
// DZYLO CRM INTEGRATION CONFIGURATION
// -------------------------------------------------------------
const DZYLO_ENDPOINT = 'https://extapi.dzylo.com';
const DZYLO_DEFAULT_API_TOKEN = '01K5K2MKGEN0G0YZMNJ77XG6Z7';

interface DzyloPayload {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  comment: string;
  tags: string[];
  budget: string;
  scope: string;
  city: string;
  state: string;
  country: string;
}

/**
 * Forwards lead to Dzylo CRM via https://extapi.dzylo.com
 * Formats payload according to Dzylo API contract.
 */
async function forwardLeadToDzylo(lead: Partial<ServerCrmLead>): Promise<{
  success: boolean;
  status: number;
  response: any;
  payload: DzyloPayload;
}> {
  const apiToken = process.env.DZYLO_API_TOKEN || DZYLO_DEFAULT_API_TOKEN;
  const rawPhone = String(lead.phone || '');
  const cleanPhone = rawPhone.replace(/\D/g, '');

  const location =
    lead.location ||
    [lead.society, lead.city].filter(Boolean).join(', ') ||
    lead.city ||
    'Delhi NCR';

  const projectType = lead.projectType || 'Full Home Interior';

  const budget =
    lead.budget ||
    lead.budgetRange ||
    (lead.estimatedCost
      ? `₹${(lead.estimatedCost / 100000).toFixed(1)} Lakhs`
      : 'Turnkey Interior Package');

  // Build Project Details
  const detailLines: string[] = [];
  if (lead.propertyType) detailLines.push(`Configuration: ${lead.propertyType}`);
  if (lead.possessionStatus) detailLines.push(`Possession: ${lead.possessionStatus}`);
  if (lead.source) detailLines.push(`Source: ${lead.source}`);
  if (lead.otpVerified) detailLines.push(`OTP Verified: Yes`);
  if (lead.projectDetails) detailLines.push(lead.projectDetails);
  if (lead.notes && lead.notes !== lead.projectDetails) detailLines.push(`Notes: ${lead.notes}`);
  if (lead.specs && Object.keys(lead.specs).length > 0) {
    try {
      const specsSummary = Object.entries(lead.specs)
        .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join(', ');
      detailLines.push(`Specs: ${specsSummary}`);
    } catch {
      // ignore
    }
  }

  const projectDetailsText =
    detailLines.join('\n') || 'Website inquiry for turnkey design consultation and site visit.';

  // Build Dzylo comment matching the exact PHP code structure:
  const comment = `Location: ${location}

Service Required: ${projectType}

Budget: ${budget}

Project Details:
${projectDetailsText}`.trim();

  const tags: string[] = [];
  if (projectType) tags.push(projectType);
  if (lead.city) tags.push(lead.city);

  // State resolution matching the PHP contract:
  // (($input["city"] ?? "") === "Gurgaon") ? "Haryana" : "Other"
  const city = lead.city || '';
  const cityLower = city.toLowerCase();
  let state = 'Haryana';
  if (cityLower === 'gurgaon' || cityLower === 'faridabad') {
    state = 'Haryana';
  } else if (cityLower.includes('noida')) {
    state = 'Uttar Pradesh';
  } else if (cityLower.includes('delhi')) {
    state = 'Delhi';
  } else {
    state = city === 'Gurgaon' ? 'Haryana' : 'Other';
  }

  const payload: DzyloPayload = {
    name: lead.name || 'Website Inquiry',
    countryCode: '+91',
    phone: cleanPhone,
    email: lead.email || '',
    comment,
    tags,
    budget,
    scope: projectType,
    city: lead.city || '',
    state,
    country: 'India',
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout matching PHP curl

  try {
    const res = await fetch(DZYLO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json().catch(() => null);
    const isSuccess = res.status === 200;

    console.log(`[Dzylo CRM] Dispatched lead for ${payload.name} (${cleanPhone}) -> HTTP ${res.status}:`, data);

    return {
      success: isSuccess,
      status: res.status,
      response: data,
      payload,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errMsg = err instanceof Error ? err.message : 'Connection failed';
    console.error(`[Dzylo CRM] Failed to dispatch lead to Dzylo:`, errMsg);
    return {
      success: false,
      status: 500,
      response: errMsg,
      payload,
    };
  }
}

const DATA_FILE = path.join(process.cwd(), 'crm-leads-store.json');
const CONFIG_FILE = path.join(process.cwd(), 'crm-config.json');

// Helper to load leads from persistent file
function loadLeads(): ServerCrmLead[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading crm-leads-store.json:', err);
  }
  return [];
}

// Helper to save leads to persistent file
function saveLeads(leads: ServerCrmLead[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing crm-leads-store.json:', err);
  }
}

// Helper to load CRM config
function loadConfig(): ServerCrmConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading crm-config.json:', err);
  }
  return {
    webhookUrl: process.env.CRM_WEBHOOK_URL || '',
    apiKey: process.env.CRM_API_KEY || '',
    autoSync: true,
  };
}

function saveConfig(cfg: ServerCrmConfig) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing crm-config.json:', err);
  }
}

async function forwardLeadToWebhook(lead: ServerCrmLead, webhookUrl: string, apiKey?: string) {
  const payload = {
    event: 'lead.created',
    leadId: lead.id,
    timestamp: lead.createdAt,
    customer: {
      fullName: lead.name,
      phoneNumber: `+91${lead.phone.replace(/\D/g, '')}`,
      email: lead.email || '',
      city: lead.city,
      societySector: lead.society || '',
      projectScope: lead.projectType,
      propertyConfiguration: lead.propertyType || '',
      estimatedBudget: lead.budgetRange || '',
      estimatedValueINR: lead.estimatedCost || 0,
      possessionTimeline: lead.possessionStatus || '',
      additionalNotes: lead.notes || '',
      acquisitionChannel: lead.source,
      verifiedMobile: !!lead.otpVerified,
    },
    meta: {
      brand: 'Pentagram: Your Space Expert',
      legalEntity: 'Verdoire Interiors & Furnishings Pvt. Ltd.',
      platform: 'Pentagram Turnkey Interiors Platform',
      environment: process.env.NODE_ENV || 'production',
    },
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Pentagram-CRM-Sync/1.0',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
    headers['X-API-KEY'] = apiKey;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const text = await res.text().catch(() => '');
    return {
      success: res.ok,
      status: res.status,
      response: `HTTP ${res.status}: ${text.slice(0, 150)}`,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const msg = err instanceof Error ? err.message : 'Connection failed';
    return {
      success: false,
      status: 0,
      response: `Failed to dispatch: ${msg}`,
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // CRM API ENDPOINTS
  // -------------------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // GET /api/crm/leads - list leads with optional filtering
  app.get('/api/crm/leads', (req, res) => {
    let leads = loadLeads();

    const { city, status, search } = req.query;

    if (city && typeof city === 'string') {
      leads = leads.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    }

    if (status && typeof status === 'string') {
      leads = leads.filter((l) => l.status.toLowerCase() === status.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.society && l.society.toLowerCase().includes(q)) ||
          l.id.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: leads.length,
      leads,
    });
  });

  // POST /api/crm/leads - ingest new lead from website forms
  app.post('/api/crm/leads', async (req, res) => {
    try {
      const body = req.body;
      if (!body.name && !body.phone) {
        return res.status(400).json({ error: 'Name and Phone are required' });
      }

      const existingLeads = loadLeads();

      const newLead: ServerCrmLead = {
        id: body.id || `LEAD-PNT-${Date.now().toString().slice(-4)}`,
        name: body.name || 'Anonymous Customer',
        phone: body.phone,
        email: body.email || '',
        city: body.city || 'Delhi NCR',
        society: body.society || '',
        location: body.location || (body.society ? `${body.society}, ${body.city}` : body.city) || 'Delhi NCR',
        source: body.source || 'website_form',
        projectType: body.projectType || 'Full Home Interior',
        propertyType: body.propertyType || '',
        budgetRange: body.budgetRange || '',
        budget: body.budget || body.budgetRange || '',
        estimatedCost: body.estimatedCost || 0,
        possessionStatus: body.possessionStatus || '',
        notes: body.notes || '',
        projectDetails: body.projectDetails || '',
        specs: body.specs || {},
        otpVerified: !!body.otpVerified,
        status: body.status || 'New',
        createdAt: body.createdAt || new Date().toISOString(),
      };

      // 1. Ingest lead directly into Dzylo CRM (Primary CRM Connection)
      console.log(`[Dzylo CRM] Ingesting lead ${newLead.id} for ${newLead.name} (${newLead.phone}) into Dzylo CRM...`);
      const dzyloResult = await forwardLeadToDzylo(newLead);
      newLead.dzyloSynced = dzyloResult.success;
      newLead.dzyloResponse = dzyloResult.response;

      // 2. Check Secondary Webhook Integration if configured
      const config = loadConfig();
      const targetWebhook = process.env.CRM_WEBHOOK_URL || config.webhookUrl;
      const targetKey = process.env.CRM_API_KEY || config.apiKey;

      if (targetWebhook && config.autoSync) {
        console.log(`[CRM] Forwarding lead ${newLead.id} to secondary webhook: ${targetWebhook}`);
        const dispatchResult = await forwardLeadToWebhook(newLead, targetWebhook, targetKey);
        newLead.syncedToWebhook = dispatchResult.success;
        newLead.webhookResponse = dispatchResult.response;
      }

      // Add to beginning of leads array
      const updated = [newLead, ...existingLeads.filter((l) => l.id !== newLead.id)];
      saveLeads(updated);

      console.log(`[CRM] Lead successfully recorded: ${newLead.id} | Dzylo Synced: ${newLead.dzyloSynced}`);

      res.status(201).json({
        success: true,
        message: 'Lead inserted successfully into Dzylo CRM',
        dzyloSynced: newLead.dzyloSynced,
        dzyloResponse: newLead.dzyloResponse,
        lead: newLead,
      });
    } catch (err: unknown) {
      console.error('[CRM] Ingestion Error:', err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'Internal CRM error', details: msg });
    }
  });

  // POST /api/dzylo/lead - direct endpoint matching the user's PHP contract
  app.post('/api/dzylo/lead', async (req, res) => {
    try {
      const input = req.body;
      if (!input.name || !input.phone) {
        return res.status(400).json({ success: false, response: 'Name and Phone are required.' });
      }

      const cleanPhone = String(input.phone).replace(/\D/g, '');
      const location = input.location || (input.society ? `${input.society}, ${input.city}` : input.city) || 'Delhi NCR';
      const projectType = input.projectType || 'Full Home Interior';
      const budget = input.budget || 'Standard Turnkey';
      const projectDetails = input.projectDetails || input.notes || '';

      const comment = `Location: ${location}

Service Required: ${projectType}

Budget: ${budget}

Project Details:
${projectDetails}`.trim();

      const tags: string[] = [];
      if (projectType) tags.push(projectType);
      if (input.city) tags.push(input.city);

      const state = (input.city === 'Gurgaon') ? 'Haryana' : (input.city === 'Noida' || input.city === 'Greater Noida' ? 'Uttar Pradesh' : (input.city === 'Faridabad' ? 'Haryana' : (input.city === 'Delhi' ? 'Delhi' : 'Other')));

      const payload = {
        name: input.name,
        countryCode: '+91',
        phone: cleanPhone,
        email: input.email || '',
        comment,
        tags,
        budget,
        scope: projectType,
        city: input.city || '',
        state,
        country: 'India',
      };

      const apiToken = process.env.DZYLO_API_TOKEN || DZYLO_DEFAULT_API_TOKEN;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(DZYLO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const responseData = await response.json().catch(() => null);

      if (response.status === 200) {
        const existingLeads = loadLeads();
        const savedLead: ServerCrmLead = {
          id: `LEAD-DZY-${Date.now().toString().slice(-4)}`,
          name: input.name,
          phone: cleanPhone,
          email: input.email || '',
          city: input.city || 'Delhi NCR',
          location,
          source: 'dzylo_direct',
          projectType,
          budget,
          projectDetails,
          status: 'New',
          dzyloSynced: true,
          dzyloResponse: responseData,
          createdAt: new Date().toISOString(),
        };
        saveLeads([savedLead, ...existingLeads]);

        return res.json({ success: true, response: 'Lead inserted successfully.', dzylo: responseData });
      }

      return res.status(response.status).json({
        success: false,
        status: response.status,
        response: responseData,
        payload,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ success: false, response: msg });
    }
  });

  // PATCH /api/crm/leads/:id - update status or notes
  app.patch('/api/crm/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes, assignedTo } = req.body;

    const leads = loadLeads();
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (status) leads[index].status = status;
    if (notes !== undefined) leads[index].notes = notes;
    leads[index].updatedAt = new Date().toISOString();

    saveLeads(leads);

    res.json({
      success: true,
      lead: leads[index],
    });
  });

  // DELETE /api/crm/leads/:id - delete lead
  app.delete('/api/crm/leads/:id', (req, res) => {
    const { id } = req.params;
    let leads = loadLeads();
    const initialLen = leads.length;
    leads = leads.filter((l) => l.id !== id);

    if (leads.length === initialLen) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    saveLeads(leads);
    res.json({ success: true, message: 'Lead deleted' });
  });

  // GET /api/crm/config - get webhook config
  app.get('/api/crm/config', (req, res) => {
    const cfg = loadConfig();
    res.json({
      ...cfg,
      envWebhookConfigured: !!process.env.CRM_WEBHOOK_URL,
    });
  });

  // POST /api/crm/config - update webhook config
  app.post('/api/crm/config', (req, res) => {
    const { webhookUrl, apiKey, autoSync, notifyEmail } = req.body;
    const current = loadConfig();
    const updated: ServerCrmConfig = {
      webhookUrl: webhookUrl !== undefined ? webhookUrl.trim() : current.webhookUrl,
      apiKey: apiKey !== undefined ? apiKey.trim() : current.apiKey,
      autoSync: autoSync !== undefined ? !!autoSync : current.autoSync,
      notifyEmail: notifyEmail !== undefined ? notifyEmail.trim() : current.notifyEmail,
    };
    saveConfig(updated);
    res.json({ success: true, config: updated });
  });

  // POST /api/crm/test-webhook - test webhook ping without CORS issues
  app.post('/api/crm/test-webhook', async (req, res) => {
    const { webhookUrl, apiKey, payload } = req.body;

    if (!webhookUrl) {
      return res.status(400).json({ error: 'webhookUrl is required' });
    }

    try {
      const testLead: ServerCrmLead = {
        id: 'TEST-LEAD-999',
        name: 'Test Customer (Pentagram System Ping)',
        phone: '9876543210',
        email: 'test@pentagram.expert',
        city: 'Gurgaon',
        society: 'DLF Crest, Sector 54',
        source: 'crm_webhook_tester',
        projectType: 'Full Home Interior',
        propertyType: '3 BHK',
        budgetRange: '₹15L - ₹20L',
        estimatedCost: 1650000,
        possessionStatus: 'Ready to Move',
        notes: 'Verification webhook test dispatched from Pentagram CRM Settings.',
        otpVerified: true,
        status: 'Test Connection',
        createdAt: new Date().toISOString(),
      };

      const dispatchResult = await forwardLeadToWebhook(testLead, webhookUrl, apiKey);

      res.json({
        success: dispatchResult.success,
        status: dispatchResult.status,
        message: dispatchResult.response,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection failed';
      res.status(500).json({ success: false, message: msg });
    }
  });

  // -------------------------------------------------------------
  // VITE & STATIC SPA MIDDLEWARE
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pentagram Full-Stack Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
