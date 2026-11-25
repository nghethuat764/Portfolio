import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Database,
  Download,
  FolderKanban,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Server,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  CONTENT,
  type CompetencyCard,
  type Language,
  type ProjectItem,
  type SkillColorTheme,
} from './data/profile';
import { ResilientImage } from './components/ResilientImage';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { SkillModal } from './components/SkillModal';
import { ContactModal } from './components/ContactModal';
import {
  HighlightIcon,
  HTMonogram,
  ProjectCardArtwork,
  QrCodeGraphic,
} from './components/TechBrandMarks';

const SKILL_THEME_CLASSES: Record<
  SkillColorTheme,
  { card: string; iconBg: string; iconColor: string }
> = {
  blue: {
    card: 'bg-[#EFF6FF] hover:bg-[#DBEAFE]/80 border-[#BFDBFE]/70',
    iconBg: 'bg-[#1D4ED8] text-white',
    iconColor: 'text-[#1D4ED8]',
  },
  rose: {
    card: 'bg-[#FEF2F2] hover:bg-[#FEE2E2]/80 border-[#FECACA]/70',
    iconBg: 'bg-[#EF4444] text-white',
    iconColor: 'text-[#DC2626]',
  },
  emerald: {
    card: 'bg-[#ECFDF5] hover:bg-[#D1FAE5]/80 border-[#A7F3D0]/70',
    iconBg: 'bg-[#10B981] text-white',
    iconColor: 'text-[#059669]',
  },
  indigo: {
    card: 'bg-[#EEF2FF] hover:bg-[#E0E7FF]/80 border-[#C7D2FE]/70',
    iconBg: 'bg-[#4F46E5] text-white',
    iconColor: 'text-[#4F46E5]',
  },
  cyan: {
    card: 'bg-[#ECFEFF] hover:bg-[#CFFAFE]/80 border-[#A5F3FC]/70',
    iconBg: 'bg-[#0891B2] text-white',
    iconColor: 'text-[#0891B2]',
  },
  amber: {
    card: 'bg-[#FFFBEB] hover:bg-[#FEF3C7]/80 border-[#FDE68A]/70',
    iconBg: 'bg-[#F59E0B] text-white',
    iconColor: 'text-[#D97706]',
  },
};

function renderSkillTileIcon(iconKey: CompetencyCard['iconKey']) {
  switch (iconKey) {
    case 'server':
      return <Server className="w-5 h-5" strokeWidth={1.9} />;
    case 'database':
      return <Database className="w-5 h-5" strokeWidth={1.9} />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5" strokeWidth={1.9} />;
    case 'code':
      return <Code2 className="w-5 h-5" strokeWidth={1.9} />;
    case 'map':
      return <MapPin className="w-5 h-5" strokeWidth={1.9} />;
    case 'users':
      return <Users className="w-5 h-5" strokeWidth={1.9} />;
  }
}

function SectionArrivalBar({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[2.5px] w-full rounded-full bg-gradient-to-r from-[#0B469B] via-[#2563EB] to-[#22D3EE] origin-left mt-1.5"
        />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [activeNav, setActiveNav] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  const { scrollY, scrollYProgress } = useScroll();
  const scrollProgressScale = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });
  const heroBackdropY = useTransform(scrollY, [0, 500], [0, 64]);
  const heroBackdropOpacity = useTransform(scrollY, [0, 460], [0.35, 0.12]);
  const highlightStripY = useTransform(scrollY, [0, 320], [0, -10]);

  const content = CONTENT[lang];
  const {
    nav,
    hero,
    highlights,
    about,
    skillsSection,
    projectsSection,
    experienceSection,
    educationSection,
    contactSection,
    footer,
    profile,
    competencies,
    projects,
    experiences,
  } = content;

  useEffect(() => {
    document.title = content.pageTitle;
    document.documentElement.lang = lang;
  }, [content.pageTitle, lang]);

  useEffect(() => {
    const sectionOrder = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

    const handleScrollSpy = () => {
      const scrollTop = window.scrollY;
      setShowScrollTop(scrollTop > 280);

      if (isProgrammaticScrollRef.current) return;

      if (scrollTop < 180) {
        setActiveNav('top');
        return;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        setActiveNav('contact');
        return;
      }

      const anchorY = 140;
      let currentId = 'about';
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchorY) {
          currentId = id;
        }
      }
      setActiveNav(currentId);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (highlightTimeoutRef.current) window.clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  const triggerArrivalHighlight = (id: string) => {
    if (id === 'top') return;
    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current);
    }
    setHighlightedSection(id);
    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedSection(null);
    }, 1150);
  };

  const scrollToSection = (id: string, e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    setActiveNav(id);
    setMobileMenuOpen(false);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetY = 0;
    if (id !== 'top') {
      const targetEl = document.getElementById(id);
      if (!targetEl) return;
      const headerOffset = 94;
      const rawTop = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetY = Math.min(Math.max(0, rawTop), maxScroll);
    }

    if (prefersReduced) {
      window.scrollTo(0, targetY);
      triggerArrivalHighlight(id);
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) {
      triggerArrivalHighlight(id);
      return;
    }

    const duration = Math.min(760, Math.max(460, Math.abs(distance) * 0.55));
    const startTime = performance.now();
    isProgrammaticScrollRef.current = true;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 3.5);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutQuart(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        isProgrammaticScrollRef.current = false;
        triggerArrivalHighlight(id);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const navItems = [
    { id: 'top', href: '#top', label: nav.home, Icon: Home },
    { id: 'about', href: '#about', label: nav.about, Icon: User },
    { id: 'skills', href: '#skills', label: nav.skills, Icon: Settings },
    { id: 'projects', href: '#projects', label: nav.projects, Icon: FolderKanban },
    { id: 'experience', href: '#experience', label: nav.experience, Icon: Briefcase },
    { id: 'education', href: '#education', label: nav.education, Icon: GraduationCap },
    { id: 'contact', href: '#contact', label: nav.contact, Icon: Mail },
  ];

  const selectedProject: ProjectItem | null =
    selectedProjectId ? projects.find((p) => p.id === selectedProjectId) ?? null : null;

  const selectedSkill: CompetencyCard | null =
    selectedSkillId ? competencies.find((c) => c.id === selectedSkillId) ?? null : null;

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2200);
    } catch {
      setCopiedField(null);
    }
  };

  const handleContactProject = (projectTitle: string) => {
    setContactSubject(
      lang === 'vi'
        ? `Trao đổi dự án: ${projectTitle}`
        : `Project Inquiry: ${projectTitle}`
    );
    setIsContactOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F3F6FA] text-[#0F172A] flex flex-col">
        {/* Top Navigation Bar matching mockup */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/90">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
            {/* Left Zone: HT Monogram + Name + Title */}
            <a
              href="#top"
              onClick={(e) => scrollToSection('top', e)}
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-md"
            >
              <HTMonogram variant="light" />
              <div className="leading-tight">
                <div className="font-display text-sm sm:text-[15px] font-bold tracking-tight text-[#0A2259] whitespace-nowrap">
                  {profile.brandName}
                </div>
                <div className="text-[11px] font-semibold text-[#1D4ED8] whitespace-nowrap">
                  IT Supervisor
                </div>
              </div>
            </a>

            {/* Center Zone: Desktop Navigation Items (single active language) */}
            <nav
              aria-label={lang === 'vi' ? 'Điều hướng chính' : 'Primary navigation'}
              className="hidden xl:flex items-center gap-1.5"
            >
              {navItems.map(({ id, href, label, Icon }) => {
                const isActive = activeNav === id;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => scrollToSection(id, e)}
                    className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-left transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 bg-[#0B469B] rounded-xl shadow-sm -z-10"
                      />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-[#0B469B]'
                      }`}
                      strokeWidth={2}
                    />
                    <span className="text-[13px] font-semibold leading-none">{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Zone: VI | EN Language Switcher + Mobile Menu Button */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSwitcher lang={lang} onChange={setLang} compact />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={
                  mobileMenuOpen
                    ? lang === 'vi'
                      ? 'Đóng menu'
                      : 'Close menu'
                    : lang === 'vi'
                      ? 'Mở menu'
                      : 'Open menu'
                }
                className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Nav Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden border-t border-zinc-200 bg-white px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navItems.map(({ id, href, label, Icon }) => {
                const isActive = activeNav === id;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => scrollToSection(id, e)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold min-h-[44px] transition-colors ${
                      isActive
                        ? 'bg-[#0B469B] text-white'
                        : 'text-zinc-700 bg-zinc-50 hover:bg-zinc-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Reading Scroll Progress Indicator */}
          <motion.div
            style={{ scaleX: scrollProgressScale }}
            aria-hidden="true"
            className="h-[2.5px] bg-gradient-to-r from-[#0B469B] via-[#2563EB] to-[#22D3EE] origin-left"
          />
        </header>

        <main id="top" className="flex-1">
          {/* HERO BANNER — Deep Navy / Tech Network Canvas */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#041230] via-[#0A2B66] to-[#08204E] text-white">
            {/* Architectural SVG Server & Global Network Backdrop with Scroll Parallax */}
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 1440 520"
              preserveAspectRatio="xMidYMid slice"
              style={{ y: heroBackdropY, opacity: heroBackdropOpacity }}
              className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
            >
              <defs>
                <radialGradient id="globe-glow" cx="55%" cy="55%" r="38%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#041230" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1440" height="520" fill="url(#globe-glow)" />
              {/* Left & Right Server Rack Silhouettes */}
              <g stroke="#38BDF8" strokeOpacity="0.25" fill="#041538" fillOpacity="0.65">
                <rect x="20" y="30" width="84" height="460" rx="4" />
                <rect x="116" y="55" width="70" height="410" rx="4" />
                <rect x="1250" y="50" width="74" height="420" rx="4" />
                <rect x="1336" y="25" width="88" height="470" rx="4" />
              </g>
              {/* Wireframe Digital Globe */}
              <g transform="translate(650, 290)" stroke="#7DD3FC" fill="none" opacity="0.45">
                <circle r="190" strokeWidth="1.2" />
                <ellipse rx="190" ry="68" strokeWidth="1" />
                <ellipse rx="190" ry="130" strokeWidth="0.9" />
                <ellipse rx="72" ry="190" strokeWidth="1" />
                <ellipse rx="138" ry="190" strokeWidth="0.9" />
                <circle cx="-110" cy="-70" r="3" fill="#38BDF8" />
                <circle cx="85" cy="-95" r="3.5" fill="#38BDF8" />
                <circle cx="-40" cy="40" r="3" fill="#BAE6FD" />
                <circle cx="120" cy="30" r="2.5" fill="#38BDF8" />
              </g>
              {/* Subtle Circuit Lines */}
              <path
                d="M0 440 H360 L410 390 H590 M980 120 H1160 L1210 170 H1440"
                stroke="#38BDF8"
                strokeOpacity="0.3"
                strokeWidth="1.2"
                fill="none"
              />
            </motion.svg>

            <div className="relative z-10 max-w-[1340px] mx-auto px-6 lg:px-10 pt-10 pb-20 md:pt-14 md:pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Hero Typography & Actions */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3 text-[#22D3EE] text-lg sm:text-xl font-medium">
                    <span>{hero.greeting}</span>
                    <span className="inline-flex items-center" aria-hidden="true">
                      <span className="w-10 h-[1.5px] bg-[#22D3EE]/80" />
                      <ArrowRight className="w-4 h-4 -ml-1" />
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                      {hero.introPrefix}
                    </h1>
                    <div className="font-display text-2xl sm:text-4xl font-extrabold tracking-wide text-[#22D3EE]">
                      {hero.roleTitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-blue-100/95">
                    {hero.pillars.map((pillar, idx) => (
                      <span key={pillar} className="inline-flex items-center gap-3">
                        <span>{pillar}</span>
                        {idx < hero.pillars.length - 1 && (
                          <span className="text-blue-300/60" aria-hidden="true">
                            |
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm sm:text-[15px] italic text-blue-100/90 leading-relaxed max-w-[56ch]">
                    {hero.lead}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsPdfOpen(true)}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-white bg-[#1D63DC] hover:bg-[#2563EB] rounded-full shadow-lg shadow-blue-950/40 transition-colors min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Download className="w-4 h-4" />
                      <span>{hero.downloadCv}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setContactSubject('');
                        setIsContactOpen(true);
                      }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/35 rounded-full backdrop-blur-xs transition-colors min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{hero.contactMe}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Hero Portrait + Technology Quote */}
                <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6">
                  <div className="w-[215px] sm:w-[235px] rounded-2xl overflow-hidden border border-white/25 bg-white/10 p-1.5 backdrop-blur-sm shadow-2xl shrink-0">
                    <ResilientImage
                      src={profile.portraitImage}
                      alt={`${profile.fullName} — IT Supervisor`}
                      fallbackTitle={profile.fullName}
                      imgClassName="object-top"
                      className="w-full aspect-[7/10] rounded-xl"
                    />
                  </div>

                  <div className="text-center sm:text-left space-y-1 max-w-[180px]">
                    <div className="font-serif italic text-xl sm:text-2xl text-white leading-snug">
                      <span className="text-[#22D3EE] mr-1">“</span>
                      {hero.quoteTop}
                      <span className="block">{hero.quoteBottom}</span>
                    </div>
                    <div className="h-[2px] w-28 mx-auto sm:mx-0 bg-gradient-to-r from-[#22D3EE] to-transparent rounded-full mt-2" />
                  </div>
                </div>
              </div>

              {/* Quick Scroll-Down Indicator into Content */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <a
                  href="#about"
                  onClick={(e) => scrollToSection('about', e)}
                  aria-label={lang === 'vi' ? 'Cuộn xuống nội dung chính' : 'Scroll to main content'}
                  className="inline-flex items-center gap-2 text-xs font-medium text-blue-200/90 hover:text-white transition-colors py-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15"
                >
                  <span>{lang === 'vi' ? 'Khám phá hồ sơ' : 'Explore profile'}</span>
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-[#22D3EE]" />
                  </motion.span>
                </a>
              </div>
            </div>
          </section>

          {/* FLOATING 6-COLUMN HIGHLIGHT STRIP */}
          <section
            aria-label="Điểm nhấn chuyên môn"
            className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 -mt-10 relative z-20"
          >
            <motion.div
              style={{ y: highlightStripY }}
              className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-zinc-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 lg:divide-x divide-zinc-200/80 will-change-transform"
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.34,
                    delay: idx * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="px-4 py-4 flex items-center gap-3 justify-start lg:justify-center"
                >
                  <HighlightIcon type={item.iconType} />
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-zinc-950 leading-tight truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-zinc-600 leading-snug truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* MAIN CONTENT CONTAINER */}
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10">
            {/* ROW 1: 3-Column Bento Dashboard (About Me | Core Skills | Featured Projects) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Column 1: Về tôi | About Me */}
              <motion.section
                id="about"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'about' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-3 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'about'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                    <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                    <span>{about.headingVi}</span>
                    <span className="text-zinc-300 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">{about.headingEn}</span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'about'} />
                </div>

                <p className="text-[13.5px] text-zinc-700 leading-relaxed">{about.summary}</p>

                <ul className="space-y-2 pt-1">
                  {about.values.map((val, idx) => (
                    <motion.li
                      key={val}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: 0.06 + idx * 0.055, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-2.5 text-[13px] font-medium text-zinc-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                      <span>{val}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCvOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1D4ED8] bg-white hover:bg-blue-50 border border-[#1D4ED8]/40 rounded-full transition-colors min-h-[38px]"
                  >
                    <span>{about.moreBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.section>

              {/* Column 2: Năng lực chuyên môn | Core Skills */}
              <motion.section
                id="skills"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'skills' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-4 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'skills'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                    <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                    <span>{skillsSection.headingVi}</span>
                    <span className="text-zinc-300 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">
                      {skillsSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'skills'} />
                </div>

                <div className="bg-white rounded-2xl border border-zinc-200/90 p-3.5 shadow-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {competencies.map((comp, idx) => {
                      const theme = SKILL_THEME_CLASSES[comp.theme];
                      return (
                        <motion.button
                          key={comp.id}
                          type="button"
                          onClick={() => setSelectedSkillId(comp.id)}
                          initial={{ opacity: 0, scale: 0.93, y: 12 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            duration: 0.32,
                            delay: idx * 0.045,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`group text-center rounded-xl border p-3.5 flex flex-col items-center justify-center gap-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${theme.card}`}
                        >
                          <span
                            className={`inline-flex items-center justify-center w-9 h-9 rounded-full shadow-xs transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}
                          >
                            {renderSkillTileIcon(comp.iconKey)}
                          </span>
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-zinc-900 leading-snug">
                              {comp.title}
                            </div>
                            <div className="text-[10.5px] text-zinc-600 leading-tight">
                              {comp.shortSubtitle}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-zinc-500 text-center pt-2.5">
                    {skillsSection.clickHint}
                  </p>
                </div>
              </motion.section>

              {/* Column 3: Dự án tiêu biểu | Featured Projects */}
              <motion.section
                id="projects"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'projects' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-5 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'projects'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                      <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                      <span>{projectsSection.headingVi}</span>
                      <span className="text-zinc-300 font-normal">|</span>
                      <span className="text-sm font-semibold text-[#1D4ED8]">
                        {projectsSection.headingEn}
                      </span>
                    </h2>

                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(projects[0].id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0"
                    >
                      <span>{projectsSection.viewAll}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <SectionArrivalBar active={highlightedSection === 'projects'} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projects.map((proj, idx) => {
                    const isWideCard =
                      projects.length % 2 === 1 && idx === projects.length - 1;
                    return (
                      <motion.article
                        key={proj.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.35,
                          delay: idx * 0.065,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs flex flex-col justify-between transition-all hover:border-zinc-300 hover:shadow-md ${
                          isWideCard ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedProjectId(proj.id)}
                          className={`text-left flex flex-col flex-1 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                            isWideCard ? 'sm:flex-row sm:items-stretch' : ''
                          }`}
                        >
                          <div
                            className={`w-full aspect-[16/9] overflow-hidden bg-zinc-900 shrink-0 ${
                              isWideCard ? 'sm:w-[46%] sm:aspect-[16/10]' : ''
                            }`}
                          >
                            <ProjectCardArtwork visualType={proj.visualType} />
                          </div>

                          <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                            <div className="space-y-1">
                              <h3 className="text-[13px] font-bold text-zinc-950 leading-snug line-clamp-2">
                                {proj.shortTitle}
                              </h3>
                              <p className="text-[11px] text-zinc-500">{proj.subtitle}</p>
                            </div>

                            <span
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#1D4ED8] border border-[#1D4ED8]/40 rounded-full hover:bg-blue-50 transition-colors ${
                                isWideCard ? 'sm:w-auto sm:self-start sm:px-4 w-full' : 'w-full'
                              }`}
                            >
                              <span>{projectsSection.viewDetails}</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            {/* ROW 2: Bottom 3-Column Row (Work Experience | Education | Contact + QR) */}
            <div className="pt-8 border-t border-zinc-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Col 1: Kinh nghiệm làm việc | Work Experience */}
              <motion.section
                id="experience"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'experience' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-5 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'experience'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                    <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                    <span>{experienceSection.headingVi}</span>
                    <span className="text-zinc-300 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">
                      {experienceSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'experience'} />
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 pt-0.5 space-y-0.5 min-w-[84px]">
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="w-2.5 h-2.5 rounded-full border-2 border-[#1D4ED8] bg-white inline-block"
                      />
                      <span className="text-xs font-bold text-[#1D4ED8] font-mono tabular-nums">
                        {experiences[0].period}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500 pl-4">
                      {experiences[0].duration}
                    </div>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    <h3 className="text-sm font-bold text-zinc-950 leading-snug">
                      {experiences[0].organization}
                    </h3>
                    <ul className="space-y-1.5">
                      {experiences[0].highlights.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.28,
                            delay: 0.05 + idx * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="text-xs text-zinc-700 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#1D4ED8]"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsCvOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#1D4ED8] bg-white hover:bg-blue-50 border border-[#1D4ED8]/40 rounded-full transition-colors"
                      >
                        <span>{experienceSection.viewDetails}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Col 2: Trình độ học vấn | Education */}
              <motion.section
                id="education"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'education' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-3 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'education'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                    <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                    <span>{educationSection.headingVi}</span>
                    <span className="text-zinc-300 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">
                      {educationSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'education'} />
                </div>

                <div className="flex items-start gap-3.5">
                  <motion.div
                    initial={{ scale: 0.85, rotate: -6, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0"
                  >
                    <Award className="w-6 h-6 text-[#D97706]" strokeWidth={1.8} />
                  </motion.div>
                  <div className="space-y-1.5">
                    <div className="text-sm font-bold text-zinc-950 leading-snug">
                      {educationSection.degree}
                    </div>
                    <div className="text-xs font-semibold text-zinc-800">
                      {educationSection.school}
                    </div>
                    <ul className="space-y-1 pt-1">
                      {educationSection.details.map((detail, idx) => (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.28,
                            delay: 0.1 + idx * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="text-xs text-zinc-600 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-zinc-400"
                        >
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Col 3: Thông tin liên hệ | Contact + QR */}
              <motion.section
                id="contact"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'contact' ? { scale: [1, 1.014, 1] } : { scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`lg:col-span-4 space-y-4 rounded-2xl p-3 -m-3 transition-all duration-500 ${
                  highlightedSection === 'contact'
                    ? 'ring-2 ring-[#2563EB]/60 bg-blue-50/85 shadow-md shadow-blue-900/10'
                    : ''
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950">
                    <span className="inline-block w-1 h-4 bg-[#1D4ED8] rounded-full self-center" aria-hidden="true" />
                    <span>{contactSection.headingVi}</span>
                    <span className="text-zinc-300 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8]">
                      {contactSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'contact'} />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2.5 text-xs text-zinc-700 min-w-0">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                      <span>
                        {contactSection.phoneLabel}{' '}
                        <a
                          href={`tel:${profile.phone}`}
                          className="font-semibold text-zinc-950 font-mono tabular-nums hover:text-[#1D4ED8]"
                        >
                          {profile.phoneDisplay}
                        </a>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(profile.phone, 'phone')}
                        aria-label="Copy phone"
                        className="text-zinc-400 hover:text-[#1D4ED8] p-1"
                      >
                        {copiedField === 'phone' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                      <span className="truncate">
                        {contactSection.emailLabel}{' '}
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-semibold text-zinc-950 hover:text-[#1D4ED8]"
                        >
                          {profile.email}
                        </a>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(profile.email, 'email')}
                        aria-label="Copy email"
                        className="text-zinc-400 hover:text-[#1D4ED8] p-1 shrink-0"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                      <span>
                        {contactSection.addressLabel}{' '}
                        <strong className="font-semibold text-zinc-950">
                          {contactSection.addressValue}
                        </strong>
                      </span>
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubject('');
                          setIsContactOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B469B] hover:bg-[#1D4ED8] rounded-full transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>{contactSection.sendMsgBtn}</span>
                      </button>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1.5 shrink-0"
                  >
                    <QrCodeGraphic />
                    <span className="text-[10.5px] font-medium text-zinc-600 text-center max-w-[84px] leading-tight">
                      {contactSection.qrCaption}
                    </span>
                  </motion.div>
                </div>
              </motion.section>
            </div>
          </div>
        </main>

        {/* DARK NAVY FOOTER */}
        <footer className="bg-[#06183A] text-white border-t border-blue-950">
          <div className="max-w-[1340px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3 shrink-0">
              <HTMonogram variant="dark" />
              <div className="leading-tight">
                <div className="font-display text-sm font-bold tracking-tight text-white">
                  {profile.brandName}
                </div>
                <div className="text-[11px] text-blue-200">IT Supervisor</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm italic text-blue-100/90 text-center">
              {footer.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsCvOpen(true)}
                  aria-label="View CV"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="text-[11px] text-blue-200/80 whitespace-nowrap">
                {footer.copyright}
              </span>
            </div>
          </div>
        </footer>

        {/* Floating Quick Scroll-to-Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={() => scrollToSection('top')}
              aria-label={lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
              title={lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0B469B] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-950/25 border border-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <ArrowUp className="w-5 h-5" strokeWidth={2.2} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          lang={lang}
          copy={content.projectModal}
          onClose={() => setSelectedProjectId(null)}
          onContactProject={handleContactProject}
        />
        <SkillModal
          skill={selectedSkill}
          lang={lang}
          onClose={() => setSelectedSkillId(null)}
        />
        <CvModal
          isOpen={isCvOpen}
          content={content}
          onClose={() => setIsCvOpen(false)}
          onOpenPdf={() => setIsPdfOpen(true)}
        />
        <PdfViewerModal
          isOpen={isPdfOpen}
          pdfUrl={profile.cvPdfUrl}
          lang={lang}
          onClose={() => setIsPdfOpen(false)}
        />
        <ContactModal
          isOpen={isContactOpen}
          initialSubject={contactSubject}
          copy={content.contactModal}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
