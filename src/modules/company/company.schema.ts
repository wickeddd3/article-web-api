import { z } from 'zod';

export const companySchema = z.object({
  logo: z.string(),
  name: z.string(),
  status: z.enum(['Active', 'Inactive']),
});

export type CompanySchemaType = z.infer<typeof companySchema>;
