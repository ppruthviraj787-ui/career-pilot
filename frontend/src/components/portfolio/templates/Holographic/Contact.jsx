import React, { useState, useId } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Gem,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from 'lucide-react';

/* ─── Shared crystal decoration (matches PrismEffect) ─── */
function CrystalShape({ className, style }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`pointer-events-none absolute ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-full w-full drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.35)" />
            <stop offset="50%"  stopColor="rgba(168,85,247,0.25)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.35)" />
          </linearGradient>
        </defs>
        <polygon
          points="40,4 72,28 60,76 20,76 8,28"
          fill={`url(#${id})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/* ─── Social icon button ─── */
function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
    >
      <Icon className="h-4 w-4 text-white/50 transition-colors duration-300 group-hover:text-cyan-300" />
    </a>
  );
}

/* ─── Contact info row ─── */
function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-purple-400/30 hover:bg-white/10">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10">
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-white/80 group-hover:text-cyan-200">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block no-underline">
      {inner}
    </a>
  ) : (
    inner
  );
}

/* ─── Holographic input ─── */
function HoloInput({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-white/40">
        {label}
        {required && <span className="ml-1 text-pink-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder-white/20 backdrop-blur-md outline-none transition-all duration-300 focus:border-purple-400/50 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.15)] focus:text-white"
      />
    </div>
  );
}

/* ─── Holographic textarea ─── */
function HoloTextarea({ label, id, placeholder, value, onChange, required, rows = 5 }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-white/40">
        {label}
        {required && <span className="ml-1 text-pink-400">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder-white/20 backdrop-blur-md outline-none transition-all duration-300 focus:border-purple-400/50 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.15)] focus:text-white"
      />
    </div>
  );
}

/* ─── Main component ─── */
export default function Contact() {
  const beamId = useId().replace(/:/g, '');

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1800);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f] text-white">
      <style>{`
        @keyframes holographic-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes rotate-gradient {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes prism-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes float-crystal {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(12deg); }
        }
        @keyframes spectrum-shimmer {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(12px, -16px) scale(1.05); }
          66%       { transform: translate(-8px, 10px) scale(0.95); }
        }
        @keyframes sent-scale {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .prism-shimmer-text {
          background-size: 200% auto;
          animation: holographic-shimmer 5s linear infinite;
        }
        .prism-rotate-bg   { animation: rotate-gradient 20s linear infinite; }
        .prism-beam-pulse  { animation: prism-pulse 3s ease-in-out infinite; }
        .prism-float       { animation: float-crystal 6s ease-in-out infinite; }
        .prism-orb-drift   { animation: orb-drift 8s ease-in-out infinite; }
        .spectrum-sweep    { animation: spectrum-shimmer 2.5s ease-in-out infinite; }
        .sent-pop          { animation: sent-scale 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* ── decorative background (identical to PrismEffect) ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,211,238,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(168,85,247,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,rgba(236,72,153,0.1),transparent_50%)]"  />
        <div
          className="prism-rotate-bg absolute -top-1/2 -left-1/2 h-[200%] w-[200%] opacity-30"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(34,211,238,0.08), rgba(59,130,246,0.06), rgba(168,85,247,0.08), rgba(236,72,153,0.06), rgba(34,211,238,0.08))',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="prism-orb-drift absolute top-16 left-[10%] h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
        <div
          className="prism-orb-drift absolute bottom-24 right-[12%] h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="prism-orb-drift absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* ── floating crystals ── */}
      <CrystalShape className="prism-float top-10 left-[6%]  h-12 w-12 opacity-60" style={{ animationDelay: '0s' }} />
      <CrystalShape className="prism-float top-16 right-[8%] h-9  w-9  opacity-50" style={{ animationDelay: '1.8s' }} />
      <CrystalShape className="prism-float bottom-12 left-[14%] h-7 w-7 opacity-40" style={{ animationDelay: '3.2s' }} />
      <CrystalShape className="prism-float bottom-20 right-[18%] h-10 w-10 opacity-45" style={{ animationDelay: '0.9s' }} />

      {/* ── content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        {/* header */}
        <div className="mb-14 text-center">
          {/* prism beam decoration */}
          <svg
            className="pointer-events-none absolute left-1/2 top-16 h-32 w-80 -translate-x-1/2"
            viewBox="0 0 320 120"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={beamId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="35%"  stopColor="#a855f7" stopOpacity="0.55" />
                <stop offset="65%"  stopColor="#ec4899" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0,1,2,3,4].map((i) => {
              const angle = i * 36 - 72;
              return (
                <line
                  key={i}
                  x1="160" y1="60"
                  x2={160 + Math.cos((angle * Math.PI) / 180) * 130}
                  y2={60  + Math.sin((angle * Math.PI) / 180) * 55}
                  stroke={`url(#${beamId})`}
                  strokeWidth="1.5"
                  className="prism-beam-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              );
            })}
            <polygon
              points="160,44 178,60 160,76 142,60"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
              className="prism-beam-pulse"
            />
          </svg>

          <div className="relative mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Gem className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Get In Touch</span>
          </div>

          <h2 className="relative mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="prism-shimmer-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>

          <p className="relative mx-auto max-w-lg bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-base text-transparent sm:text-lg">
            Reach out and let's create something extraordinary through light, color, and precision.
          </p>

          {/* rainbow spectrum bar */}
          <div className="relative mx-auto mt-8 h-px max-w-sm overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400" />
            <div className="spectrum-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        {/* two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">

          {/* ── left col: info ── */}
          <div className="flex flex-col gap-6 lg:col-span-2">

            {/* contact rows */}
            <div className="flex flex-col gap-3">
              <ContactRow icon={Mail}   label="Email"    value="hello@yourportfolio.dev" href="mailto:hello@yourportfolio.dev" />
              <ContactRow icon={Phone}  label="Phone"    value="+1 (555) 000-0000"       href="tel:+15550000000" />
              <ContactRow icon={MapPin} label="Location" value="San Francisco, CA" />
            </div>

            {/* availability badge */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              <div>
                <p className="text-sm font-medium text-white/80">Available for opportunities</p>
                <p className="text-xs text-white/40">Typically replies within 24 hours</p>
              </div>
            </div>

            {/* socials */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Find me on</p>
              <div className="flex flex-wrap gap-3">
                <SocialLink href="https://github.com"   label="GitHub"   icon={Github}   />
                <SocialLink href="https://linkedin.com" label="LinkedIn" icon={Linkedin} />
                <SocialLink href="https://twitter.com"  label="Twitter"  icon={Twitter}  />
                <SocialLink href="mailto:hello@yourportfolio.dev" label="Email" icon={Mail} />
              </div>
            </div>

            {/* decorative prism card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3))',
                }}
                aria-hidden="true"
              />
              <Gem className="mb-3 h-5 w-5 text-cyan-400" />
              <p className="text-sm font-medium text-white/80">Open to collaborations</p>
              <p className="mt-1 text-xs leading-relaxed text-white/40">
                Whether it's freelance work, full-time roles, or exciting side projects — let's talk.
              </p>
              <a
                href="mailto:hello@yourportfolio.dev"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-300 transition-colors hover:text-cyan-200"
              >
                <span>Say hello</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* ── right col: form ── */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-md sm:p-8">
              {/* iridescent top edge */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(34,211,238,0.6) 20%, rgba(168,85,247,0.6) 50%, rgba(236,72,153,0.6) 80%, transparent)',
                }}
                aria-hidden="true"
              />

              {status === 'sent' ? (
                /* ── success state ── */
                <div className="sent-pop flex min-h-[360px] flex-col items-center justify-center gap-5 text-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-full opacity-40"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(34,211,238,0.5), rgba(168,85,247,0.5))',
                      }}
                      aria-hidden="true"
                    />
                    <CheckCircle2 className="relative h-9 w-9 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="prism-shimmer-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
                      Transmission Sent!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/50">
                      Your message has been received across the holographic spectrum. I'll be in touch shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-widest text-white/60 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:bg-white/10 hover:text-white"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                /* ── form ── */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-8 flex items-center gap-3">
                    <div
                      className="h-px flex-1"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(168,85,247,0.5), transparent)',
                      }}
                    />
                    <span className="text-xs uppercase tracking-[0.25em] text-white/40">New Message</span>
                    <div
                      className="h-px flex-1"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.5))',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <HoloInput
                      label="Name"
                      id="contact-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update('name')}
                      required
                    />
                    <HoloInput
                      label="Email"
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update('email')}
                      required
                    />
                  </div>

                  <div className="mt-5">
                    <HoloInput
                      label="Subject"
                      id="contact-subject"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={update('subject')}
                    />
                  </div>

                  <div className="mt-5">
                    <HoloTextarea
                      label="Message"
                      id="contact-message"
                      placeholder="Tell me about your project, idea, or opportunity..."
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/30">
                      Fields marked <span className="text-pink-400">*</span> are required
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(168,85,247,0.25), rgba(236,72,153,0.25))',
                        border: '1px solid rgba(168,85,247,0.35)',
                      }}
                    >
                      {/* shimmer sweep on hover */}
                      <span
                        className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]"
                        aria-hidden="true"
                      />
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
                          <span>Transmitting…</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
