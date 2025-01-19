import { z } from 'zod';

export const articleSchema = z.object({
  image: z.string(),
  title: z.string().max(150),
  link: z.string().url(),
  date: z
    .string()
    .nonempty('Date is required')
    .refine((value) => !isNaN(Date.parse(value)), 'Invalid date format'),
  content: z.string(),
  status: z.enum(['ForEdit', 'Published']),
  writerId: z.number(),
  editorId: z.number().optional(),
  companyId: z.number(),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;

export const editArticleSchema = z.object({
  newImage: z.string().optional(),
  title: z.string().max(150),
  link: z.string().url(),
  date: z
    .string()
    .nonempty('Date is required')
    .refine((value) => !isNaN(Date.parse(value)), 'Invalid date format'),
  content: z.string(),
  status: z.enum(['ForEdit', 'Published']),
  editorId: z.number(),
  companyId: z.number(),
});

export type EditArticleSchemaType = z.infer<typeof editArticleSchema>;
