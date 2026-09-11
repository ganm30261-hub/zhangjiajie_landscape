import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Compass,
  Clock,
  MapPinOff,
  Car,
  Users,
  Hotel,
  UtensilsCrossed,
  ShieldCheck,
  FileCheck,
  CreditCard,
  Languages,
  Instagram,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react";

/**
 * HIDDEN TRAILS · 隐山小径 — Landing Page (bilingual EN / IT)
 * Single-file React component. Fonts loaded via Google Fonts <link> in index.html:
 *   Playfair Display (headings, both EN + IT — Latin charset covers Italian) + Inter (body).
 * Photography: Unsplash License (free for commercial use, no attribution required).
 * All copy lives in `content = { en: {...}, it: {...} }` below; the language toggle
 * in the navbar flips a single `lang` state and every section reads from content[lang].
 * Content marked [FAQ_ANSWER — ...] is a placeholder and must be supplied by the client.
 */

// ---------------------------------------------------------------------------
// Photography — Unsplash License, free for commercial use
// ---------------------------------------------------------------------------
const IMG_HERO =
  "https://images.unsplash.com/photo-1740521554540-37d947476b81?fm=jpg&q=80&w=2400&auto=format&fit=crop";
const IMG_CLIFF =
  "https://images.unsplash.com/photo-1733114103524-be9ba326a745?fm=jpg&q=80&w=2000&auto=format&fit=crop";
const IMG_PEAKS =
  "https://images.unsplash.com/photo-1561031454-4f1331bd2a34?fm=jpg&q=80&w=2000&auto=format&fit=crop";
const IMG_VALLEY =
  "https://images.unsplash.com/photo-1689068359768-837d97acb327?fm=jpg&q=80&w=2000&auto=format&fit=crop";

// ---------------------------------------------------------------------------
// Content — all bilingual copy lives here
// ---------------------------------------------------------------------------
const content = {
  en: {
    nav: { cta: "Begin Your Journey" },
    hero: {
      title: "Where the Map Ends, the Journey Begins",
      subtitle:
        "A private 4-day passage into Zhangjiajie's hidden trails — guided by those who call these mountains home.",
      anchor:
        "The same mountains that inspired a world you've already seen on screen — explored the way almost no one else ever does.",
    },
    philosophy:
      "Most travelers see Zhangjiajie through a viewfinder, shoulder to shoulder with a thousand others. Two thousand years ago, a man who had already achieved everything chose to disappear into these mountains rather than stay in the world that made him famous. We think he was onto something. This is not sightseeing. This is disappearance, by choice.",
    journey: {
      eyebrow: "The Journey",
      heading: "Four Days, Four Moments",
      stops: [
        {
          img: IMG_PEAKS,
          title: "The Door That Opened Itself",
          body: "Legend says this mountain once tore itself open in a single moment — a door the heavens chose to open, not one that was built. The same door ten thousand visitors pass through each year — except when you arrive, through a passage only locals know, at the one hour it belongs to no one but you.",
        },
        {
          img: IMG_CLIFF,
          title: "The Empty Overlook",
          before: "These peaks took ",
          emphasis: "380 million years",
          after:
            " to become what they are. Most visitors see them for the length of a photograph. Through trails only locals walk, timed to the one hour the light and the crowds align in your favor, you'll have them to yourself far longer than that.",
        },
        {
          img: IMG_VALLEY,
          title: "The Ridge Without a Name",
          body: "A full day on a trail that appears in no guidebook — carved by generations of mountain villagers, leading to a vista most residents of this province will never see.",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          title: "Dinner at the Edge of the World",
          body: "A private meal, prepared with mountain-grown ingredients, served where the cliffs fall away into cloud — the stories of these mountains told by the one person who truly knows them.",
        },
      ],
    },
    signature: {
      eyebrow: "Signature Experience",
      heading: "What Makes This Journey Different",
      items: [
        {
          icon: Compass,
          title: "Native-Born Guide",
          body: "Not a licensed tour guide — a lifelong resident who has spent decades exploring beyond the marked trails.",
        },
        {
          icon: Clock,
          title: "Timed to Perfection",
          body: "Every route timed around light, weather, and crowd patterns known only through years of local observation.",
        },
        {
          icon: MapPinOff,
          title: "Off the Map",
          body: "A full day's trail that exists in no app, no guidebook, and no other itinerary.",
        },
      ],
    },
    services: {
      eyebrow: "All-Inclusive",
      heading: "Every Detail, Arranged",
      items: [
        { icon: Car, text: "Private vehicle & driver throughout your stay" },
        { icon: Users, text: "Dedicated bilingual guide, native to Zhangjiajie" },
        { icon: Hotel, text: "Curated boutique accommodation, 3 nights" },
        { icon: UtensilsCrossed, text: "All meals, including one private mountain-side dinner" },
        { icon: ShieldCheck, text: "No hidden costs, no forced shopping, no group merging" },
      ],
    },
    trust: {
      eyebrow: "Trust & Assurance",
      title: "A Small Number of Journeys, Each One Considered",
      body: "We accept a limited number of families each season, working alongside a licensed local travel partner to ensure full regulatory coverage, insurance, and 24-hour support throughout your journey.",
      reviews: ["Guest story coming soon", "First journeys departing [season] — be among our founding guests"],
    },
    beforeYouArrive: {
      eyebrow: "Before You Arrive",
      lead: "A few things worth knowing before your journey begins.",
      items: [
        {
          icon: FileCheck,
          title: "No Visa Required",
          body: "Italian passport holders may enter China visa-free for stays of up to 30 days — well within the length of this journey. Simply travel with a passport valid for at least six months beyond your arrival date.",
        },
        {
          icon: CreditCard,
          title: "Payments, Handled",
          body: "China runs largely on mobile payment systems that most international cards can't access directly. We arrange this in advance, so you'll never need to think about it during your stay. [FAQ_ANSWER — 待补充：具体协助方式，如代付/预付现金兑换服务]",
        },
        {
          icon: Languages,
          title: "Language Support",
          body: "[FAQ_ANSWER — 待补充：当前向导语言支持范围，如实说明]",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Frequently Asked",
      items: [
        {
          q: "Is this trip suitable for families with children?",
          a: "[FAQ_ANSWER — 待补充：建议年龄范围与体力要求]",
        },
        {
          q: "What payment methods do you accept?",
          a: "[FAQ_ANSWER — 待补充：付款方式]",
        },
        { q: "What is your cancellation policy?", a: "[FAQ_ANSWER — 待补充]" },
        {
          q: "Do your guides speak Italian?",
          a: "[FAQ_ANSWER — 待补充：当前语言支持情况，如实说明]",
        },
      ],
    },
    pricing: {
      line: "From €1,450 per person — a journey without comparison, because there is nothing else quite like it.",
      sub: "Final pricing confirmed after a short consultation, based on season, group size, and trail selection.",
    },
    enquiry: {
      eyebrow: "Enquire",
      title: "Begin Your Journey",
      labels: {
        name: "Name",
        email: "Email",
        dates: "Preferred Travel Dates",
        travelers: "Number of Travelers",
        message: "Message",
      },
      submit: "Submit Enquiry",
      successTitle: "Thank You",
      successBody: "Your enquiry has been received. We will be in touch shortly.",
    },
    footer: {
      copyright: "© 2026 Hidden Trails Zhangjiajie",
    },
  },

  it: {
    nav: { cta: "Inizia il Tuo Viaggio" },
    hero: {
      title: "Dove Finisce la Mappa, Inizia il Viaggio",
      subtitle:
        "Un passaggio privato di 4 giorni tra i sentieri nascosti di Zhangjiajie — guidati da chi chiama casa queste montagne.",
      anchor:
        "Le stesse montagne che hanno ispirato un mondo che avete già visto sullo schermo — esplorate come quasi nessuno ha mai fatto.",
    },
    philosophy:
      "La maggior parte dei viaggiatori vede Zhangjiajie attraverso un obiettivo, spalla a spalla con mille altri. Duemila anni fa, un uomo che aveva già raggiunto tutto scelse di scomparire tra queste montagne, piuttosto che restare nel mondo che lo aveva reso celebre. Crediamo avesse capito qualcosa. Questo non è turismo. È una sparizione, per scelta.",
    journey: {
      eyebrow: "Il Viaggio",
      heading: "Quattro Giorni, Quattro Momenti",
      stops: [
        {
          img: IMG_PEAKS,
          title: "La Porta che si Aprì da Sola",
          body: "La leggenda narra che questa montagna si sia aperta in un solo istante — una porta che il cielo scelse di aprire, non che l'uomo costruì. La stessa porta che diecimila visitatori attraversano ogni anno — tranne quando ci arrivate voi, attraverso un passaggio noto solo ai locali, nell'unica ora in cui appartiene solo a voi.",
        },
        {
          img: IMG_CLIFF,
          title: "Il Belvedere Vuoto",
          before: "Queste vette hanno impiegato ",
          emphasis: "380 milioni di anni",
          after:
            " a diventare ciò che sono. La maggior parte dei visitatori le osserva per il tempo di una fotografia. Attraverso sentieri noti solo ai locali, calibrati sull'unica ora in cui luce e flussi turistici giocano a vostro favore, le avrete tutte per voi molto più a lungo.",
        },
        {
          img: IMG_VALLEY,
          title: "La Cresta Senza Nome",
          body: "Un'intera giornata su un sentiero che non appare in nessuna guida — tracciato da generazioni di montanari, che conduce a una vista che la maggior parte degli abitanti di questa provincia non vedrà mai.",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          title: "Cena ai Confini del Mondo",
          body: "Un pasto privato, preparato con ingredienti di montagna, servito dove le scogliere si perdono tra le nuvole — le storie di queste montagne raccontate da chi le conosce davvero.",
        },
      ],
    },
    signature: {
      eyebrow: "Esperienza Distintiva",
      heading: "Cosa Rende Unico Questo Viaggio",
      items: [
        {
          icon: Compass,
          title: "Guida Nativa",
          body: "Non una guida turistica qualsiasi — un residente che da decenni esplora oltre i sentieri segnati.",
        },
        {
          icon: Clock,
          title: "Un Tempismo Perfetto",
          body: "Ogni percorso calibrato su luce, meteo e flussi turistici, conosciuti solo dopo anni di osservazione locale.",
        },
        {
          icon: MapPinOff,
          title: "Fuori dalla Mappa",
          body: "Un'intera giornata su un sentiero che non esiste in nessuna app, guida o altro itinerario.",
        },
      ],
    },
    services: {
      eyebrow: "Tutto Incluso",
      heading: "Ogni Dettaglio, Curato",
      items: [
        { icon: Car, text: "Veicolo privato e autista per tutto il soggiorno" },
        { icon: Users, text: "Guida bilingue dedicata, nativa di Zhangjiajie" },
        { icon: Hotel, text: "Alloggio boutique selezionato, 3 notti" },
        { icon: UtensilsCrossed, text: "Tutti i pasti, inclusa una cena privata in montagna" },
        { icon: ShieldCheck, text: "Nessun costo nascosto, nessuno shopping forzato, nessun gruppo misto" },
      ],
    },
    trust: {
      eyebrow: "Fiducia e Garanzie",
      title: "Un Numero Limitato di Viaggi, Ognuno Curato nei Dettagli",
      body: "Accogliamo un numero limitato di famiglie ogni stagione, lavorando con un partner turistico locale autorizzato per garantire copertura assicurativa completa e assistenza 24 ore su 24.",
      reviews: ["Storia degli ospiti in arrivo", "Prime partenze [stagione] — tra i nostri primi ospiti"],
    },
    beforeYouArrive: {
      eyebrow: "Prima di Partire",
      lead: "Alcune cose utili da sapere prima che il vostro viaggio abbia inizio.",
      items: [
        {
          icon: FileCheck,
          title: "Nessun Visto Richiesto",
          body: "I titolari di passaporto italiano possono entrare in Cina senza visto per soggiorni fino a 30 giorni — ben oltre la durata di questo viaggio. Basta viaggiare con un passaporto valido per almeno sei mesi oltre la data di arrivo.",
        },
        {
          icon: CreditCard,
          title: "Pagamenti, Semplificati",
          body: "In Cina si utilizzano prevalentemente sistemi di pagamento mobile non sempre accessibili con le carte internazionali. Ce ne occupiamo in anticipo, così non dovrete pensarci durante il soggiorno. [FAQ_ANSWER — 待补充]",
        },
        {
          icon: Languages,
          title: "Supporto Linguistico",
          body: "[FAQ_ANSWER — 待补充]",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Domande Frequenti",
      items: [
        {
          q: "Questo viaggio è adatto a famiglie con bambini?",
          a: "[FAQ_ANSWER — 待补充：建议年龄范围与体力要求]",
        },
        { q: "Quali metodi di pagamento accettate?", a: "[FAQ_ANSWER — 待补充：付款方式]" },
        { q: "Qual è la vostra politica di cancellazione?", a: "[FAQ_ANSWER — 待补充]" },
        {
          q: "Le vostre guide parlano italiano?",
          a: "[FAQ_ANSWER — 待补充：当前语言支持情况，如实说明]",
        },
      ],
    },
    pricing: {
      line: "A partire da €1.450 a persona — un viaggio senza paragoni, perché non esiste nulla di simile.",
      sub: "Il prezzo finale viene confermato dopo una breve consulenza, in base a stagione, numero di persone e sentieri scelti.",
    },
    enquiry: {
      eyebrow: "Richiedi Informazioni",
      title: "Inizia il Tuo Viaggio",
      labels: {
        name: "Nome",
        email: "Email",
        dates: "Date di Viaggio Preferite",
        travelers: "Numero di Viaggiatori",
        message: "Messaggio",
      },
      submit: "Invia Richiesta",
      successTitle: "Grazie",
      successBody: "La vostra richiesta è stata ricevuta. Vi contatteremo a breve.",
    },
    footer: {
      copyright: "© 2026 Hidden Trails Zhangjiajie",
    },
  },
};

// ---------------------------------------------------------------------------
// Language context
// ---------------------------------------------------------------------------
const LangContext = createContext({ lang: "en", t: content.en, toggle: () => {} });
const useLang = () => useContext(LangContext);

// ---------------------------------------------------------------------------
// Shared animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ---------------------------------------------------------------------------
// Language toggle
// ---------------------------------------------------------------------------
function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex items-center gap-1.5 text-stone-300 hover:text-[#C5A059] transition-colors text-xs tracking-[0.15em]"
    >
      <span className={lang === "en" ? "text-[#C5A059]" : ""}>EN</span>
      <span className="text-stone-600">/</span>
      <span className={lang === "it" ? "text-[#C5A059]" : ""}>IT</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// 1. Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        <span
          className="text-[#F9F9F9] tracking-[0.15em] text-sm md:text-base uppercase whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hidden Trails <span className="text-stone-500 text-xs align-middle">· 隐山小径</span>
        </span>
        <div className="flex items-center gap-6">
          <LangToggle />
          <a
            href="#enquire"
            className="border border-[#C5A059] text-[#C5A059] text-xs md:text-sm tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[#C5A059] hover:text-black transition-colors duration-300 whitespace-nowrap"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// 2. Hero
// ---------------------------------------------------------------------------
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <img
          src={IMG_HERO}
          alt="Misty mountain peaks of Zhangjiajie"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#F9F9F9] text-4xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-stone-300 text-base md:text-lg mt-6 tracking-wide max-w-2xl leading-[1.7]"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-stone-400 text-xs md:text-sm mt-5 italic max-w-xl leading-[1.7]"
        >
          {t.hero.anchor}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-[#C5A059]" size={28} strokeWidth={1} />
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 3. Philosophy / Positioning
// ---------------------------------------------------------------------------
function Philosophy() {
  const { t } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-28 md:py-36 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <div className="w-10 h-px bg-[#C5A059] mx-auto mb-10" />
        <p
          className="text-xl md:text-2xl lg:text-3xl text-[#111111] leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.philosophy}
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. The Journey — alternating image/text blocks
// ---------------------------------------------------------------------------
function JourneySection() {
  const { t } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-32">
      <motion.div
        className="max-w-3xl mx-auto text-center px-6 mb-16 md:mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.journey.eyebrow}
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.journey.heading}
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 space-y-20 md:space-y-32">
        {t.journey.stops.map((stop, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src={stop.img}
                  alt={stop.title}
                  loading="lazy"
                  className={`w-full h-full object-cover ${stop.imgPosition || ""}`}
                />
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3
                className="text-[#F9F9F9] text-2xl md:text-3xl mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stop.title}
              </h3>
              <p className="text-stone-400 text-base leading-[1.8]">
                {stop.emphasis ? (
                  <>
                    {stop.before}
                    <span
                      className="text-[#C5A059] text-lg md:text-xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stop.emphasis}
                    </span>
                    {stop.after}
                  </>
                ) : (
                  stop.body
                )}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 5. Signature Experience — differentiators
// ---------------------------------------------------------------------------
function SignatureExperience() {
  const { t } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.signature.eyebrow}
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.signature.heading}
        </h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.signature.items.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-white border border-stone-200 px-8 py-12 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <Icon className="mx-auto mb-6 text-[#C5A059]" size={32} strokeWidth={1.2} />
            <h3
              className="text-[#111111] text-lg mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h3>
            <p className="text-stone-500 text-sm leading-[1.7]">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 6. All-Inclusive Services
// ---------------------------------------------------------------------------
function ServicesGrid() {
  const { t } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.services.eyebrow}
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.services.heading}
        </h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-stone-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {t.services.items.map(({ icon: Icon, text }, i) => (
          <motion.div key={i} variants={fadeUp} className="bg-[#111111] p-8">
            <Icon className="mb-5 text-[#C5A059]" size={26} strokeWidth={1.2} />
            <p className="text-stone-300 text-sm leading-[1.7]">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 7. Trust Section
// ---------------------------------------------------------------------------
function TrustSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.trust.eyebrow}
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.trust.title}
        </h2>
        <p className="text-stone-500 text-sm md:text-base leading-[1.8] max-w-xl mx-auto">
          {t.trust.body}
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.trust.reviews.map((review, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-white border border-stone-200 p-8 flex items-center justify-center text-center"
          >
            <p className="text-stone-400 italic text-sm leading-[1.8]">{review}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 8. Before You Arrive
// ---------------------------------------------------------------------------
function BeforeYouArrive() {
  const { t } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.beforeYouArrive.eyebrow}
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.beforeYouArrive.eyebrow}
        </h2>
        <p className="text-stone-400 text-sm md:text-base">{t.beforeYouArrive.lead}</p>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.beforeYouArrive.items.map(({ icon: Icon, title, body }, i) => (
          <motion.div key={i} variants={fadeUp} className="border border-stone-800 px-8 py-10">
            <Icon className="mb-5 text-[#C5A059]" size={28} strokeWidth={1.2} />
            <h3
              className="text-[#F9F9F9] text-lg mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h3>
            <p className="text-stone-500 text-sm leading-[1.7]">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 9. FAQ — accordion
// ---------------------------------------------------------------------------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-[#F9F9F9] text-base md:text-lg pr-6">{q}</span>
        {open ? (
          <Minus className="text-[#C5A059] shrink-0" size={18} />
        ) : (
          <Plus className="text-[#C5A059] shrink-0" size={18} />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-stone-500 text-sm leading-[1.8] pb-6 pr-10">{a}</p>
      </motion.div>
    </div>
  );
}

function FAQSection() {
  const { t } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="text-center mb-16">
          <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
            {t.faq.eyebrow}
          </p>
          <h2
            className="text-[#111111] text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.faq.heading}
          </h2>
        </div>
        <div>
          {t.faq.items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 10. Pricing Teaser
// ---------------------------------------------------------------------------
function PricingTeaser() {
  const { t } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-28 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className="w-10 h-px bg-[#C5A059] mx-auto mb-10" />
        <p
          className="text-xl md:text-2xl text-[#F9F9F9] leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.pricing.line}
        </p>
        <p className="text-stone-500 text-xs md:text-sm mt-6 tracking-wide">{t.pricing.sub}</p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 11. Enquiry Section
// ---------------------------------------------------------------------------
function EnquirySection() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    travelers: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="enquire" className="bg-[#F9F9F9] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="text-center mb-14">
          <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
            {t.enquiry.eyebrow}
          </p>
          <h2
            className="text-[#111111] text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.enquiry.title}
          </h2>
        </div>

        {submitted ? (
          <div className="border border-[#C5A059] bg-white px-8 py-14 text-center">
            <p
              className="text-[#111111] text-xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.enquiry.successTitle}
            </p>
            <p className="text-stone-500 text-sm">{t.enquiry.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  {t.enquiry.labels.name}
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#111111] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  {t.enquiry.labels.email}
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#111111] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  {t.enquiry.labels.dates}
                </label>
                <input
                  type="text"
                  name="dates"
                  value={form.dates}
                  onChange={handleChange}
                  placeholder="e.g. October 2026"
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#111111] placeholder:text-stone-300 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  {t.enquiry.labels.travelers}
                </label>
                <input
                  type="number"
                  min="1"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[#111111] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                {t.enquiry.labels.message}
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-300 py-3 text-[#111111] focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
              />
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[#C5A059] text-black text-sm tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#b6924c] transition-colors duration-300"
              >
                {t.enquiry.submit}
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* WhatsApp floating button */}
      <a
        href="#"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#111111] border border-[#C5A059] flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle className="text-[#C5A059]" size={24} />
      </a>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 12. Footer
// ---------------------------------------------------------------------------
function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#111111] border-t border-stone-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="text-[#F9F9F9] tracking-[0.15em] text-sm uppercase"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Hidden Trails <span className="text-stone-500 text-xs align-middle">· 隐山小径</span>
        </span>
        <a
          href="#"
          aria-label="Instagram"
          className="text-stone-400 hover:text-[#C5A059] transition-colors"
        >
          <Instagram size={20} />
        </a>
        <p className="text-stone-600 text-xs tracking-wide">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function HiddenTrailsLanding() {
  const [lang, setLang] = useState("en");
  const toggle = () => setLang((l) => (l === "en" ? "it" : "en"));
  const t = content[lang];

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      <div className="min-h-screen bg-[#111111]" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <Hero />
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Philosophy />
          <JourneySection />
          <SignatureExperience />
          <ServicesGrid />
          <TrustSection />
          <BeforeYouArrive />
          <FAQSection />
          <PricingTeaser />
          <EnquirySection />
        </motion.div>
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
