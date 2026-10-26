"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  message: z.string().trim().min(20, "Add a little more detail.").max(4000),
  _gotcha: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-border bg-background/65 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/75 focus:border-accent/60 focus:ring-2 focus:ring-accent/25";

export default function ContactForm() {
  const [status, setStatus] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", _gotcha: "" },
  });

  async function submit(values: ContactValues) {
    setStatus(undefined);
    if (values._gotcha) {
      setStatus({
        type: "error",
        message: "The message could not be submitted. Please use the email link.",
      });
      return;
    }

    if (!formspreeId) {
      setStatus({
        type: "error",
        message:
          "The contact form is not configured yet. Please use the email link above.",
      });
      return;
    }

    const payload = new FormData();
    payload.set("name", values.name);
    payload.set("email", values.email);
    payload.set("message", values.message);
    payload.set("_gotcha", values._gotcha ?? "");

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            "Your message could not be sent. Please try again or use the email link.",
        });
        return;
      }

      reset();
      setStatus({
        type: "success",
        message: "Your message has been sent. Thank you.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "A network error prevented delivery. Please try again or use the email link.",
      });
    }
  }

  return (
    <form
      className="mt-10 grid gap-5 border-t border-border pt-8 sm:grid-cols-2"
      noValidate
      onSubmit={handleSubmit(submit)}
    >
      <div className="absolute -left-[10000px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="contact-website"
          tabIndex={-1}
          type="text"
          {...register("_gotcha")}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground" htmlFor="contact-name">
          Name
        </label>
        <input
          autoComplete="name"
          className={fieldClassName}
          id="contact-name"
          placeholder="Your name"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p className="mt-2 text-xs text-red-200" id="contact-name-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-foreground" htmlFor="contact-email">
          Email
        </label>
        <input
          autoComplete="email"
          className={fieldClassName}
          id="contact-email"
          placeholder="Your email address"
          type="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p className="mt-2 text-xs text-red-200" id="contact-email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-message">
          What would you like to build?
        </label>
        <textarea
          className={`${fieldClassName} min-h-36 resize-y`}
          id="contact-message"
          placeholder="Share a few details about your project."
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        {errors.message ? (
          <p className="mt-2 text-xs text-red-200" id="contact-message-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-start gap-3 sm:col-span-2">
        <Button disabled={isSubmitting} size="lg" type="submit">
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        <p
          aria-live="polite"
          className={`text-sm ${
            status?.type === "error" ? "text-red-200" : "text-accent"
          }`}
          role="status"
        >
          {status?.message}
        </p>
      </div>
    </form>
  );
}
