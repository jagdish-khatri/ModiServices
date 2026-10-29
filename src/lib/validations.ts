import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),

  mobileNumber: z
    .string()
    .regex(
      /^(\+91[\-\s]?)?[6-9]\d{9}$/,
      "Please enter a valid Indian mobile number"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  serviceInterested: z.enum([
    "Mutual Funds / SIP",
    "Lump-Sum Investment",
    "Home Loan",
    "Personal Loan",
    "Gold Loan",
    "Vehicle Loan",
    "Fixed Deposit",
    "Insurance",
    "General Enquiry",
  ]),

  preferredContactMethod: z.enum(["phone", "whatsapp", "email"]),

  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),

  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge the privacy notice to submit this form" }),
  }),

  // Honeypot field — must be empty
  website: z.string().max(0, "Spam detected").optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
