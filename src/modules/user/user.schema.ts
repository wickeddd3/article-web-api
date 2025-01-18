import { z } from 'zod';

export const userSchema = z.object({
  firstname: z.string().max(100),
  lastname: z.string().max(100),
  type: z.enum(['Writer', 'Editor']),
  status: z.enum(['Active', 'Inactive']),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const editUserSchema = z.object({
  firstname: z.string().max(100),
  lastname: z.string().max(100),
  type: z.enum(['Writer', 'Editor']),
  status: z.enum(['Active', 'Inactive']),
  email: z.string().email(),
  password: z
    .string()
    .optional()
    .refine((value) => value === undefined || value === '' || value.length >= 6, {
      message: 'Password must be at least 6 characters if provided.',
    }),
});

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
