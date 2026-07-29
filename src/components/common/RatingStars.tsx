"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function RatingStars({ initialRating = 5, reviewsCount = 120 }: { initialRating?: number; reviewsCount?: number }) {
  const [userRating, setUserRating] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setUserRating(star)}
            className="hover:scale-125 transition-transform"
            title={`Rate ${star} stars`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= (userRating || initialRating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
        {userRating || initialRating} / 5
      </span>
      <span className="text-xs text-slate-400">
        ({reviewsCount + (userRating ? 1 : 0)} votes)
      </span>
    </div>
  );
}
