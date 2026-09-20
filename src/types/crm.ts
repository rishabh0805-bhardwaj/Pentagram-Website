import { ServiceableCity } from '../types';

export type LeadSource =
  | 'consultation_modal'
  | 'design_os_estimator'
  | 'renovation_form'
  | 'whatsapp_site_visit'
  | 'festive_offer'
  | 'quick_inquiry';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Site Visit Scheduled'
  | 'Quotation Sent'
  | 'In Negotiation'
  | 'Converted'
  | 'Lost';

export interface CrmLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: ServiceableCity;
  society?: string;
  source: LeadSource;
  projectType: string;
  propertyType?: string; // 1BHK, 2BHK, 3BHK, Villa
  budgetRange?: string;
  estimatedCost?: number;
  possessionStatus?: string;
  notes?: string;
  specs?: Record<string, unknown>;
  otpVerified?: boolean;
  status: LeadStatus;
  syncedToWebhook?: boolean;
  webhookResponse?: string;
  dzyloSynced?: boolean;
  dzyloResponse?: any;
  createdAt: string;
  updatedAt?: string;
}

export interface CrmConfig {
  webhookUrl: string;
  apiKey?: string;
  autoSync: boolean;
  notifyEmail?: string;
  lastSyncAt?: string;
}

export interface CrmLeadPayload {
  name: string;
  phone: string;
  email?: string;
  city: ServiceableCity;
  society?: string;
  location?: string;
  source: LeadSource;
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
}

