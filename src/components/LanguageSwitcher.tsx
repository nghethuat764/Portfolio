import type { Language } from '../data/profile';

interface LanguageSwitcherProps {
  lang: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

function VietnamFlagIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="w-5 h-3.5 rounded-[2px] shrink-0 border border-black/10"
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#DA251D" />
      <polygon
        points="12,3.2 13.15,6.75 16.9,6.75 13.85,8.95 15,12.5 12,10.3 9,12.5 10.15,8.95 7.1,6.75 10.85,6.75"
        fill="#FFFF00"
      />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg
      viewBox="0 0 24 16"
      className="w-5 h-3.5 rounded-[2px] shrink-0 border border-black/10"
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="2.8" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#FFFFFF" strokeWidth="4.4" />
      <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}

export function LanguageSwitcher({
  lang,
  onChange,
  compact = false,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={lang === 'vi' ? 'Chuyển đổi ngôn ngữ' : 'Switch language'}
      className={`inline-flex items-center p-1 bg-zinc-100 rounded-lg border border-zinc-200/80 ${
        compact ? 'gap-0.5' : 'w-full gap-1'
      }`}
    >
      <button
        type="button"
        onClick={() => onChange('vi')}
        aria-pressed={lang === 'vi'}
        title="Tiếng Việt"
        className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
          compact ? 'px-2 py-1.5 text-[11px] min-h-[34px]' : 'flex-1 px-2.5 py-2 text-xs min-h-[36px]'
        } ${
          lang === 'vi'
            ? 'bg-white text-zinc-950 shadow-xs'
            : 'text-zinc-600 hover:text-zinc-950'
        }`}
      >
        <VietnamFlagIcon />
        <span>{compact ? 'VI' : 'Tiếng Việt'}</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('en')}
        aria-pressed={lang === 'en'}
        title="English"
        className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
          compact ? 'px-2 py-1.5 text-[11px] min-h-[34px]' : 'flex-1 px-2.5 py-2 text-xs min-h-[36px]'
        } ${
          lang === 'en'
            ? 'bg-white text-zinc-950 shadow-xs'
            : 'text-zinc-600 hover:text-zinc-950'
        }`}
      >
        <UkFlagIcon />
        <span>{compact ? 'EN' : 'English'}</span>
      </button>
    </div>
  );
}
