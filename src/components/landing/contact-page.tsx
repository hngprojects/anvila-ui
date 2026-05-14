"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideBook,
  X,
  Menu,
  User,
  LucideLink,
  LucideStar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    enquiry: "",
    message: "",
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Pricing", href: "/pricing" },
  ];

  const footerLinks = {
    "Our Services": [
      { name: "Create Package", href: "#" },
      { name: "Browse Registry", href: "#" },
      { name: "GitHub Publishing", href: "#" },
      { name: "Pricing", href: "/pricing" },
      { name: "Early Access", href: "#" },
    ],
    Company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "#" },
      { name: "Contacts", href: "/contact" },
      { name: "Partners", href: "#" },
    ],
    "Support & Legal": [
      { name: "GitHub", href: "#" },
      { name: "Twitter / X", href: "#" },
      { name: "Linkedin", href: "#" },
      { name: "Discord", href: "#" },
      { name: "Product Hunt", href: "#" },
    ],
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation logic
    if (!form.fullname.trim()) newErrors.fullname = "Fullname is required";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email =
        "Please enter a valid email address (e.g. name@example.com)";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setForm({
        fullname: "",
        email: "",
        phone: "",
        enquiry: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A]">
      {/* Header */}
      <header className="w-full">
        <div className="mx-auto flex h-20 md:h-24 max-w-[1440px] items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-10 lg:gap-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004D40] shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M12 13c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                </svg>
              </div>
              <span className="text-xl md:text-2xl font-[900] tracking-[0.05em] text-[#004D40]">
                ANVILA
              </span>
            </Link>

            <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[14px] lg:text-[15px] font-semibold text-[#1A1A1A] transition-colors hover:text-[#004D40]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="outline"
              className="hidden h-auto rounded-lg border-gray-200 px-6 lg:px-10 py-3 text-sm font-bold text-[#1A1A1A] shadow-sm sm:flex transition-all hover:bg-gray-50"
            >
              Login
            </Button>
            <Button className="h-auto rounded-lg bg-[#004D40] px-6 lg:px-10 py-3 text-sm font-bold text-white shadow-lg shadow-[#004D40]/20 hover:bg-[#003632] transition-all active:scale-95">
              Get Started
            </Button>
            <button
              className="md:hidden p-2 text-[#004D40]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-[#1A1A1A]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <Button
                variant="outline"
                className="w-full justify-center py-4 font-bold"
              >
                Login
              </Button>
              <Button className="w-full justify-center bg-[#004D40] text-white py-4 font-bold shadow-lg shadow-[#004D40]/20">
                Get Started
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Page Header */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 pb-8 pt-12 md:pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-[32px] md:text-[32px] font-[500]  text-[#0C0E0D]">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-[18px] md:text-[18px] leading-relaxed text-[#000000] font-[400]">
              Have questions about the Anvila protocol or need help scaling your
              AI workforce? Our team of architects is ready to assist.
            </p>
          </motion.div>
        </section>

        {/* Form Section */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[24px]  bg-[#FFFFFF] px-6 py-12 md:px-16 lg:py-20 shadow-sm"
          >
            <h2 className="mb-12 text-center text-[48px] md:text-[48px] font-[700]  text-[#0C0E0D]">
              Get in Touch
            </h2>

            <form onSubmit={handleSubmit} className="mx-auto max-w-[1000px]">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                {/* Fullname */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullname"
                    className="text-[18px] font-[500] text-[#0C0E0D] ml-1"
                  >
                    Fullname
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Enter Fullname"
                    className={`rounded-xl border ${errors.fullname ? "border-[#FF5630]" : "border-gray-200"} bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder-[#919EAB] outline-none transition-
                  />
                  {errors.fullname && (
                    <p className="text-[#FF5630] text-xs font-medium ml-1 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullname}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[18px] font-[500] text-[#1A1A1A] ml-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`rounded-xl border ${errors.email ? "border-[#FF5630]" : "border-gray-200"} bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder-[#919EAB] outline-none transition-all
                  />
                  {errors.email && (
                    <p className="text-[#FF5630] text-xs font-medium ml-1 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-[18px] font-[500] text-[#1A1A1A] ml-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`rounded-xl border ${errors.phone ? "border-[#FF5630]" : "border-gray-200"} bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder-[#919EAB] outline-none transition-all
                  />
                  {errors.phone && (
                    <p className="text-[#FF5630] text-xs font-medium ml-1 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Enquiry */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="enquiry"
                    className="text-[18px] font-[500] text-[#1A1A1A] ml-1"
                  >
                    Enquiry Type
                  </label>
                  <input
                    id="enquiry"
                    name="enquiry"
                    type="text"
                    value={form.enquiry}
                    onChange={handleChange}
                    placeholder="Enquiry"
                    className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder-[#919EAB] outline-none transition-all focus:border-[#004D40] focus:ring-4 focus
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-[18px] font-[500] text-[#1A1A1A] ml-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    className={`resize-none rounded-xl border ${errors.message ? "border-[#FF5630]" : "border-gray-200"} bg-white px-5 py-4 text-base text-[#1A1A1A] placeholder-[#919EAB] outline-none 
                  />
                  {errors.message && (
                    <p className="text-[#FF5630] text-xs font-medium ml-1 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full max-w-[572px] rounded-[8px] bg-[#004C48] py-4 text-lg font-bold text-white shadow-xl shadow-[#004D40]/20 transition-all hover:bg-[#003632] active:scale-95 disabled:
                >
                  {status === "loading" ? "Processing..." : "Continue"}
                </Button>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#36B37E] font-bold flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message sent successfully!
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </section>

        {/* Contact Cards */}
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 pb-24 md:pb-32 lg:pb-40">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Technical Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 w-[411px] rounded-[24px] border border-gray-100 bg-white p-8 md:p-10 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#0C0E0D]">
                Technical Support
              </h3>
              <p className="text-[15px] md:text-[16px] leading-relaxed text-[#637381]">
                Struggling with a GitHub sync or the dna.md structure? Our
                developers are here to help you troubleshoot your Forge.
              </p>
              <div className="mt-auto pt-4 space-y-2">
                <p className="text-sm font-bold text-[#1A1A1A]">
                  Response time: Under 24 hours
                </p>
                <p className="text-sm font-bold text-[#1A1A1A]">
                  Email:{" "}
                  <a
                    href="mailto:support@Anvila.ai"
                    className="text-[#004D40] hover:underline"
                  >
                    support@Anvila.ai
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Partnerships */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col w-[411px] gap-6 rounded-[24px] bg-[#0C5D56] p-8 md:p-10 text-white shadow-2xl shadow-[#004D40]/30"
            >
              <h3 className="text-xl md:text-2xl font-bold">
                Partnerships & Enterprise
              </h3>
              <p className="text-[15px] md:text-[16px] leading-relaxed text-white/80">
                Looking for private registries or custom Agent DNA for your
                organization? Let&apos;s build a tailored solution.
              </p>
              <div className="mt-auto pt-4">
                <p className="text-sm font-bold">
                  Email:{" "}
                  <a
                    href="mailto:partners@Anvila.ai"
                    className="text-white/80 hover:text-white hover:underline"
                  >
                    partners@Anvila.ai
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Media & Press */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 w-[411px] rounded-[24px] border border-gray-100 bg-white p-8 md:p-10 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#0C0E0D]">
                Media & Press
              </h3>
              <p className="text-[15px] md:text-[16px] leading-relaxed text-[#637381]">
                Interested in featuring Anvila&apos;s mission to standardize
                portable intelligence?
              </p>
              <div className="mt-auto pt-4">
                <p className="text-sm font-bold text-[#1A1A1A]">
                  Email:{" "}
                  <a
                    href="mailto:press@Anvila.ai"
                    className="text-[#004D40] hover:underline"
                  >
                    press@Anvila.ai
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0C5D56] text-[#FFFFFF] pt-24 md:pt-32 pb-16 border-t border-white/5">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Link href="/" className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                  <User className="h-5 w-5 fill-white text-[#FFFFFF]" />
                </div>
                <span className="text-[24px] font-[900] tracking-[0.05em]">
                  ANVILA
                </span>
              </Link>
              <p className="mb-10 max-w-sm text-base leading-relaxed text-[#E7E7E7]">
                Builders use Anvila to turn plain descriptions into reusable AI
                agent packages that can be cloned, adapted, published, or kept
                private.
              </p>
              <div className="flex gap-4 md:gap-6">
                {[
                  {
                    name: "Facebook",
                    href: "https://facebook.com",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.
                      </svg>
                    ),
                  },
                  {
                    name: "Twitter",
                    href: "https://twitter.com",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 md:h-5 md:w-5"
                      >
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2
                      </svg>
                    ),
                  },
                  {
                    name: "Instagram",
                    href: "https://instagram.com",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 md:h-6 md:w-6"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-[#0C5D56] transition-all hover:scale-110 active:scale-95 shadow-md"
                    aria-label={social.name}
                  >
                    {social.svg}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-4 lg:col-span-7">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-6 md:gap-8">
                  <h4 className="text-[15px] md:text-[16px] font-bold text-white tracking-wide">
                    {title}
                  </h4>
                  <ul className="space-y-4 md:space-y-5 text-sm md:text-base">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[#E7E7E7] transition-colors hover:text-white font-[400]"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 h-px bg-[#F6F7F7]" />

          <div className="flex flex-col items-center justify-between gap-8 text-sm md:text-base md:flex-row">
            <p className="font-medium text-[#E7E7E7]">
              &copy; {new Date().getFullYear()} Anvila. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[#E7E7E7]">
              <Link
                href="#"
                className="transition-colors hover:text-white font-medium"
              >
                Privacy Policy
              </Link>
              <div className="hidden md:block h-1.5 w-1.5 rounded-full bg-[#E7E7E7]" />
              <Link
                href="#"
                className="transition-colors hover:text-white font-medium"
              >
                Terms of service
              </Link>
              <div className="hidden md:block h-1.5 w-1.5 rounded-full bg-[#E7E7E7]" />
              <Link
                href="#"
                className="transition-colors hover:text-white font-medium"
              >
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
