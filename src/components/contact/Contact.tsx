"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/validator";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { ContactIcon } from "@/components/icons";
import { ContactCard } from "@/types";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";

const ENQUIRY_OPTIONS = [
  "General Enquiry",
  "Technical Support",
  "Partnerships & Enterprise",
  "Media & Press",
  "Billing & Payments",
];

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: <ContactIcon bg="#FCE7F3" stroke="#A41752" />,
    title: "Technical Support",
    description:
      "Struggling with a GitHub sync or the dna.md structure? Our developers are here to help you troubleshoot your Forge.",
    responseTime: "Under 24 hours",
    email: "anvila.dev@gmail.com",
  },
  {
    icon: <ContactIcon bg="#CCFBF1" stroke="#641BA3" />,
    title: "Partnerships & Enterprise",
    description:
      'Looking for private registries or custom "Agent DNA" for your organization?\n Let\'s build a tailored solution',
    email: "anvila.dev@gmail.com",
    highlighted: true,
  },
  {
    icon: <ContactIcon bg="#F3E8FF" stroke="#0C5D56" />,
    title: "Media & Press",
    description:
      "Interested in featuring Anvila's mission to standardize portable intelligence?",
    email: "anvila.dev@gmail.com",
  },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      enquiryType: "",
      message: "",
    },
  });

  const enquiryType = watch("enquiryType");

  function onSubmit(data: ContactFormData) {
    console.log("Form submitted:", data);
    // Handle submission
  }

  // Helper to show error styling
  const inputErrorClass = (fieldName: keyof ContactFormData) =>
    errors[fieldName]
      ? "border-red-500 focus:border-red-500"
      : "border-copy-muted/40 focus:border-teal-accent";

  const errorText = (fieldName: keyof ContactFormData) =>
    errors[fieldName] ? (
      <p className="mt-1 text-sm font-medium text-red-500">
        {errors[fieldName]?.message}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="w-full bg-background py-10 sm:py-20">
        <div className="flex w-full flex-col items-center gap-4 px-5 text-center sm:px-10 lg:px-20">
          <div className="flex items-center gap-2 rounded-full border border-copy-muted/30 px-3 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
            <span className="text-xs font-medium tracking-[0.08em] text-copy-muted">
              CONTACT US
            </span>
          </div>

          <h1 className="text-2xl font-medium leading-8 text-logo sm:text-4xl sm:leading-tight lg:text-[48px] lg:leading-[56px]">
            Need any help? Contact us
          </h1>

          <p className="max-w-lg text-sm leading-6 text-copy-muted sm:text-base">
            Have questions about the Anvila protocol or need help scaling your
            AI workforce? Our team of architects is ready to assist.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex w-full items-center justify-center bg-background px-4 sm:px-6">
        <div className="w-full max-w-[1063px] rounded-[20px] bg-white px-4 py-6 sm:px-10 sm:py-9 md:px-[109px]">
          <h2 className="mb-8 text-center text-lg font-bold leading-6 text-logo sm:text-[30px] sm:leading-[38px]">
            Get in Touch
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-6"
            noValidate
          >
            {/* Row 1 */}
            <div className="grid w-full max-w-[845px] grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-6 text-logo sm:text-lg">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className={cn(
                    "h-[44px] w-full rounded-md border bg-white p-[10px] text-sm font-medium leading-6 text-logo placeholder:text-copy-muted/50 focus:outline-none",
                    inputErrorClass("fullName"),
                  )}
                  {...register("fullName")}
                />
                {errorText("fullName")}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-6 text-logo sm:text-lg">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={cn(
                    "h-[44px] w-full rounded-md border bg-white p-[10px] text-sm font-medium leading-6 text-logo placeholder:text-copy-muted/50 focus:outline-none",
                    inputErrorClass("email"),
                  )}
                  {...register("email")}
                />
                {errorText("email")}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid w-full max-w-[845px] grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-6 text-logo sm:text-lg">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234- 00000-00000"
                  className={cn(
                    "h-[44px] w-full rounded-md border bg-white p-[10px] text-sm font-medium leading-6 text-logo placeholder:text-copy-muted/50 focus:outline-none",
                    inputErrorClass("phone"),
                  )}
                  {...register("phone")}
                />
                {errorText("phone")}
              </div>

              {/* Enquiry Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium leading-6 text-logo sm:text-lg">
                  Enquiry Type<span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={ENQUIRY_OPTIONS}
                  value={enquiryType}
                  onChange={(val) =>
                    setValue("enquiryType", val, { shouldValidate: true })
                  }
                  placeholder="Enquiry"
                  error={!!errors.enquiryType}
                />
                {errorText("enquiryType")}
              </div>
            </div>

            {/* Message */}
            <div className="flex w-full max-w-[845px] flex-col gap-1.5">
              <label className="text-sm font-medium leading-6 text-logo sm:text-lg">
                How can we help you?<span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write your message here..."
                className={cn(
                  "h-[200px] w-full resize-none rounded-2xl border bg-white p-[10px] text-sm font-medium leading-6 text-logo placeholder:text-copy-muted/50 focus:outline-none",
                  inputErrorClass("message"),
                )}
                {...register("message")}
              />
              {errorText("message")}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-[48px] w-full max-w-[845px] rounded-lg border border-primary bg-primary px-5 py-3 text-sm font-medium leading-6 text-white transition-opacity hover:opacity-90 sm:text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="w-full bg-background py-10 sm:py-16">
        <div className="grid w-full grid-cols-1 gap-6 px-5 sm:px-10 md:grid-cols-3 lg:px-20">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className={cn(
                "flex flex-col gap-4 rounded-xl p-6",
                card.highlighted
                  ? "bg-teal-brand text-white"
                  : "border border-copy-muted/10 bg-white text-logo",
              )}
            >
              {card.icon}
              <h3
                className={cn(
                  "text-lg font-semibold",
                  card.highlighted ? "text-white" : "text-logo",
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  card.highlighted ? "text-white/80" : "text-copy-muted",
                )}
              >
                {card.description}
              </p>

              {card.responseTime && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    card.highlighted ? "text-white/70" : "text-teal-accent",
                  )}
                >
                  Response time: {card.responseTime}
                </p>
              )}

              {card.highlighted && <hr className="border-t border-white/30" />}

              <p
                className={cn(
                  "text-sm font-medium",
                  card.highlighted ? "text-white" : "text-logo",
                )}
              >
                Email: {card.email}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
