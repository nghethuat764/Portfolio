import { useEffect } from 'react';
import { X, Server, Database, ShieldCheck, Code2, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { CompetencyCard, Language } from '../data/profile';

interface SkillModalProps {
  skill: CompetencyCard | null;
  lang: Language;
  onClose: () => void;
}

function SkillIcon({ iconKey }: { iconKey: CompetencyCard['iconKey'] }) {
  switch (iconKey) {
    case 'server':
      return <Server className="w-5 h-5 text-[#1D4ED8]" />;
    case 'database':
      return <Database className="w-5 h-5 text-[#DC2626]" />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5 text-[#059669]" />;
    case 'code':
      return <Code2 className="w-5 h-5 text-[#4F46E5]" />;
    case 'map':
      return <MapPin className="w-5 h-5 text-[#0891B2]" />;
    case 'users':
      return <Users className="w-5 h-5 text-[#D97706]" />;
  }
}

export function SkillModal({ skill, lang, onClose }: SkillModalProps) {
  useEffect(() => {
    if (!skill) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/65 backdrop-blur-xs p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/80">
              <div className="flex items-center gap-3">
                <SkillIcon iconKey={skill.iconKey} />
                <div>
                  <h3 id="skill-modal-title" className="text-base font-semibold text-zinc-950">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-zinc-500">{skill.shortSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs font-medium text-zinc-500">
                {lang === 'vi' ? 'Chi tiết năng lực thực tế' : 'Hands-on Competency Details'}
              </p>
              <ul className="space-y-2.5">
                {skill.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-zinc-700 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[#2563EB]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
