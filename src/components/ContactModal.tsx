import { useEffect, useState, FormEvent } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LocalizedContent } from '../data/profile';

interface ContactModalProps {
  isOpen: boolean;
  initialSubject?: string;
  copy: LocalizedContent['contactModal'];
  onClose: () => void;
}

export function ContactModal({
  isOpen,
  initialSubject = '',
  copy,
  onClose,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(copy.requiredError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(copy.emailError);
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-zinc-200/80">
              <div>
                <h2 id="contact-modal-title" className="text-lg font-semibold text-zinc-950">
                  {copy.title}
                </h2>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label={copy.closeBtn}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950">{copy.successTitle}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{copy.successDesc}</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[42px]"
                  >
                    {copy.closeBtn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="block text-xs font-medium text-zinc-700">
                      {copy.nameLabel} <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.namePlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-email" className="block text-xs font-medium text-zinc-700">
                      {copy.emailLabel} <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.emailPlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-subject" className="block text-xs font-medium text-zinc-700">
                      {copy.subjectLabel}
                    </label>
                    <input
                      id="modal-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={copy.subjectPlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-message" className="block text-xs font-medium text-zinc-700">
                      {copy.messageLabel} <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="modal-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy.messagePlaceholder}
                      className="w-full px-3.5 py-2 text-sm text-zinc-950 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 resize-y"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2"
                    >
                      {error}
                    </p>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[42px]"
                    >
                      <span>{copy.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
