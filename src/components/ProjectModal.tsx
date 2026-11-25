import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Language, LocalizedContent, ProjectItem } from '../data/profile';
import { ProjectVisualPreview } from './ProjectVisualPreview';

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  copy: LocalizedContent['projectModal'];
  onClose: () => void;
  onContactProject: (projectTitle: string) => void;
}

export function ProjectModal({
  project,
  lang,
  copy,
  onClose,
  onContactProject,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-xs border-b border-zinc-200/80">
              <div className="flex items-center gap-2 text-xs text-zinc-500 min-w-0">
                <span className="font-medium text-zinc-800 truncate">{project.platform}</span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">{project.year}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.closeLabel}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] shrink-0"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-3">
                <h2
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 text-balance"
                >
                  {project.title}
                </h2>
                <p className="text-base text-zinc-600 leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-zinc-200/90 min-h-[240px]">
                <ProjectVisualPreview visualType={project.visualType} lang={lang} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-zinc-200/80">
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 mb-1.5">
                    {copy.roleHeading}
                  </h3>
                  <p className="text-sm font-medium text-zinc-900">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 mb-1.5">
                    {copy.techHeading}
                  </h3>
                  <p className="text-sm text-zinc-800 leading-relaxed">
                    {project.deliverables.join(' · ')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 mb-1.5">
                    {copy.impactHeading}
                  </h3>
                  <p className="text-sm font-medium text-[#2563EB] leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200/80 space-y-3">
                <h3 className="text-sm font-semibold text-zinc-950">{copy.scopeHeading}</h3>
                <ul className="space-y-2">
                  {project.scope.map((line, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-zinc-700 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-400"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/80">
                <span className="text-xs text-zinc-500">{copy.footerPrompt}</span>
                <button
                  type="button"
                  onClick={() => {
                    onContactProject(project.title);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>{copy.contactBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
