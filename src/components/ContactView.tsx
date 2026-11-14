import { CheckCircle2, ExternalLink, GraduationCap, Mail, Phone } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';

type FieldName = 'name' | 'email' | 'phone' | 'message';

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DIGITS_ONLY = /^[0-9]+$/;

function validateField(field: FieldName, value: string): string {
  const trimmed = value.trim();
  if (trimmed === '') return 'This field cannot be empty.';
  if (field === 'email' && !EMAIL_PATTERN.test(trimmed)) {
    return 'Enter a valid email address, like name@example.com.';
  }
  if (field === 'phone' && !DIGITS_ONLY.test(trimmed)) {
    return 'Phone number must contain digits only (0-9).';
  }
  return '';
}

export function ContactView() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (field: FieldName, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (statusMessage?.type === 'success') {
      setStatusMessage(null);
    }
    if (errors[field]) {
      const nextErr = validateField(field, nextValue);
      setErrors((prev) => ({ ...prev, [field]: nextErr }));
    }
  };

  const handleBlur = (field: FieldName) => {
    const nextErr = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: nextErr }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields: FieldName[] = ['name', 'email', 'phone', 'message'];
    const nextErrors: FormErrors = {};
    let firstInvalid: FieldName | null = null;

    for (const field of fields) {
      const msg = validateField(field, values[field]);
      if (msg) {
        nextErrors[field] = msg;
        if (!firstInvalid) firstInvalid = field;
      }
    }

    setErrors(nextErrors);

    if (firstInvalid) {
      setStatusMessage({
        type: 'error',
        text: 'Fix the highlighted fields and send again.',
      });
      const refMap = {
        name: nameRef,
        email: emailRef,
        phone: phoneRef,
        message: messageRef,
      };
      refMap[firstInvalid].current?.focus();
      return;
    }

    const senderName = values.name.trim();
    setStatusMessage({
      type: 'success',
      text: `Thank you, ${senderName}. Your message has been recorded.`,
    });
    setValues({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  return (
    <div>
      {/* Editorial Page Header */}
      <section className="bg-gradient-to-br from-[#0B2D4F] via-[#0B2D4F] to-[#081F37] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-wide text-[#DFC5A6]">
            Direct Channels · Inquiries
          </p>
          <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white text-balance">
            Contact
          </h1>
          <p className="mt-2.5 max-w-2xl text-base text-[#DBE6F2]">
            Send a message using the validated form or reach me directly through the
            channels below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Validated Contact Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] p-6 sm:p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
            >
              Full Name
            </label>
            <input
              ref={nameRef}
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] transition-colors focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-[#B3261E] dark:border-[#FF746E] focus:ring-[#B3261E]/20 dark:focus:ring-[#FF746E]/25'
                  : 'border-[#AAB8C8] dark:border-[#294568] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25'
              }`}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-xs font-medium text-[#B3261E] dark:text-[#FF9A94]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
            >
              Email Address
            </label>
            <input
              ref={emailRef}
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] transition-colors focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-[#B3261E] dark:border-[#FF746E] focus:ring-[#B3261E]/20 dark:focus:ring-[#FF746E]/25'
                  : 'border-[#AAB8C8] dark:border-[#294568] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25'
              }`}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-xs font-medium text-[#B3261E] dark:text-[#FF9A94]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
            >
              Phone Number
            </label>
            <input
              ref={phoneRef}
              id="contact-phone"
              name="phone"
              type="text"
              inputMode="numeric"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] transition-colors focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-[#B3261E] dark:border-[#FF746E] focus:ring-[#B3261E]/20 dark:focus:ring-[#FF746E]/25'
                  : 'border-[#AAB8C8] dark:border-[#294568] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25'
              }`}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="mt-1.5 text-xs font-medium text-[#B3261E] dark:text-[#FF9A94]">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] mb-1.5"
            >
              Message
            </label>
            <textarea
              ref={messageRef}
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#17212E] dark:text-[#D9E4F0] bg-white dark:bg-[#0B192C] transition-colors focus:outline-none focus:ring-2 ${
                errors.message
                  ? 'border-[#B3261E] dark:border-[#FF746E] focus:ring-[#B3261E]/20 dark:focus:ring-[#FF746E]/25'
                  : 'border-[#AAB8C8] dark:border-[#294568] focus:border-[#0B2D4F] dark:focus:border-[#5D8AB8] focus:ring-[#0B2D4F]/15 dark:focus:ring-[#5D8AB8]/25'
              }`}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-[#B3261E] dark:text-[#FF9A94]">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[#E63C36] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C92D28] transition-colors cursor-pointer"
          >
            Send Message
          </button>

          {statusMessage && (
            <div
              role="status"
              className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-semibold ${
                statusMessage.type === 'success'
                  ? 'border-[#2F8F5B]/30 dark:border-[#2F8F5B]/45 bg-[#E6F4EC] dark:bg-[#123325] text-[#17523A] dark:text-[#7FE3AB]'
                  : 'border-[#B3261E]/30 dark:border-[#B3261E]/50 bg-[#FCECEB] dark:bg-[#3A1618] text-[#B3261E] dark:text-[#FF9A94]'
              }`}
            >
              {statusMessage.type === 'success' && (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </form>

        {/* Direct Contact Channels */}
        <aside className="lg:col-span-5 space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#0B2D4F] dark:text-[#F0F5FA]">
            Other Ways to Reach Me
          </h2>
          <div className="rounded-2xl border border-[#D8E0EA] dark:border-[#1F3756] bg-white dark:bg-[#10243E] divide-y divide-[#D8E0EA] dark:divide-[#1F3756]">
            <a
              href={PROFILE.phoneHref}
              className="flex items-center gap-4 p-5 hover:bg-[#F6F8FB] dark:hover:bg-[#162C49] transition-colors"
            >
              <Phone className="h-5 w-5 text-[#E63C36] dark:text-[#FF746E] shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Phone</p>
                <p className="text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] tabular-nums">
                  {PROFILE.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-4 p-5 hover:bg-[#F6F8FB] dark:hover:bg-[#162C49] transition-colors"
            >
              <Mail className="h-5 w-5 text-[#E63C36] dark:text-[#FF746E] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">Email</p>
                <p className="text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA] truncate">
                  {PROFILE.email}
                </p>
              </div>
            </a>

            <div className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-4">
                <GraduationCap className="h-5 w-5 text-[#0B2D4F] dark:text-[#DFC5A6] shrink-0" />
                <div>
                  <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">University</p>
                  <p className="text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                    {PROFILE.university}
                  </p>
                </div>
              </div>
              <img
                src={PROFILE.mivaLogoLightBg}
                alt="MIVA Open University"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="h-7 w-auto object-contain shrink-0 dark:rounded dark:bg-white dark:px-2 dark:py-1"
              />
            </div>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-5 hover:bg-[#F6F8FB] dark:hover:bg-[#162C49] transition-colors"
            >
              <div>
                <p className="text-xs font-medium text-[#5A6B7E] dark:text-[#98AFC7]">GitHub</p>
                <p className="text-sm font-semibold text-[#0B2D4F] dark:text-[#F0F5FA]">
                  github.com/Zannu-Opeyemi
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-[#5A6B7E] dark:text-[#98AFC7] shrink-0" />
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}
