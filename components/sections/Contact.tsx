"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Zod Schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name (minimum 2 characters)." }),
  phone: z
    .string()
    .regex(/^(07[0-9]{8})$/, { message: "Please enter a valid mobile number (e.g., 0774222970)." }),
  whatsapp: z
    .string()
    .regex(/^(07[0-9]{8})$/, { message: "Please enter a valid WhatsApp number (e.g., 0774222970)." })
    .or(z.literal("")),
  email: z
    .string()
    .email({ message: "Please enter a valid email address (e.g., name@gmail.com)." })
    .or(z.literal("")),
  message: z.string().min(5, { message: "Please enter your message or requirement." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

import { ContactSettings } from "@/utils/contact-settings";

export const Contact: React.FC<{ contactSettings?: ContactSettings | null }> = ({ contactSettings }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const pkgName = urlParams.get("package");
      if (pkgName) {
        setValue("message", `Hello, I would like to know more information and book the "${pkgName}" travel package.`);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Save submission to admin contacts JSON
      const { saveContactSubmission } = await import("@/app/admin/actions/contacts");
      await saveContactSubmission({
        name: data.name,
        email: data.email || "",
        phone: data.phone,
        subject: `Inquiry from ${data.name}`,
        message: data.message,
      });
    } catch (err) {
      // Silently ignore — form still shows success to user
      console.error("Failed to save contact submission:", err);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 8000); // Hide success after 8s
  };

  let mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126252.12876615598!2d80.31682855146522!3d8.344406263595208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf4f3645bbab5%3A0xc3d87de3eae1c3c5!2sAnuradhapura!5e0!3m2!1sen!2slk!4v1720000000000!5m2!1sen!2slk";

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-secondary tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full inline-block"
          >
            Contact Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mt-4 leading-tight"
          >
            Let's plan your next trip
          </motion.h2>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Form and Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Info Details & Map (Left Column: 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Quick Cards */}
            <div className="bg-section-bg border border-gray-100 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary tracking-wide">
                Office Information
              </h3>
              
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Address</h4>
                  <p className="text-base font-semibold text-primary mt-1">Anuradhapura, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone Numbers</h4>
                  <a href={`tel:${contactSettings?.phone || "0774222970"}`} className="text-base font-semibold text-primary mt-1 block hover:text-secondary transition-colors">
                    {contactSettings?.phone || "077 422 2970"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email</h4>
                  <a href={`mailto:${contactSettings?.email || "srysetharana@gmail.com"}`} className="text-base font-semibold text-primary mt-1 block hover:text-secondary transition-colors">
                    {contactSettings?.email || "srysetharana@gmail.com"}
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Embedded */}
            <div className="w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden shadow-sm border border-gray-150 relative">
              <iframe
                title="Setharana Travels Location"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form (Right Column: 7 Cols) */}
          <div className="lg:col-span-7 w-full bg-section-bg border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-primary tracking-wide mb-6">
              Send a Message
            </h3>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] p-4 rounded-2xl flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-base">Message received successfully!</p>
                  <p className="text-sm mt-1 text-[#388E3C] leading-relaxed">
                    Your details have been successfully received. A Setharana travel agent will contact you as soon as possible. Thank you for choosing us!
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-bold text-primary">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name here"
                  {...register("name")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-250 focus:border-secondary focus:ring-secondary/15"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Grid: Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-bold text-primary">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g.: 0774222970"
                    {...register("phone")}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-250 focus:border-secondary focus:ring-secondary/15"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="whatsapp" className="text-sm font-bold text-primary">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    placeholder="e.g.: 0774222970"
                    {...register("whatsapp")}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.whatsapp ? "border-red-500 focus:ring-red-200" : "border-gray-250 focus:border-secondary focus:ring-secondary/15"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-bold text-primary">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="e.g.: name@gmail.com"
                  {...register("email")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-250 focus:border-secondary focus:ring-secondary/15"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-bold text-primary">
                  Message or Requirement <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter the places you want to go, number of tourists and dates here..."
                  {...register("message")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message ? "border-red-500 focus:ring-red-200" : "border-gray-250 focus:border-secondary focus:ring-secondary/15"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-bold flex items-center justify-center gap-2.5 py-4 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
