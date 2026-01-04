import { z } from "zod";

export const FormElementSchema = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  settings: z.record(z.string(), z.any()).optional(),
  validation: z.record(z.string(), z.any()).optional(),
});

export const FormBlockSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(FormElementSchema),
});

export const FormJsonSchema = z.object({
  blocks: z.array(FormBlockSchema).optional(),
  fields: z.array(FormElementSchema).optional(),
  settings: z.record(z.string(), z.any()).optional(),
});

export const CreateFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  isMultiStep: z.boolean().default(false),
  formJson: FormJsonSchema,
});
