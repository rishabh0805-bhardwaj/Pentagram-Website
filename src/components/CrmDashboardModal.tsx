import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Filter,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  RefreshCw,
  Plus,
  Settings,
  Database,
  Building,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sliders,
  DollarSign,
  TrendingUp,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { CrmLead, LeadStatus, CrmConfig, LeadSource } from '../types/crm';
import { ServiceableCity, SERVICEABLE_CITIES } from '../types';
import {
  fetchAllLeads,
  getLocalLeads,
  updateLeadStatus,
  getCrmConfig,
  saveCrmConfig,
  testWebhookEndpoint,
  exportLeadsToCsv,
  submitLeadToCrm,
} from '../services/crmService';
import { formatIndianCurrency } from '../calculator/pricingEngine';

interface CrmDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: ServiceableCity;
}

export const CrmDashboardModal: React.FC<CrmDashboardModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'new_lead'>('leads');
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);

  // Settings State
  const [config, setConfig] = useState<CrmConfig>(getCrmConfig());
  const [webhookUrlInput, setWebhookUrlInput] = useState(config.webhookUrl);
  const [apiKeyInput, setApiKeyInput] = useState(config.apiKey || '');
  const [autoSyncInput, setAutoSyncInput] = useState(config.autoSync);
  const [testResult, setTestResult] = useState<{
    tested: boolean;
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ tested: false, loading: false });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCity, setNewLeadCity] = useState<ServiceableCity>(selectedCity);
  const [newLeadSociety, setNewLeadSociety] = useState('');
  const [newLeadProject, setNewLeadProject] = useState('Full Home Interior');
  const [newLeadBhk, setNewLeadBhk] = useState('3 BHK');
  const [newLeadBudget, setNewLeadBudget] = useState('₹12L - ₹18L');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  // Load leads
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
    } catch {
      setLeads(getLocalLeads());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      const cfg = getCrmConfig();
      setConfig(cfg);
      setWebhookUrlInput(cfg.webhookUrl);
      setApiKeyInput(cfg.apiKey || '');
      setAutoSyncInput(cfg.autoSync);
    }
  }, [isOpen]);

  // Listen for real-time lead additions
  useEffect(() => {
    const handleLeadAdded = (e: Event) => {
      const customEvent = e as CustomEvent<{ lead: CrmLead }>;
      if (customEvent.detail?.lead) {
        setLeads((prev) => [
          customEvent.detail.lead,
          ...prev.filter((l) => l.id !== customEvent.detail.lead.id),
        ]);
      }
    };

    window.addEventListener('crm:lead-added', handleLeadAdded);
    return () => window.removeEventListener('crm:lead-added', handleLeadAdded);
  }, []);

  if (!isOpen) return null;

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.society && lead.society.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchCity = cityFilter === 'All' || lead.city === cityFilter;

    return matchSearch && matchStatus && matchCity;
  });

  // Calculate stats
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const scheduledCount = leads.filter((l) => l.status === 'Site Visit Scheduled').length;
  const totalPipelineVal = leads.reduce((sum, l) => sum + (l.estimatedCost || 1200000), 0);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveSettings = async () => {
    const newCfg: CrmConfig = {
      webhookUrl: webhookUrlInput.trim(),
      apiKey: apiKeyInput.trim(),
      autoSync: autoSyncInput,
    };
    saveCrmConfig(newCfg);
    setConfig(newCfg);

    try {
      await fetch('/api/crm/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCfg),
      });
    } catch {
      // Local save succeeds
    }

    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrlInput.trim()) {
      setTestResult({
        tested: true,
        loading: false,
        success: false,
        message: 'Please enter a valid CRM Webhook URL first.',
      });
      return;
    }

    setTestResult({ tested: false, loading: true });
    const res = await testWebhookEndpoint(webhookUrlInput.trim(), apiKeyInput.trim());
    setTestResult({
      tested: true,
      loading: false,
      success: res.success,
      message: res.message,
    });
  };

  const handleExportCsv = () => {
    const csvContent = exportLeadsToCsv(filteredLeads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pentagram_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;
    setIsSubmittingNew(true);

    try {
      const res = await submitLeadToCrm({
        name: newLeadName.trim(),
        phone: newLeadPhone.replace(/\D/g, ''),
        email: newLeadEmail.trim(),
        city: newLeadCity,
        society: newLeadSociety.trim(),
        source: 'quick_inquiry',
        projectType: newLeadProject,
        propertyType: newLeadBhk,
        budgetRange: newLeadBudget,
        notes: newLeadNotes.trim(),
        otpVerified: true,
      });

      setCreateSuccess(true);
      setNewLeadName('');
      setNewLeadPhone('');
      setNewLeadEmail('');
      setNewLeadSociety('');
      setNewLeadNotes('');
      loadData();
      setTimeout(() => {
        setCreateSuccess(false);
        setActiveTab('leads');
      }, 1500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingNew(false);
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Site Visit Scheduled':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Quotation Sent':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Lost':
        return 'bg-neutral-200 text-neutral-700 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getSourceLabel = (source: LeadSource) => {
    switch (source) {
      case 'consultation_modal':
        return 'Consultation Form';
      case 'design_os_estimator':
        return 'Design OS Estimator';
      case 'whatsapp_site_visit':
        return 'WhatsApp Site Visit';
      case 'renovation_form':
        return 'Renovation Scope';
      case 'festive_offer':
        return 'Festive Offer Claim';
      default:
        return 'Website Direct';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-[#FAF6F0] rounded-3xl max-w-6xl w-full h-[92vh] max-h-[850px] shadow-2xl border border-[#EAE0D5] flex flex-col overflow-hidden text-left animate-in fade-in duration-200">
        {/* Top Header Bar */}
        <div className="bg-[#201B1C] text-white p-4 sm:p-6 border-b border-[#362f30] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9C2542] to-[#C69255] flex items-center justify-center text-white shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Pentagram CRM • Lead Management Center
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Turnkey residential interior inquiries across Delhi NCR (Gurgaon, Noida, Delhi, Faridabad).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Tab Navigation */}
            <div className="bg-[#181415] p-1 rounded-xl border border-[#3b3234] flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#9C2542] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Pipeline Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('new_lead')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'new_lead'
                    ? 'bg-[#9C2542] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Lead</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'bg-[#9C2542] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>CRM Webhooks</span>
                {config.webhookUrl && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        {activeTab === 'leads' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 bg-white/70 border-b border-[#EAE0D5] shrink-0 text-xs">
            <div className="p-3 bg-white rounded-xl border border-[#EAE0D5] shadow-2xs">
              <div className="text-[11px] text-neutral-500 font-medium">Total Inquiries</div>
              <div className="text-xl font-bold text-[#201B1C] mt-0.5">{totalLeads}</div>
              <div className="text-[10px] text-emerald-700 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> All Delhi NCR channels
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EAE0D5] shadow-2xs">
              <div className="text-[11px] text-neutral-500 font-medium">New Uncontacted</div>
              <div className="text-xl font-bold text-amber-600 mt-0.5">{newLeadsCount}</div>
              <div className="text-[10px] text-amber-800 mt-1 flex items-center gap-1">
                <Flame className="w-3 h-3" /> Priority callback needed
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EAE0D5] shadow-2xs">
              <div className="text-[11px] text-neutral-500 font-medium">Site Visits Booked</div>
              <div className="text-xl font-bold text-purple-700 mt-0.5">{scheduledCount}</div>
              <div className="text-[10px] text-neutral-500 mt-1">Laser scan measurement</div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EAE0D5] shadow-2xs">
              <div className="text-[11px] text-neutral-500 font-medium">Pipeline Estimate Value</div>
              <div className="text-xl font-bold text-emerald-700 mt-0.5">
                {formatIndianCurrency(totalPipelineVal)}
              </div>
              <div className="text-[10px] text-neutral-500 mt-1">Direct project volume</div>
            </div>
          </div>
        )}

        {/* Tab 1: Leads Pipeline Table */}
        {activeTab === 'leads' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Filter and Action Bar */}
            <div className="p-4 border-b border-[#EAE0D5] flex flex-wrap items-center justify-between gap-3 bg-white/40 shrink-0">
              <div className="flex flex-wrap items-center gap-2 flex-1 max-w-2xl">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, society..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#EAE0D5] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#9C2542]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* City Filter */}
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#EAE0D5] text-xs font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Cities</option>
                  {SERVICEABLE_CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#EAE0D5] text-xs font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={loadData}
                  title="Refresh leads"
                  className="p-2 rounded-xl bg-white border border-[#EAE0D5] hover:bg-neutral-50 text-neutral-700 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleExportCsv}
                  className="px-3 py-2 bg-white hover:bg-neutral-50 border border-[#EAE0D5] rounded-xl text-xs font-semibold text-neutral-800 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#EAE0D5]">
                  <Database className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-neutral-700">No leads match your search criteria</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your filters or submit a test consultation form on the website to see it appear here live.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#EAE0D5] shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF6F0] text-neutral-700 font-semibold border-b border-[#EAE0D5] uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Lead ID & Date</th>
                          <th className="py-3 px-4">Client Contact</th>
                          <th className="py-3 px-4">Location & Society</th>
                          <th className="py-3 px-4">Project Scope</th>
                          <th className="py-3 px-4">Est. Value</th>
                          <th className="py-3 px-4">Lead Source</th>
                          <th className="py-3 px-4">Pipeline Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE0D5]">
                        {filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                            onClick={() => setSelectedLead(lead)}
                          >
                            {/* ID & Date */}
                            <td className="py-3 px-4">
                              <div className="font-mono font-bold text-[#201B1C]">{lead.id}</div>
                              <div className="text-[10px] text-neutral-500 mt-0.5">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </td>

                            {/* Client Contact */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-[#201B1C] flex items-center gap-1.5">
                                <span>{lead.name}</span>
                                {lead.otpVerified && (
                                  <span title="Mobile verified via OTP">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-neutral-600 font-mono mt-0.5 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-400" />
                                <span>+91 {lead.phone}</span>
                              </div>
                              {lead.email && (
                                <div className="text-[10px] text-neutral-500 truncate max-w-[150px]">
                                  {lead.email}
                                </div>
                              )}
                            </td>

                            {/* Location & Society */}
                            <td className="py-3 px-4">
                              <div className="inline-block px-2 py-0.5 rounded-md bg-[#FAF6F0] border border-[#EAE0D5] font-semibold text-[#201B1C] text-[11px]">
                                {lead.city}
                              </div>
                              <div className="text-[11px] text-neutral-600 truncate max-w-[160px] mt-0.5">
                                {lead.society || 'Area not specified'}
                              </div>
                            </td>

                            {/* Project Scope */}
                            <td className="py-3 px-4">
                              <div className="font-semibold text-neutral-800">{lead.projectType}</div>
                              <div className="text-[10px] text-neutral-500">
                                {lead.propertyType || 'Residential Flat'}
                              </div>
                            </td>

                            {/* Est. Value */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-emerald-800">
                                {lead.estimatedCost
                                  ? formatIndianCurrency(lead.estimatedCost)
                                  : lead.budgetRange || '₹8L - ₹15L'}
                              </div>
                            </td>

                            {/* Lead Source */}
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-medium border border-neutral-200">
                                {getSourceLabel(lead.source)}
                              </span>
                            </td>

                            {/* Status Changer */}
                            <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleStatusChange(lead.id, e.target.value as LeadStatus)
                                }
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadge(
                                  lead.status
                                )}`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                                <option value="Quotation Sent">Quotation Sent</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                              </select>
                            </td>

                            {/* Quick Actions */}
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1">
                                <a
                                  href={`https://wa.me/91${lead.phone.replace(
                                    /\D/g,
                                    ''
                                  )}?text=${encodeURIComponent(
                                    `Hi ${lead.name}, this is Pentagram: Your Space Expert regarding your interior consultation in ${lead.city}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="WhatsApp Client"
                                  className="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  title="Call Customer"
                                  className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Add Manual Lead */}
        {activeTab === 'new_lead' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-2xl border border-[#EAE0D5] p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#201B1C] mb-1">
                Log New Customer Lead Manually
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Directly register walk-in, phone call, or architect referral leads into Pentagram CRM and trigger configured webhooks.
              </p>

              {createSuccess ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Lead Successfully Ingested into CRM!</div>
                  <div className="text-xs">Returning to leads table...</div>
                </div>
              ) : (
                <form onSubmit={handleCreateManualLead} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Aggarwal"
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        10-Digit Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={newLeadPhone}
                        onChange={(e) => setNewLeadPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="vikram@example.com"
                        value={newLeadEmail}
                        onChange={(e) => setNewLeadEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        Project City *
                      </label>
                      <select
                        value={newLeadCity}
                        onChange={(e) => setNewLeadCity(e.target.value as ServiceableCity)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs font-bold text-[#201B1C] focus:bg-white focus:outline-none"
                      >
                        {SERVICEABLE_CITIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        Society / Sector
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. DLF The Crest, Sector 54"
                        value={newLeadSociety}
                        onChange={(e) => setNewLeadSociety(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#201B1C] mb-1">
                        Project Scope
                      </label>
                      <select
                        value={newLeadProject}
                        onChange={(e) => setNewLeadProject(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                      >
                        <option value="Full Home Interior">Full Home Interior</option>
                        <option value="Modular Kitchen">Modular Kitchen</option>
                        <option value="Wardrobes & Storage">Wardrobes & Storage</option>
                        <option value="Renovation & Civil">Renovation & Civil</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#201B1C] mb-1">
                      Notes / Scope Specifics
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Walk-in consultation at Gurgaon experience center. Requires acrylic modular kitchen and master bedroom storage."
                      value={newLeadNotes}
                      onChange={(e) => setNewLeadNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingNew}
                    className="w-full py-3 bg-[#9C2542] hover:bg-[#801c34] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingNew ? (
                      <span>Ingesting Lead into CRM...</span>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Save & Dispatch to External CRM Webhook</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: CRM Webhooks & Integration Settings */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-6">
            <div className="bg-white rounded-2xl border border-[#EAE0D5] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#201B1C]">
                    External CRM Webhook Integration
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Connect Pentagram to your CRM (HubSpot, Zoho CRM, Salesforce, Zapier, Make, or Google Sheets).
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Auto-Dispatch Ready
                </div>
              </div>

              <div className="space-y-4">
                {/* Webhook URL */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    CRM Webhook Endpoint URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://hooks.zapier.com/hooks/catch/... or https://api.hubspot.com/..."
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9C2542]"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Whenever a homeowner completes any form (Consultation, Estimator, WhatsApp Site Visit), the full payload is dispatched here via HTTP POST.
                  </p>
                </div>

                {/* API Key / Token */}
                <div>
                  <label className="block text-xs font-bold text-[#201B1C] uppercase tracking-wider mb-1">
                    API Key / Bearer Token (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="pat-na1-... or secret token"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE0D5] bg-[#FAF6F0] text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9C2542]"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Sent in the <code className="bg-neutral-100 px-1 py-0.5 rounded text-[10px]">Authorization: Bearer</code> header.
                  </p>
                </div>

                {/* Auto Sync Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5]">
                  <div>
                    <div className="text-xs font-bold text-[#201B1C]">Instant Webhook Dispatch</div>
                    <div className="text-[11px] text-neutral-500">
                      Immediately push lead payload to external CRM on form submit
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSyncInput}
                      onChange={(e) => setAutoSyncInput(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="px-5 py-2.5 bg-[#9C2542] hover:bg-[#801c34] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{settingsSaved ? 'Saved Settings!' : 'Save CRM Settings'}</span>
                  </button>

                  <button
                    onClick={handleTestWebhook}
                    disabled={testResult.loading}
                    className="px-4 py-2.5 bg-white hover:bg-neutral-50 border border-[#EAE0D5] text-[#201B1C] text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${testResult.loading ? 'animate-pulse' : ''}`} />
                    <span>{testResult.loading ? 'Pinging Webhook...' : 'Test Webhook Ping'}</span>
                  </button>
                </div>

                {/* Test Result Message */}
                {testResult.tested && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                      testResult.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">
                        {testResult.success ? 'Webhook Connection Verified!' : 'Webhook Test Ping Failed'}
                      </div>
                      <div className="text-[11px] mt-0.5">{testResult.message}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Setup Guides */}
            <div className="bg-white rounded-2xl border border-[#EAE0D5] p-6 shadow-xs space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#201B1C]">
                Supported CRM Connectors & Integration Guide
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5]">
                  <div className="font-bold text-[#201B1C] mb-1">HubSpot / Salesforce</div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Paste your HubSpot Webhook or Operations Hub workflow URL. Pentagram sends standard contacts with name, phone, city, society, and budget.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5]">
                  <div className="font-bold text-[#201B1C] mb-1">Zoho CRM / LeadSquared</div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Use Zoho Flow or Webhook trigger. Fields automatically map into Leads module with instant Delhi NCR territory tagging.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5]">
                  <div className="font-bold text-[#201B1C] mb-1">Zapier / Make.com</div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Create a "Catch Hook" trigger in Zapier or Make. Automatically route leads into Google Sheets, Slack, WhatsApp Business, or custom databases.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5]">
                  <div className="font-bold text-[#201B1C] mb-1">Google Sheets (Apps Script)</div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Deploy a free Google Apps Script web app with <code className="bg-white px-1 py-0.5 rounded text-[10px]">doPost(e)</code> to automatically append new rows to your master spreadsheet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Lead Details Modal/Drawer */}
        {selectedLead && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#EAE0D5] shadow-2xl relative animate-in fade-in duration-150">
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-neutral-500">{selectedLead.id}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                    selectedLead.status
                  )}`}
                >
                  {selectedLead.status}
                </span>
                {selectedLead.otpVerified && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    OTP Verified
                  </span>
                )}
              </div>

              <h3 className="font-serif text-xl font-bold text-[#201B1C] mb-1">
                {selectedLead.name}
              </h3>
              <div className="text-xs text-neutral-500 mb-4 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>
                  {selectedLead.city} {selectedLead.society ? `• ${selectedLead.society}` : ''}
                </span>
              </div>

              <div className="space-y-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#EAE0D5] text-xs">
                <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                  <span className="text-neutral-500">Phone Number</span>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="font-bold text-[#201B1C] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> +91 {selectedLead.phone}
                  </a>
                </div>

                {selectedLead.email && (
                  <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                    <span className="text-neutral-500">Email Address</span>
                    <span className="font-medium text-[#201B1C]">{selectedLead.email}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                  <span className="text-neutral-500">Project Type</span>
                  <span className="font-bold text-[#201B1C]">{selectedLead.projectType}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                  <span className="text-neutral-500">Property BHK</span>
                  <span className="font-bold text-[#201B1C]">
                    {selectedLead.propertyType || '3 BHK'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                  <span className="text-neutral-500">Estimated Budget</span>
                  <span className="font-bold text-emerald-800">
                    {selectedLead.estimatedCost
                      ? formatIndianCurrency(selectedLead.estimatedCost)
                      : selectedLead.budgetRange || '₹8L - ₹15L'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#EAE0D5]">
                  <span className="text-neutral-500">Source Channel</span>
                  <span className="font-semibold text-neutral-700">
                    {getSourceLabel(selectedLead.source)}
                  </span>
                </div>

                {selectedLead.notes && (
                  <div className="pt-1">
                    <span className="text-neutral-500 block mb-1">Notes & Specifications:</span>
                    <p className="bg-white p-2.5 rounded-xl border border-[#EAE0D5] text-neutral-700 leading-relaxed text-[11px]">
                      {selectedLead.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Update Dropdown */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                    Update Pipeline Status:
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) =>
                      handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                    }
                    className="w-full px-3 py-2 bg-[#FAF6F0] rounded-xl border border-[#EAE0D5] text-xs font-bold text-[#201B1C] focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div className="flex items-end gap-2 pt-4">
                  <a
                    href={`https://wa.me/91${selectedLead.phone.replace(
                      /\D/g,
                      ''
                    )}?text=${encodeURIComponent(
                      `Hi ${selectedLead.name}, this is Pentagram: Your Space Expert regarding your ${selectedLead.projectType} consultation in ${selectedLead.city}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
