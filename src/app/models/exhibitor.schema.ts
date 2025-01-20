import { z } from 'zod';

export const exhibitorSchema = z.object({
  S_added_via: z.literal('Web Form'),
  S_company: z.string().nonempty('Company is required'),
  S_email_address: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  S_group_reg_id: z
    .string()
    .length(5, 'Group registration ID must be 5 characters long'),
  S_name_on_badge: z.string().nonempty('Name on badge is required'),
  S_job_title: z.string().nonempty('Job title is required'),
  S_country: z.string().nonempty('Country is required'),
  S_company_on_badge: z.string().nonempty('Company on badge is required'),
  SB_event_fha: z.boolean(),
  SB_event_prowine: z.boolean(),
});

export const eventAndCompanySchema = z.object({
  event: z.string().nonempty({ message: 'Event is required' }),
  company: z.string().nonempty({ message: 'Company is required' }),
});

export type ExhibitorSchema = z.infer<typeof exhibitorSchema>;
export type EventAndCompanySchema = z.infer<typeof eventAndCompanySchema>;
