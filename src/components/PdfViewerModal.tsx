import { useEffect } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Language } from '../data/profile';

interface PdfViewerModalProps {
  isOpen: boolean;
  pdfUrl: string;
  lang: Language;
  onClose: () => void;
}

export function PdfViewerModal({
  isOpen,
  pdfUrl,
  lang,
  onClose,
}: PdfViewerModalProps) {
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  const isVi = lang === 'vi';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-viewer-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-white border-b border-zinc-200/90 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <div className="min-w-0">
                  <h2
                    id="pdf-viewer-title"
                    className="text-sm font-semibold text-zinc-950 truncate"
                  >
                    {isVi
                      ? 'CV Hoàng Văn Thiện — IT Supervisor (Bản PDF gốc)'
                      : 'Hoang Van Thien — IT Supervisor Resume (Original PDF)'}
                  </h2>
                  <p className="text-[11px] font-mono text-zinc-500 truncate">
                    CV_Hoang_Van_Thien_IT_Supervisor.pdf
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  download="CV_Hoang_Van_Thien_IT_Supervisor.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#0B469B] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Lưu về máy' : 'Save PDF'}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={isVi ? 'Đóng trình xem PDF' : 'Close PDF viewer'}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Embedded In-Page PDF Viewer */}
            <div className="flex-1 bg-zinc-100 relative overflow-hidden">
              <object
                data={`${pdfUrl}#view=FitH`}
                type="application/pdf"
                className="w-full h-full"
                aria-label="CV Hoàng Văn Thiện PDF"
              >
                <iframe
                  src={`${pdfUrl}#view=FitH`}
                  title="CV Hoàng Văn Thiện PDF"
                  className="w-full h-full border-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-50 space-y-4">
                  <p className="text-sm text-zinc-700 max-w-md">
                    {isVi
                      ? 'Trình duyệt trên thiết bị này không hỗ trợ xem trước PDF trực tiếp. Bạn có thể tải tệp PDF về để xem đầy đủ.'
                      : 'Inline PDF preview is not supported on this device browser. You can download the PDF file directly.'}
                  </p>
                  <a
                    href={pdfUrl}
                    download="CV_Hoang_Van_Thien_IT_Supervisor.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0B469B] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isVi ? 'Tải xuống CV (PDF)' : 'Download CV (PDF)'}</span>
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
