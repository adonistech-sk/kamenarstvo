import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Hammer, PenTool, HardHat, ShieldCheck, ArrowRight, MessageSquare, Loader2, Check, AlertCircle } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fotkaSrcSet = (base: string) =>
  `/fotky/${base}-640.webp 640w, /fotky/${base}-1280.webp 1280w, /fotky/${base}-1920.webp 1920w`;

const localFotkaSrcSet = (img: string): string | undefined => {
  const match = img.match(/^\/fotky\/(.+)-1280\.webp$/);
  return match ? fotkaSrcSet(match[1]) : undefined;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'O nás', href: '#o-nas' },
    { name: 'Služby', href: '#sluzby' },
    { name: 'Galéria', href: '#galeria' },
    { name: 'Proces', href: '#proces' },
    { name: 'Kontakt', href: '#kontakt' }
  ];

  const containerClasses = scrolled
    ? `max-w-6xl mx-auto rounded-[32px] bg-brand-bg/55 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:rounded-full ${
        isOpen
          ? 'pl-6 pr-3 pt-2 pb-4 md:pl-8 md:py-2 md:pb-2'
          : 'pl-6 md:pl-8 pr-3 py-2'
      }`
    : isOpen
      ? 'max-w-7xl mx-auto rounded-[32px] bg-brand-bg/70 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] px-5 pt-2 pb-4 md:rounded-none md:bg-transparent md:backdrop-blur-none md:shadow-none md:px-12 md:py-0 md:pt-0 md:pb-0'
      : 'max-w-7xl mx-auto rounded-[32px] px-6 md:px-12 md:rounded-none';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-transparent py-3 md:py-4 px-3 md:px-6' : 'bg-transparent py-2'}`}>
      <div className={`transition-all duration-500 ${containerClasses}`}>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src="/fotky/logo-400.webp"
              srcSet="/fotky/logo-200.webp 200w, /fotky/logo-400.webp 400w"
              sizes="200px"
              alt="Kameň & Dielo"
              fetchPriority="high"
              decoding="async"
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-12 md:h-14' : 'h-20 md:h-28'}`}
            />
          </a>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'gap-6' : 'gap-10'}`}>
            <ul className={`flex items-center transition-all duration-500 ${scrolled ? 'gap-6' : 'gap-8'}`}>
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[13px] uppercase tracking-[1.5px] text-brand-text/90 hover:text-brand-gold transition-colors font-medium">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className={`relative inline-flex items-center justify-center rounded-full uppercase tracking-[2px] text-brand-gold font-medium bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ${scrolled ? 'px-5 py-[10px] text-[12px]' : 'px-[28px] py-[14px] text-[13px]'}`}
            >
              <span className="relative z-10">Cenová ponuka</span>
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/15 via-transparent to-transparent opacity-60"></span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Zavrieť menu' : 'Otvoriť menu'} className="md:hidden w-11 h-11 flex items-center justify-center text-brand-muted">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav — integrated into pill */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-3 pt-4 border-t border-brand-border/40' : 'max-h-0'}`}>
          <ul className="flex flex-col items-center gap-5 pb-1">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsOpen(false)} className="text-[14px] uppercase tracking-[2px] font-sans text-brand-muted hover:text-brand-gold transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen pt-20 overflow-hidden bg-brand-bg">
      {/* pozadie — fotka */}
      <img
        src="/fotky/hero-kamen-1920.webp"
        srcSet="/fotky/hero-kamen-640.webp 640w, /fotky/hero-kamen-1280.webp 1280w, /fotky/hero-kamen-1920.webp 1920w, /fotky/hero-kamen-2560.webp 2560w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden
      />
      {/* tmavý overlay pre čitateľnosť textu */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/90 via-brand-bg/65 to-brand-bg/25 z-0" aria-hidden />
      <div className="absolute inset-0 bg-brand-bg/15 z-0" aria-hidden />

      {/* obsah */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-[calc(100vh-80px)] flex items-center py-16 md:py-20">
        {/* text column */}
        <div className="max-w-3xl">
          {/* eyebrow */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-10 h-[1px] bg-brand-gold"></span>
            <span className="text-brand-gold tracking-[3px] uppercase text-[11px] font-sans">
              Kamenárske remeslo
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-[34px] sm:text-[42px] md:text-[56px] lg:text-[72px] xl:text-[84px] text-brand-text leading-[1.05] mb-8"
          >
            Pretvárame <span className="italic text-brand-gold">kameň</span> <br className="hidden md:block"/> na večnosť.
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-[440px] text-brand-muted text-[15px] leading-[1.7] mb-12"
          >
            Spojenie hlbokej úcty, poctivej ručnej práce a nadčasovej elegancie v každom detaile. Tvoríme dôstojné pamätníky a kamenné diela trvalej hodnoty.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#sluzby"
              className="group inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-bg px-8 py-[14px] rounded-full uppercase tracking-[2px] text-[12px] font-bold hover:bg-brand-gold-dark transition-colors"
            >
              Naše Služby
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-8 py-[14px] border border-brand-border text-brand-muted uppercase tracking-[2px] text-[12px] rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              Kontaktujte Nás
            </a>
          </m.div>

          {/* meta riadok */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center gap-4 md:gap-6 mt-14 text-[10px] uppercase tracking-[2.5px] text-brand-muted"
          >
            <span className="w-12 h-[1px] bg-brand-gold/40"></span>
            <span>Veľký Kýr · Slovensko</span>
          </m.div>
        </div>
      </div>

      {/* spodný gradient pre prechod do O nás */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

const About = () => {
  const stats = [
    { value: '20+',  label: 'Rokov tradície' },
    { value: '500+', label: 'Dokončených diel' },
    { value: '100%', label: 'Ručná práca' },
  ];

  return (
    <section id="o-nas" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* vodoznak */}
      <div
        className="hidden md:block absolute -left-16 bottom-10 text-[14rem] lg:text-[16rem] font-serif text-brand-gold/[0.035] select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden
      >
        DEDIČSTVO
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Text column */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-[10px] mb-[20px]">
            <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">O Nás</span>
            <div className="h-[1px] flex-grow bg-brand-border"></div>
            <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-muted">Rodinná dielňa</span>
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[56px] text-brand-text mb-8 leading-[1.1]">
            Majstrovstvo ukryté <br className="hidden md:block"/> v <span className="italic text-brand-gold">detaile</span>.
          </h2>

          <p className="text-brand-text text-[15px] md:text-[16px] leading-[1.7] mb-6">
            Sme rodinné kamenárstvo, ktoré už viac ako dve desaťročia vdychuje život prírodnému kameňu.
          </p>
          <div className="space-y-5 text-brand-muted text-[14px] leading-[1.7]">
            <p>
              Zameriavame sa na vytváranie dôstojných pamätníkov a elegantnej interiérovej architektúry. Každý projekt vnímame s najvyšším rešpektom.
            </p>
            <p>
              Či už ide o pietne miesta, ktoré majú pretrvať generácie, alebo prémiové kamenné prvky pre moderné domácnosti — pracujeme výhradne s najkvalitnejšími materiálmi z celého sveta.
            </p>
          </div>

          {/* stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-brand-border mt-12 border border-brand-border rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-brand-bg p-5 md:p-6 flex flex-col gap-2">
                <span className="font-serif text-[28px] md:text-[34px] text-brand-gold leading-none tabular-nums">{s.value}</span>
                <span className="text-[10px] uppercase tracking-[2px] text-brand-muted leading-tight">{s.label}</span>
              </div>
            ))}
          </div>

          <a
            href="#kontakt"
            className="group inline-flex items-center gap-4 mt-10 text-brand-gold hover:text-brand-gold-dark transition-colors uppercase tracking-[2px] text-[12px]"
          >
            <span className="w-10 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-16"></span>
            Dohodnúť stretnutie
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </m.div>

        {/* Image column */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[380px] md:h-[440px] lg:h-[480px] lg:mt-24"
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <img
              src="/fotky/about-1280.webp"
              srcSet="/fotky/about-640.webp 640w, /fotky/about-1280.webp 1280w, /fotky/about-1920.webp 1920w"
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Kamenárska práca"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[900ms] hover:scale-[1.03]"
            />
            {/* jemný gradient v rohoch pre hĺbku */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg/40 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* dekoratívny rámček v pozadí */}
          <div className="absolute inset-0 border border-brand-gold/25 rounded-2xl translate-x-5 -translate-y-5 -z-10"></div>

          {/* zlatý ornament vpravo hore */}
          <div className="absolute top-5 right-5 flex items-center gap-3 px-4 py-2 rounded-full bg-brand-bg/70 backdrop-blur-sm">
            <span className="font-sans text-[10px] uppercase tracking-[2px] text-brand-gold/80">Rodinné</span>
            <span className="w-1 h-1 rounded-full bg-brand-gold/50"></span>
            <span className="font-serif text-[14px] text-brand-gold leading-none italic">remeslo</span>
          </div>

        </m.div>
      </div>
    </section>
  );
};

type GalleryId = 'doplnky' | 'jednohroby' | 'dvojhroby' | 'urny' | 'bytovaarchitektura' | 'krypty';

const galleryData: Record<GalleryId, {
  photos: string[];
  eyebrow: string;
  titlePlain: string;
  titleItalic: string;
  subtitle: string;
}> = {
  doplnky: {
    photos: ['doplnky-01', 'doplnky-02', 'doplnky-03', 'doplnky-04', 'doplnky-05', 'doplnky-06'],
    eyebrow: 'VI · Galéria',
    titleItalic: 'Doplnky',
    titlePlain: ' a kamenné detaily',
    subtitle: 'Výber z našej dielne — vázy, lampáše, písmo a ručne opracované prvky, ktoré dotvárajú finálnu podobu každého diela.',
  },
  jednohroby: {
    photos: ['jednohroby-01', 'jednohroby-02', 'jednohroby-03', 'jednohroby-04'],
    eyebrow: 'I · Galéria',
    titleItalic: 'Jednohroby',
    titlePlain: ' — realizácie',
    subtitle: 'Kompletné riešenia pre jednotlivé hrobové miesta — obklad, pomník aj doplnky vyladené do harmonického celku.',
  },
  dvojhroby: {
    photos: ['dvojhroby-01', 'dvojhroby-02', 'dvojhroby-03', 'dvojhroby-04'],
    eyebrow: 'II · Galéria',
    titleItalic: 'Dvojhroby',
    titlePlain: ' — realizácie',
    subtitle: 'Monumentálne rodinné hrobky s nadčasovým dizajnom, dôrazom na stabilitu a architektonickú čistotu.',
  },
  urny: {
    photos: ['urny-01', 'urny-02', 'urny-03'],
    eyebrow: 'III · Galéria',
    titleItalic: 'Urny',
    titlePlain: ' — realizácie',
    subtitle: 'Dôstojné urnové miesta a kolumbáriové prvky z kvalitnej žuly pre pietne uloženie spomienky.',
  },
  bytovaarchitektura: {
    photos: ['bytovaarchitektura-01', 'bytovaarchitektura-02', 'bytovaarchitektura-03', 'bytovaarchitektura-04', 'bytovaarchitektura-05'],
    eyebrow: 'IV · Galéria',
    titleItalic: 'Bytová architektúra',
    titlePlain: ' — realizácie',
    subtitle: 'Kuchynské dosky, kúpeľňové obklady, parapety, krby, schody a kamenné detaily do moderných aj tradičných interiérov.',
  },
  krypty: {
    photos: ['krypty-01', 'krypty-02', 'krypty-03', 'krypty-04'],
    eyebrow: 'V · Galéria',
    titleItalic: 'Krypty',
    titlePlain: ' — realizácie',
    subtitle: 'Trvácne podzemné i nadzemné krypty zhotovené s najvyššou úctou k tradícii a presnosťou remesla.',
  },
};

const Services = () => {
  const [openGallery, setOpenGallery] = useState<GalleryId | null>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const activePhotos = openGallery ? galleryData[openGallery].photos : [];
  const activeMeta = openGallery ? galleryData[openGallery] : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (activePhoto !== null) setActivePhoto(null);
      else if (openGallery) setOpenGallery(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openGallery, activePhoto]);

  const services = [
    {
      no: 'I',
      title: 'Jednohroby',
      desc: 'Komplexné riešenia pre jednotlivé hrobové miesta — obklad, pomník aj doplnky vyladené do harmonického celku.',
      img: '/fotky/jednohroby-01-1280.webp'
    },
    {
      no: 'II',
      title: 'Dvojhroby',
      desc: 'Monumentálne rodinné hrobky s nadčasovým dizajnom, dôrazom na stabilitu a architektonickú čistotu.',
      img: '/fotky/dvojhroby-01-1280.webp'
    },
    {
      no: 'III',
      title: 'Urny',
      desc: 'Dôstojné urnové miesta a kolumbáriové prvky z kvalitnej žuly pre pietne uloženie spomienky.',
      img: '/fotky/urny-01-1280.webp'
    },
    {
      no: 'IV',
      title: 'Bytová Architektúra',
      desc: 'Luxusné kuchynské dosky, kúpeľňové obklady, parapety a krby z naturálneho i technického kameňa.',
      img: '/fotky/service-bytova-1280.webp'
    },
    {
      no: 'V',
      title: 'Krypty',
      desc: 'Trvácne podzemné i nadzemné krypty zhotovené s najvyššou úctou k tradícii a presnosťou remesla.',
      img: '/fotky/krypty-01-1280.webp'
    },
    {
      no: 'VI',
      title: 'Doplnky',
      desc: 'Vázy, lampáše, písmo, ozdobné prvky a kamenné detaily dopĺňajúce každý pomník do finálnej podoby.',
      img: '/fotky/service-doplnky-1280.webp'
    }
  ];

  return (
    <section id="sluzby" className="py-24 md:py-32 bg-brand-bg border-y border-brand-border relative overflow-hidden">
      {/* dekoratívny nápis v pozadí */}
      <div
        className="hidden md:block absolute -left-20 top-16 text-[16rem] font-serif text-brand-gold/[0.035] select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden
      >
        KATALÓG
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-[10px] mb-[20px]">
              <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">Naša Ponuka</span>
              <div className="h-[1px] flex-grow bg-brand-border"></div>
            </div>
            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[56px] text-brand-text leading-[1.1]">
              Komplexné kamenárske <span className="italic text-brand-gold">služby</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 md:pb-3">
            <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-muted">Šesť oblastí</span>
            <span className="font-serif text-[32px] text-brand-gold leading-none">VI</span>
          </div>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
        >
          {services.map((service) => {
            const galleryId: GalleryId | null =
              service.title === 'Doplnky' ? 'doplnky'
              : service.title === 'Jednohroby' ? 'jednohroby'
              : service.title === 'Dvojhroby' ? 'dvojhroby'
              : service.title === 'Urny' ? 'urny'
              : service.title === 'Bytová Architektúra' ? 'bytovaarchitektura'
              : service.title === 'Krypty' ? 'krypty'
              : null;
            const cardClasses = "group relative flex flex-col bg-brand-surface border border-brand-border hover:border-brand-gold/60 rounded-2xl overflow-hidden transition-colors duration-300";

            const cardInner = (
              <>
                {/* obrázok */}
                <div className="relative h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden">
                  <img
                    src={service.img}
                    srcSet={localFotkaSrcSet(service.img)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                    referrerPolicy="no-referrer"
                  />
                  {/* jemný gradient iba v spodnej časti pre prechod ku karte */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-surface to-transparent pointer-events-none"></div>

                  {/* rímske číslo ako plomba */}
                  <div className="absolute top-4 right-5 flex items-center gap-2 px-3 py-1 rounded-full bg-brand-bg/70 backdrop-blur-sm">
                    <span className="font-sans text-[10px] uppercase tracking-[2px] text-brand-gold/80">No.</span>
                    <span className="font-serif text-[24px] text-brand-gold leading-none">
                      {service.no}
                    </span>
                  </div>
                </div>

                {/* text */}
                <div className="p-7 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-serif text-[22px] md:text-[24px] text-brand-text leading-tight group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-brand-gold my-4 transition-all duration-300 group-hover:w-16"></div>
                  <p className="text-[13px] text-brand-muted leading-[1.7] mb-6 flex-grow">
                    {service.desc}
                  </p>

                  <div className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[2px] text-brand-gold/70 group-hover:text-brand-gold transition-colors">
                    {galleryId ? 'Zobraziť galériu' : 'Mám záujem'}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </>
            );

            if (galleryId) {
              return (
                <m.button
                  key={service.no}
                  type="button"
                  onClick={() => setOpenGallery(galleryId)}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
                  className={`${cardClasses} text-left w-full cursor-pointer`}
                >
                  {cardInner}
                </m.button>
              );
            }

            return (
              <m.a
                key={service.no}
                href="#kontakt"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
                className={cardClasses}
              >
                {cardInner}
              </m.a>
            );
          })}
        </m.div>
      </div>

      <AnimatePresence>
        {openGallery && activeMeta && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenGallery(null)}
            className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <m.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-brand-surface border border-brand-border rounded-2xl p-6 md:p-10"
            >
              {/* header */}
              <div className="flex items-start justify-between gap-6 mb-8 md:mb-10">
                <div>
                  <div className="flex items-center gap-[10px] mb-3">
                    <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">{activeMeta.eyebrow}</span>
                    <div className="h-[1px] w-10 bg-brand-border"></div>
                  </div>
                  <h3 className="font-serif text-[32px] md:text-[44px] leading-[1.1] text-brand-text">
                    <span className="italic text-brand-gold">{activeMeta.titleItalic}</span>{activeMeta.titlePlain}
                  </h3>
                  <p className="mt-4 text-[13px] md:text-[14px] text-brand-muted max-w-xl leading-[1.7]">
                    {activeMeta.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenGallery(null)}
                  aria-label="Zavrieť galériu"
                  className="shrink-0 w-11 h-11 md:w-10 md:h-10 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activePhotos.map((base, i) => (
                  <button
                    key={base}
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    className="group relative rounded-xl overflow-hidden border border-brand-border hover:border-brand-gold/60 aspect-[4/3] bg-brand-bg transition-colors cursor-zoom-in"
                  >
                    <img
                      src={`/fotky/${base}-640.webp`}
                      srcSet={fotkaSrcSet(base)}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={`${activeMeta.titleItalic} ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={960}
                      className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
                    />
                  </button>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[110] bg-brand-bg/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActivePhoto(null); }}
              aria-label="Zavrieť fotku"
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors"
            >
              <X size={18} />
            </button>

            {activePhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhoto((prev) => prev === null ? 0 : (prev - 1 + activePhotos.length) % activePhotos.length);
                  }}
                  aria-label="Predchádzajúca fotka"
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors rotate-180"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhoto((prev) => prev === null ? 0 : (prev + 1) % activePhotos.length);
                  }}
                  aria-label="Ďalšia fotka"
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            <m.img
              key={activePhoto}
              src={`/fotky/${activePhotos[activePhoto]}-1920.webp`}
              alt={`${activeMeta?.titleItalic ?? ''} ${activePhoto + 1}`}
              decoding="async"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl border border-brand-border shadow-2xl"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[3px] text-brand-muted">
              <span className="text-brand-gold">{String(activePhoto + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(activePhotos.length).padStart(2, '0')}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Process = () => {
  const steps = [
    { no: 'I',   icon: MessageSquare, title: 'Konzultácia', desc: 'Detailné prediskutovanie vašich požiadaviek, predstáv a voľby materiálu na osobnom stretnutí.' },
    { no: 'II',  icon: PenTool,       title: 'Návrh',       desc: 'Vytvorenie presnej vizualizácie a nákresov s dôrazom na technickú realizovateľnosť a estetiku.' },
    { no: 'III', icon: Hammer,        title: 'Výroba',      desc: 'Starostlivé ošetrenie a opracovanie kameňa s použitím overených technológií i ručnej zručnosti.' },
    { no: 'IV',  icon: ShieldCheck,   title: 'Montáž',      desc: 'Bezpečná a precízna inštalácia zrealizovaného diela na určenom mieste s maximálnou čistotou.' },
  ];

  return (
    <section id="proces" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Decoratívny nápis v pozadí */}
      <div
        className="hidden md:block absolute -right-16 bottom-0 rotate-[-8deg] text-[18rem] font-serif text-brand-gold/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
        aria-hidden
      >
        TRADÍCIA
      </div>

      <div className="relative max-w-7xl mx-auto">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-[10px] mb-[20px]">
            <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">Proces Spolupráce</span>
            <div className="h-[1px] flex-grow bg-brand-border"></div>
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[56px] text-brand-text leading-[1.1]">Od návrhu po realizáciu</h2>
        </m.div>

        {/* prerušovaná spojovacia linka — len na desktope */}
        <div className="relative">
          <div
            className="hidden lg:block absolute top-[76px] left-[8%] right-[8%] h-[1px] -z-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(197,160,89,0.45) 50%, transparent 50%)',
              backgroundSize: '10px 1px',
              backgroundRepeat: 'repeat-x',
            }}
            aria-hidden
          ></div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <m.div
                  key={step.no}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
                  className="group relative bg-brand-surface/40 backdrop-blur-sm border border-brand-border hover:border-brand-gold/60 rounded-2xl p-8 md:p-10 flex flex-col border-l-2 border-l-transparent hover:border-l-brand-gold transition-all duration-300"
                >
                  {/* ikona v zlatom kruhu */}
                  <div className="relative z-10 w-14 h-14 mb-6 rounded-full border border-brand-gold/40 bg-brand-bg flex items-center justify-center group-hover:border-brand-gold group-hover:rotate-[6deg] transition-all duration-500">
                    <Icon size={22} strokeWidth={1.4} className="text-brand-gold" />
                  </div>

                  {/* rímske číslo */}
                  <div className="font-serif text-[56px] sm:text-[64px] md:text-[88px] leading-[0.85] text-brand-gold/90 mb-5">
                    {step.no}
                  </div>

                  {/* title */}
                  <h3 className="font-sans font-bold text-[13px] text-brand-text uppercase tracking-[2px]">
                    {step.title}
                  </h3>

                  {/* krátka zlatá čiarka */}
                  <div className="w-6 h-[2px] bg-brand-gold my-4"></div>

                  {/* popis */}
                  <p className="text-[13px] text-brand-muted leading-[1.7]">
                    {step.desc}
                  </p>
                </m.div>
              );
            })}
          </m.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    '1440-1',
    '1448',
    '10ef7f0e-9de7-4e55-95a6-0c617cbf6796-1-all-2481',
    '10ef7f0e-9de7-4e55-95a6-0c617cbf6796-1-all-3315',
    '10ef7f0e-9de7-4e55-95a6-0c617cbf6796-1-all-7573',
    '10ef7f0e-9de7-4e55-95a6-0c617cbf6796-1-all-7796',
  ];

  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, images.length - visibleCount);
  useEffect(() => {
    if (carouselIndex > maxIndex) setCarouselIndex(maxIndex);
  }, [maxIndex, carouselIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section id="galeria" className="py-24 md:py-32 bg-brand-bg border-y border-brand-border px-6 relative overflow-hidden">
      {/* vodoznak */}
      <div
        className="hidden md:block absolute -right-10 top-20 text-[14rem] font-serif text-brand-gold/[0.035] select-none pointer-events-none leading-none whitespace-nowrap rotate-[-4deg]"
        aria-hidden
      >
        ARCHÍV
      </div>

      <div className="relative max-w-7xl mx-auto">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-[10px] mb-[20px]">
              <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">Posledné Realizácie</span>
              <div className="h-[1px] flex-grow bg-brand-border"></div>
            </div>
            <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[56px] text-brand-text leading-[1.1] mb-5">
              Výber z našich <span className="italic text-brand-gold">realizácií</span>
            </h2>
            <p className="text-[14px] text-brand-muted leading-[1.7] max-w-xl">
              Náhliadnite do nášho portfólia — vybrané diela posledných dvoch rokov, kde sa prírodný kameň mení na umenie trvalej hodnoty.
            </p>
          </div>
          <div className="flex items-center gap-4 md:pb-3 shrink-0">
            <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-muted">Archív</span>
            <span className="font-serif text-[32px] text-brand-gold leading-none">VI</span>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)` }}
            >
              {images.map((base, i) => (
                <div
                  key={i}
                  className="shrink-0 px-[5px]"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    className="h-64 md:h-80 w-full overflow-hidden group relative border border-transparent hover:border-brand-gold/60 transition-all duration-300 cursor-zoom-in block rounded-2xl"
                  >
                    <img
                      src={`/fotky/${base}-640.webp`}
                      srcSet={fotkaSrcSet(base)}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      alt={`Realizácia ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute bottom-[10px] left-[10px] z-10 text-[8px] uppercase text-brand-muted tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Realizácia {String(i + 1).padStart(2, '0')}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="font-sans text-[11px] uppercase tracking-[3px] text-brand-muted">
              <span className="text-brand-gold">{String(Math.min(carouselIndex + visibleCount, images.length)).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(images.length).padStart(2, '0')}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCarouselIndex((i) => Math.max(0, i - 1))}
                disabled={carouselIndex === 0}
                aria-label="Predchádzajúca"
                className="w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-brand-border disabled:hover:text-brand-muted rotate-180"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setCarouselIndex((i) => Math.min(maxIndex, i + 1))}
                disabled={carouselIndex >= maxIndex}
                aria-label="Ďalšia"
                className="w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-brand-border disabled:hover:text-brand-muted"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </m.div>
      </div>

      <AnimatePresence>
        {activePhoto !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[110] bg-brand-bg/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActivePhoto(null); }}
              aria-label="Zavrieť fotku"
              className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors"
            >
              <X size={18} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhoto((prev) => prev === null ? 0 : (prev - 1 + images.length) % images.length);
                  }}
                  aria-label="Predchádzajúca fotka"
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors rotate-180"
                >
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhoto((prev) => prev === null ? 0 : (prev + 1) % images.length);
                  }}
                  aria-label="Ďalšia fotka"
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-brand-border hover:border-brand-gold/60 text-brand-muted hover:text-brand-gold rounded-full bg-brand-surface/70 backdrop-blur-sm transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            <m.img
              key={activePhoto}
              src={`/fotky/${images[activePhoto]}-1920.webp`}
              alt={`Realizácia ${activePhoto + 1}`}
              decoding="async"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl border border-brand-border shadow-2xl"
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[11px] uppercase tracking-[3px] text-brand-muted">
              <span className="text-brand-gold">{String(activePhoto + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(images.length).padStart(2, '0')}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorMsg('EmailJS nie je nakonfigurovaný. Skontrolujte .env.local');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Nepodarilo sa odoslať správu. Skúste znova.');
    }
  };

  return (
    <section id="kontakt" className="py-24 px-6 max-w-7xl mx-auto border-t border-brand-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Info Column */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-[10px] mb-[20px]">
             <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">Spojte sa s nami</span>
             <div className="h-[1px] flex-grow bg-brand-border"></div>
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[56px] text-brand-text mb-8 leading-[1.1]">Máte záujem <br/> o dielo z kameňa?</h2>
          <p className="text-[14px] text-brand-muted leading-[1.6] mb-12">
            Radi s vami prediskutujeme vaše požiadavky, bezplatne vypracujeme cenovú ponuku alebo poradíme s výberom najvhodnejších materiálov.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Phone className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <p className="text-brand-gold text-[11px] uppercase tracking-[2px] mb-1">Telefón</p>
                <p className="text-brand-text text-[14px]">+421 908 747 949</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <p className="text-brand-gold text-[11px] uppercase tracking-[2px] mb-1">E-mail</p>
                <p className="text-brand-text text-[14px]">barton.bv@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <p className="text-brand-gold text-[11px] uppercase tracking-[2px] mb-1">Adresa Prevádzky</p>
                <p className="text-brand-text text-[14px]">Novozámocká 95, 941 07 Veľký Kýr<br/>
                <span className="text-brand-muted text-[12px]">Po - Pia: 9:00 - 17:00<br/>So - Ne: zatvorené</span></p>
              </div>
            </div>
          </div>
        </m.div>

        {/* Form Column */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="bg-brand-bg md:bg-brand-surface p-0 md:p-[44px] border-none md:border border-brand-border rounded-none md:rounded-2xl relative overflow-hidden"
        >
          {/* dekoratívny roh */}
          <div className="hidden md:block absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand-gold/[0.03] pointer-events-none" aria-hidden></div>
          <span className="hidden md:block absolute top-6 right-8 font-serif text-brand-gold/20 text-[48px] leading-none pointer-events-none select-none" aria-hidden>⁕</span>

          <form ref={formRef} className="relative space-y-7" onSubmit={handleSubmit}>
            {/* header formulára */}
            <div className="flex items-center justify-between pb-5 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-brand-gold"></span>
                <span className="font-serif text-[11px] uppercase tracking-[3px] text-brand-gold">
                  Dopytový formulár
                </span>
              </div>
              <span className="font-serif text-[11px] text-brand-muted tracking-[2px] tabular-nums">
                Bezplatná ponuka
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block group">
                <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-[2.5px] text-brand-gold/80 mb-2">
                  Meno a priezvisko <span className="text-brand-gold">*</span>
                </span>
                <input
                  type="text"
                  name="from_name"
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-transparent border-0 border-b border-brand-border py-2 text-[16px] md:text-[14px] text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
                  placeholder="Ján Novák"
                />
              </label>
              <label className="block group">
                <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-[2.5px] text-brand-gold/80 mb-2">
                  Telefón <span className="text-brand-gold">*</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={status === 'sending'}
                  className="w-full bg-transparent border-0 border-b border-brand-border py-2 text-[16px] md:text-[14px] text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
                  placeholder="+421 ..."
                />
              </label>
            </div>

            <label className="block group">
              <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-[2.5px] text-brand-gold/80 mb-2">
                E-mail <span className="text-brand-gold">*</span>
              </span>
              <input
                type="email"
                name="from_email"
                required
                disabled={status === 'sending'}
                className="w-full bg-transparent border-0 border-b border-brand-border py-2 text-[16px] md:text-[14px] text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors disabled:opacity-50"
                placeholder="vas@email.sk"
              />
            </label>

            <label className="block group">
              <span className="block font-sans text-[10px] uppercase tracking-[2.5px] text-brand-gold/80 mb-2">
                Vaša správa
              </span>
              <textarea
                name="message"
                rows={4}
                disabled={status === 'sending'}
                className="w-full bg-transparent border-0 border-b border-brand-border py-2 text-[16px] md:text-[14px] text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-gold transition-colors resize-none disabled:opacity-50"
                placeholder="Rozmery, termín, materiál, poznámky..."
              ></textarea>
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
              <p className="text-[10px] uppercase tracking-[2px] text-brand-muted leading-[1.6] max-w-[220px]">
                Odoslaním súhlasíte so spracovaním osobných údajov.
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center gap-3 bg-brand-gold text-[#121212] px-8 py-[14px] uppercase tracking-[2px] text-[12px] font-bold rounded-full hover:bg-brand-gold-dark transition-colors border-none whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>Odosielam<Loader2 size={14} className="animate-spin" /></>
                ) : (
                  <>Odoslať dopyt<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <m.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 p-4 border border-brand-gold/40 bg-brand-gold/5 rounded-lg"
                >
                  <Check className="text-brand-gold shrink-0 mt-[2px]" size={18} />
                  <p className="text-[13px] text-brand-text leading-[1.5]">
                    Ďakujeme, vaša správa bola odoslaná. Ozveme sa vám čo najskôr.
                  </p>
                </m.div>
              )}
              {status === 'error' && (
                <m.div
                  key="error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-start gap-3 p-4 border border-red-500/40 bg-red-500/5 rounded-lg"
                >
                  <AlertCircle className="text-red-400 shrink-0 mt-[2px]" size={18} />
                  <p className="text-[13px] text-brand-text leading-[1.5]">
                    {errorMsg || 'Nepodarilo sa odoslať správu. Skúste to znova alebo zavolajte.'}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </form>
        </m.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-bg border-t border-brand-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <a href="#" className="inline-block mb-4">
            <img
              src="/fotky/logo-400.webp"
              srcSet="/fotky/logo-200.webp 200w, /fotky/logo-400.webp 400w"
              sizes="200px"
              alt="Kameň & Dielo"
              loading="lazy"
              decoding="async"
              className="h-20 w-auto object-contain"
            />
          </a>
          <p className="text-brand-muted text-[12px] leading-[1.6] max-w-sm">S úctou a precíznosťou tvoríme trvalé spomienky a moderné interiéry z prírodného kameňa už tri desaťročia.</p>
        </div>

        <div>
          <h4 className="text-brand-gold text-[11px] uppercase tracking-[3px] mb-6 font-serif">Rýchle Odkazy</h4>
          <ul className="space-y-3 font-sans text-[11px] tracking-[1.5px] uppercase">
            <li><a href="#o-nas" className="text-brand-muted hover:text-brand-gold transition-colors">O nás</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Služby</a></li>
            <li><a href="#galeria" className="text-brand-muted hover:text-brand-gold transition-colors">Galéria</a></li>
            <li><a href="#proces" className="text-brand-muted hover:text-brand-gold transition-colors">Proces</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-[11px] uppercase tracking-[3px] mb-6 font-serif">Služby</h4>
          <ul className="space-y-3 font-sans text-[11px] tracking-[1.5px] uppercase">
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Jednohroby</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Dvojhroby</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Urny</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Bytová architektúra</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Krypty</a></li>
            <li><a href="#sluzby" className="text-brand-muted hover:text-brand-gold transition-colors">Doplnky</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center text-brand-muted text-[10px] uppercase tracking-[2px]">
        <p>&copy; {new Date().getFullYear()} Kamenárstvo. Všetky práva vyhradené.</p>
        <p className="mt-4 md:mt-0">Navrhnuté s precíznosťou.</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-gold selection:text-brand-bg">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </LazyMotion>
  );
}
