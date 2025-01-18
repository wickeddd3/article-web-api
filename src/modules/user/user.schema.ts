import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstname: z.string().max(100),
  lastname: z.string().max(100),
  type: z.enum(['Writer', 'Editor']),
  status: z.enum(['Active', 'Inactive']),
});

export type UserSchemaType = z.infer<typeof userSchema>;
