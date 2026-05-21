import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().regex(emailRegex, { message: "Please enter a valid email" }),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, { message: "Please select an enquiry type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
