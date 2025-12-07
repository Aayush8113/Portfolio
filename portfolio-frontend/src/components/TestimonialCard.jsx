import React from "react";
import { motion } from "framer-motion";
import { Quote, Briefcase, Star, Sparkles } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  // 💡 SAFETY & DEFAULTS
  if (!testimonial || !testimonial.quote) return null;

  const name = testimonial.name || "Anonymous";
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const company = testimonial.company || "";
  const role = testimonial.role || "Client";
  const project = testimonial.project || "";
  const ratingRaw =
    typeof testimonial.rating === "number" ? testimonial.rating : 5;
  const rating = Math.min(5, Math.max(1, ratingRaw)); // clamp between 1 and 5

  const renderStars = () => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled
                ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.55)]"
                : "text-slate-600"
            }`}
            strokeWidth={filled ? 0.5 : 1.3}
          />
        );
      })}
      <span className="ml-2 text-[11px] font-medium text-slate-400">
        {rating.toFixed(1)} / 5.0
      </span>
    </div>
  );

  return (
    <motion.article
      aria-label={`Testimonial from ${name}`}
      className="relative flex h-full w-full min-h-[280px] flex-col justify-between 
                 overflow-hidden rounded-2xl border border-slate-800/70 
                 bg-slate-950/95 shadow-[0_18px_45px_rgba(15,23,42,0.9)]"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateX: 2,
        boxShadow: "0 30px 60px rgba(37, 99, 235, 0.45)",
      }}
      transition={{ type: "spring", stiffness: 230, damping: 22 }}
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* Outer subtle gradient ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-blue-500/25 via-transparent to-cyan-400/25 opacity-60" />

      {/* Inner glass surface */}
      <div className="relative z-10 h-full w-full rounded-[18px] bg-slate-950/95 p-[1px]">
        {/* Inner content layer */}
        <div className="relative h-full rounded-[16px] bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950 p-5 sm:p-6">
          {/* Background glow blobs */}
          <div className="pointer-events-none absolute -right-16 -top-10 h-32 w-32 rounded-full bg-blue-500/18 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-cyan-400/12 blur-3xl" />

          {/* Subtle grid overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.4),_transparent_55%),linear-gradient(to_right,rgba(75,85,99,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(75,85,99,0.25)_1px,transparent_1px)] bg-[length:120px_120px,38px_38px,38px_38px]" />

          {/* HEADER: badge + project + quote icon */}
          <div className="relative mb-4 flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                <Sparkles className="h-3 w-3 text-sky-300" />
                Client Feedback
              </span>
              {project && (
                <span className="text-xs font-medium text-sky-300/90">
                  {project}
                </span>
              )}
            </div>

            <motion.div
              className="text-blue-500/35"
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
            >
              <Quote className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.4} />
            </motion.div>
          </div>

          {/* Quote text */}
          <p className="relative z-10 mb-4 text-sm italic leading-relaxed text-slate-200 sm:text-[15px]">
            “{testimonial.quote}”
          </p>

          {/* Underline accent */}
          <div className="relative mb-4 h-[1px] w-16 rounded-full bg-gradient-to-r from-sky-400 to-transparent" />

          {/* Rating */}
          <div className="relative mb-3">{renderStars()}</div>

          {/* FOOTER: person info + avatar */}
          <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-slate-800/70 pt-4">
            <div className="flex flex-col text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {role}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-50">
                {name}
              </p>

              {company && (
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <Briefcase className="h-3 w-3 text-slate-500" />
                  <span>{company}</span>
                </p>
              )}
            </div>

            {/* Avatar with ring & small glow */}
            <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 shadow-[0_0_0_1px_rgba(148,163,184,0.7)]">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full 
                              bg-gradient-to-br from-blue-600 via-indigo-500 to-sky-400 
                              text-sm font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.8)]">
                {initial}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default TestimonialCard;
