export type ContactMessagePreset = {
  label: string;
  subject: string;
  message: string;
};

export const CONTACT_MESSAGE_PRESETS: ContactMessagePreset[] = [
{
    label: "I have a general question",
    subject: "General Inquiry",
    message: "I have a general question about your services.",
  },
  {
    label: "I'd like to schedule a quote",
    subject: "Quote Request",
    message: "I would like to schedule a free quote for my property.",
  },
  {
    label: "I'm interested in recurring lawn care",
    subject: "Recurring Lawn Care",
    message:
      "I'm interested in setting up recurring lawn maintenance services.",
  },
  {
    label: "I need a one-time service",
    subject: "One-Time Service Request",
    message:
      "I'm looking for a one-time service and would like more information.",
  },
  {
    label: "I'm not sure / need guidance",
    subject: "Service Inquiry",
    message:
      "I'm not exactly sure what service I need and would appreciate some guidance.",
  },
];