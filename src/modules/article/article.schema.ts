import { z } from 'zod';

export const articleSchema = z.object({
  image: z.string(),
  title: z.string().max(150),
  link: z.string().url(),
  date: z.date(),
  content: z.string(),
  status: z.enum(['ForEdit', 'Published']),
  writerId: z.number(),
  editorId: z.number(),
  companyId: z.number(),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;
