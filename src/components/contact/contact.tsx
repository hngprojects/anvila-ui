"use client";

import { useForm, useWatch} from "react-hook-form";
import { zodResolver } from "@/lib/validator";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";
import { ENQUIRY_OPTIONS, CONTACT_CARDS } from "@/data/contact";

const inputBase =
  "h-11 w-full rounded-xl border bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors";

export function Contact() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
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

  const enquiryType = useWatch({ control, name: "enquiryType" });

  function onSubmit(data: ContactFormData) {
    console.log("Form submitted:", data);
  }

  const fieldClass = (field: keyof ContactFormData) =>
    errors[field]
      ? "border-red-400 focus:border-red-500"
      : "border-zinc-200 focus:border-teal-brand";

  const errorMsg = (field: keyof ContactFormData) =>
    errors[field] ? (
      <p className="mt-1 text-xs font-medium text-red-500">
        {errors[field]?.message}
      </p>
    ) : null;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-zinc-100 px-5 pb-14 pt-16 sm:pt-24 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#D4D4D8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent_100%)]"
        />
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,158,117,0.08)_0%,transparent_70%)]"
        />

        <div className="relative mx-auto flex max-w-[600px] flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-zinc-400 px-3.5 py-1.5">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-amber-400"
            />
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
              Contact us
            </span>
          </div>

          <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[48px]">
            Need any help?
            <br className="hidden sm:block" /> Contact us.
          </h1>

          <p className="max-w-[440px] text-sm leading-relaxed text-zinc-500 sm:text-base">
            Have questions about Anvila or need help scaling your AI workforce?
            Our team is ready to assist.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-[760px] rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <h2 className="text-[24px] font-semibold tracking-tight text-zinc-900 sm:text-[30px]">
              Get in touch
            </h2>
            <p className="text-sm text-zinc-500">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className={cn(inputBase, fieldClass("fullName"))}
                  {...register("fullName")}
                />
                {errorMsg("fullName")}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={cn(inputBase, fieldClass("email"))}
                  {...register("email")}
                />
                {errorMsg("email")}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="+234 000 0000 000"
                  className={cn(inputBase, fieldClass("phone"))}
                  {...register("phone")}
                />
                {errorMsg("phone")}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700">
                  Enquiry type <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={ENQUIRY_OPTIONS}
                  value={enquiryType}
                  onChange={(val) =>
                    setValue("enquiryType", val, { shouldValidate: true })
                  }
                  placeholder="Select enquiry type"
                  error={!!errors.enquiryType}
                />
                {errorMsg("enquiryType")}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">
                How can we help? <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write your message here..."
                className={cn(
                  "h-[180px] w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-colors",
                  fieldClass("message"),
                )}
                {...register("message")}
              />
              {errorMsg("message")}
            </div>

            <button
              type="submit"
              className="group mt-1 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-teal-brand text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Send message
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </form>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-5 md:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className={cn(
                "relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6",
                card.highlighted
                  ? "border border-white/15 bg-teal-brand"
                  : "border border-zinc-200 bg-white",
              )}
            >
              {/* Corner glow */}
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${
                  card.highlighted ? "bg-white/8" : "bg-teal-brand/6"
                }`}
              />
              {card.icon}
              <h3
                className={cn(
                  "text-base font-semibold",
                  card.highlighted ? "text-white" : "text-zinc-900",
                )}
              >
                {card.title}
              </h3>
              <p
                className={cn(
                  "flex-1 text-sm leading-relaxed",
                  card.highlighted ? "text-white/75" : "text-zinc-500",
                )}
              >
                {card.description}
              </p>
              {card.responseTime && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    card.highlighted ? "text-white/70" : "text-teal-brand",
                  )}
                >
                  Response time: {card.responseTime}
                </p>
              )}
              {card.highlighted && <hr className="border-t border-white/20" />}
              <a
                href={`mailto:${card.email}`}
                className={cn(
                  "text-sm font-medium transition-opacity hover:opacity-75",
                  card.highlighted ? "text-white" : "text-teal-brand",
                )}
              >
                {card.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
