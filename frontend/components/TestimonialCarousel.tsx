"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[index];
  const go = (delta: number) => {
    setIndex((current) => (current + delta + testimonials.length) % testimonials.length);
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Quote className="mx-auto h-8 w-8 text-brand-500" />
      <p className="mt-6 text-xl font-medium text-slate-800">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-6 text-sm font-semibold text-slate-900">{testimonial.name}</p>
      <p className="text-sm text-slate-500">
        {testimonial.role}, {testimonial.company}
      </p>

      {testimonials.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-slate-400">
            {index + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
