"use client";
import { useState } from "react";
import { Download, Youtube } from "lucide-react";

interface Quality {
  label: string;
  res: string;
  key: string;
}

const QUALITIES: Quality[] = [
  { label: "Maximum HD (1080p)", res: "1280 × 720", key: "maxresdefault" },
  { label: "High Quality (HQ)", res: "480 × 360", key: "hqdefault" },
  { label: "Medium Quality (MQ)", res: "320 × 180", key: "mqdefault" },
  { label: "Standard Definition (SD)", res: "640 × 480", key: "sddefault" },
];

export function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);

  const extractVideoId = (input: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = input.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleProcess = () => {
    const id = extractVideoId(url.trim());
    setVideoId(id);
  };

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          className={inp}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            const id = extractVideoId(e.target.value.trim());
            setVideoId(id);
          }}
          placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
        />
        <button
          onClick={handleProcess}
          className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shrink-0 transition"
        >
          Extract
        </button>
      </div>

      {videoId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUALITIES.map((q) => {
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`;
            return (
              <div key={q.key} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{q.label}</p>
                    <p className="text-xs text-slate-400">{q.res}</p>
                  </div>
                  <a
                    href={thumbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`yt-thumb-${videoId}-${q.key}.jpg`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  <img src={thumbUrl} alt={q.label} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      ) : url.length > 5 ? (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm">
          Please enter a valid YouTube video URL.
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center text-slate-400">
          <Youtube className="w-12 h-12 mx-auto mb-3 text-red-500" />
          <p className="text-sm font-semibold">Paste any YouTube URL above to fetch all thumbnail resolutions</p>
        </div>
      )}
    </div>
  );
}
