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
  Instagram,
  MessageCircle,
  Plus,
  Minus,
  Languages,
} from "lucide-react";

/**
 * HIDDEN TRAILS · 隐山小径 — Landing Page (bilingual EN / 中文)
 * Single-file React component. Fonts loaded via Google Fonts <link> in index.html:
 *   Playfair Display + Inter (Latin), Noto Serif SC + Noto Sans SC (Chinese).
 * Photography: real, publicly published Zhangjiajie images from Wikimedia Commons,
 * all released under CC BY 2.0 / CC BY-SA 2.5 — see PHOTOS below for credit + source.
 * Each image renders with a small on-image attribution caption; keep it on production use.
 * Content marked [FAQ_ANSWER — ...] is a placeholder and must be supplied by the client.
 */

// ---------------------------------------------------------------------------
// Photography — real, publicly licensed Zhangjiajie photographs (Wikimedia Commons)
// ---------------------------------------------------------------------------
const PHOTOS = {
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/38197-Zhangjiajie_(49047512127).jpg?width=1920",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:38197-Zhangjiajie_(49047512127).jpg",
    alt: "Sandstone pillar peaks of the Wulingyuan Scenic Area, Zhangjiajie",
  },
  trail1: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhangjiajie_National_Forest_Park_37829-Zhangjiajie_(48757250168).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Zhangjiajie_National_Forest_Park_37829-Zhangjiajie_(48757250168).jpg",
    alt: "Forested trail within Zhangjiajie National Forest Park",
  },
  trail2: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yangjiajie.jpg?width=1400",
    credit: "Yoo Chung",
    license: "CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Yangjiajie.jpg",
    alt: "Yangjiajie scenic overlook, Zhangjiajie",
  },
  trail3: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhangjiajie_National_Forest_Park_38080-Zhangjiajie_(48757768532).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Zhangjiajie_National_Forest_Park_38080-Zhangjiajie_(48757768532).jpg",
    alt: "Mountain ridge terrain in Zhangjiajie National Forest Park",
  },
  trail4: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yellow_Stone_Village_37946-Zhangjiajie_(49047320541).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Yellow_Stone_Village_37946-Zhangjiajie_(49047320541).jpg",
    alt: "Cliffs and peaks at Yellow Stone Village, Zhangjiajie",
  },
};

// ---------------------------------------------------------------------------
// Language context
// ---------------------------------------------------------------------------
const LangContext = createContext({ lang: "en", toggle: () => {} });
const useLang = () => useContext(LangContext);

function T({ en, zh }) {
  const { lang } = useLang();
  return lang === "zh" ? zh : en;
}

function serifFont(lang) {
  return lang === "zh" ? "'Noto Serif SC', serif" : "'Playfair Display', serif";
}
function sansFont(lang) {
  return lang === "zh" ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif";
}

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
// Photo component with real image + discreet attribution caption
// ---------------------------------------------------------------------------
function Photo({ photo, ratio = "aspect-[4/3]", className = "" }) {
  return (
    <div className={`relative ${ratio} overflow-hidden bg-stone-900 ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <a
        href={photo.source}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-1.5 right-2 text-[10px] text-white/50 hover:text-white/80 transition-colors"
      >
        © {photo.credit} · {photo.license} · Wikimedia Commons
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Language toggle
// ---------------------------------------------------------------------------
function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex items-center gap-1.5 text-stone-300 hover:text-[#C5A059] transition-colors text-xs tracking-[0.1em]"
    >
      <Languages size={14} strokeWidth={1.5} />
      <span className={lang === "en" ? "text-[#C5A059]" : ""}>EN</span>
      <span className="text-stone-600">/</span>
      <span className={lang === "zh" ? "text-[#C5A059]" : ""}>中文</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// 1. Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLang();

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
          style={{ fontFamily: serifFont(lang) }}
        >
          Hidden Trails <span className="text-stone-500 text-xs align-middle">· 隐山小径</span>
        </span>
        <div className="flex items-center gap-6">
          <LangToggle />
          <a
            href="#enquire"
            className="border border-[#C5A059] text-[#C5A059] text-xs md:text-sm tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[#C5A059] hover:text-black transition-colors duration-300 whitespace-nowrap"
          >
            <T en="Begin Your Journey" zh="开启旅程" />
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
  const { lang } = useLang();
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <Photo photo={PHOTOS.hero} ratio="h-full w-full" className="!aspect-auto" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#C5A059] text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
        >
          <T en="A Private 4-Day Passage" zh="专属四日秘境之旅" />
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[#F9F9F9] text-4xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="Where the Map Ends, the Journey Begins" zh="地图尽头，旅程开始" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-stone-300 text-base md:text-lg mt-6 tracking-wide max-w-2xl leading-[1.7]"
        >
          <T
            en="A private 4-day passage into Zhangjiajie's hidden trails — guided by those who call these mountains home."
            zh="为期四天的私人张家界秘境之旅——由世代居于此山的向导，带您走入无人问津的秘径。"
          />
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
  const { lang } = useLang();
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
          style={{ fontFamily: serifFont(lang) }}
        >
          <T
            en="Most travelers see Zhangjiajie through a viewfinder, shoulder to shoulder with a thousand others. We take you somewhere else entirely — along paths our guides have walked since childhood, to places that exist on no map and in no tour brochure."
            zh="大多数游客只是隔着取景框、挤在人群中看张家界。而我们带您去往截然不同的地方——沿着向导自幼走过的山路，抵达地图与旅行手册上都未曾标注的秘境。"
          />
        </p>
        <p
          className="text-xl md:text-2xl lg:text-3xl text-[#111111] leading-snug mt-6"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="This is not sightseeing. This is discovery." zh="这不是观光，这是探索。" />
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. The Journey — alternating image/text blocks
// ---------------------------------------------------------------------------
const journeyStops = [
  {
    photo: PHOTOS.trail1,
    title: { en: "The First Trail", zh: "第一段秘径" },
    copy: {
      en: "Before dawn, before the crowds, we begin where the forest still keeps its secrets — a path known only to the families who have lived beneath these peaks for generations.",
      zh: "破晓之前，尘嚣未至，我们从森林仍守着秘密的地方启程——一条只属于世代居住在这些山峰脚下的家族的小路。",
    },
  },
  {
    photo: PHOTOS.trail2,
    title: { en: "The Empty Overlook", zh: "无人的观景台" },
    copy: {
      en: "The same summit ten thousand visitors climb each year — except when you arrive, through a passage only locals know, at the one hour it belongs to no one but you.",
      zh: "同一处每年吸引万千游客的山巅——但当您抵达时，穿过一条只有本地人知晓的通道，在那唯独属于您的一个时刻，这里空无一人。",
    },
  },
  {
    photo: PHOTOS.trail3,
    title: { en: "The Ridge Without a Name", zh: "无名的山脊" },
    copy: {
      en: "A full day on a trail that appears in no guidebook — carved by generations of mountain villagers, leading to a vista most residents of this province will never see.",
      zh: "整整一天，走在任何旅行指南都未曾记载的山脊小径上——由世代山民踏出的路，通往这个省份大多数居民都未曾见过的景致。",
    },
  },
  {
    photo: PHOTOS.trail4,
    title: { en: "Dinner at the Edge of the World", zh: "天涯尽头的晚宴" },
    copy: {
      en: "A private meal, prepared with mountain-grown ingredients, served where the cliffs fall away into cloud — the stories of these mountains told by the one person who truly knows them.",
      zh: "一场私人晚宴，选用山间食材烹制，设于云雾漫过悬崖的边缘——由唯一真正了解这片山脉的人，为您讲述它的故事。",
    },
  },
];

function JourneySection() {
  const { lang } = useLang();
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
          <T en="The Journey" zh="旅程" />
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="Four Days, One Trail at a Time" zh="四日时光，一径一程" />
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 space-y-20 md:space-y-32">
        {journeyStops.map((stop, i) => (
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
              <Photo photo={stop.photo} />
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
                style={{ fontFamily: serifFont(lang) }}
              >
                <T en={stop.title.en} zh={stop.title.zh} />
              </h3>
              <p className="text-stone-400 text-base leading-[1.8]">
                <T en={stop.copy.en} zh={stop.copy.zh} />
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
const differentiators = [
  {
    icon: Compass,
    title: { en: "Native-Born Guide", zh: "本地土生向导" },
    copy: {
      en: "Not a licensed tour guide — a lifelong resident who has spent decades exploring beyond the marked trails.",
      zh: "并非持证导游——而是一位在此山中生活数十年、走遍未标记山径的当地居民。",
    },
  },
  {
    icon: Clock,
    title: { en: "Timed to Perfection", zh: "精准择时" },
    copy: {
      en: "Every route timed around light, weather, and crowd patterns known only through years of local observation.",
      zh: "每一条路线的时间安排，都基于多年本地观察积累的光线、天气与人流规律。",
    },
  },
  {
    icon: MapPinOff,
    title: { en: "Off the Map", zh: "地图之外" },
    copy: {
      en: "A full day's trail that exists in no app, no guidebook, and no other itinerary.",
      zh: "整整一日的行程，不存在于任何应用程序、旅行指南，或其他行程单中。",
    },
  },
];

function SignatureExperience() {
  const { lang } = useLang();
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
          <T en="Signature Experience" zh="标志性体验" />
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="What Makes This Journey Different" zh="这场旅程为何与众不同" />
        </h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {differentiators.map(({ icon: Icon, title, copy }, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-white border border-stone-200 px-8 py-12 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <Icon className="mx-auto mb-6 text-[#C5A059]" size={32} strokeWidth={1.2} />
            <h3
              className="text-[#111111] text-lg mb-3"
              style={{ fontFamily: serifFont(lang) }}
            >
              <T en={title.en} zh={title.zh} />
            </h3>
            <p className="text-stone-500 text-sm leading-[1.7]">
              <T en={copy.en} zh={copy.zh} />
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 6. All-Inclusive Services
// ---------------------------------------------------------------------------
const services = [
  {
    icon: Car,
    title: { en: "Private Vehicle & Driver", zh: "专属车辆与司机" },
    copy: { en: "Throughout your entire stay.", zh: "全程陪同，随行专属座驾。" },
  },
  {
    icon: Users,
    title: { en: "Dedicated Bilingual Guide", zh: "专属双语向导" },
    copy: { en: "Native to Zhangjiajie, with you every step.", zh: "土生土长的张家界向导，全程随行。" },
  },
  {
    icon: Hotel,
    title: { en: "Curated Boutique Stay", zh: "精选精品住宿" },
    copy: { en: "3 nights of considered accommodation.", zh: "三晚精心挑选的住宿体验。" },
  },
  {
    icon: UtensilsCrossed,
    title: { en: "All Meals Included", zh: "全程餐饮" },
    copy: { en: "Including one private mountain-side dinner.", zh: "包含一场私人山间晚宴。" },
  },
  {
    icon: ShieldCheck,
    title: { en: "No Hidden Costs", zh: "无隐藏消费" },
    copy: { en: "No forced shopping stops, no group merging.", zh: "无强制购物、无拼团合并。" },
  },
];

function ServicesGrid() {
  const { lang } = useLang();
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
          <T en="All-Inclusive" zh="全包服务" />
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="Every Detail, Arranged" zh="每个细节，皆已安排" />
        </h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-stone-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {services.map(({ icon: Icon, title, copy }, i) => (
          <motion.div key={i} variants={fadeUp} className="bg-[#111111] p-8">
            <Icon className="mb-5 text-[#C5A059]" size={26} strokeWidth={1.2} />
            <h3 className="text-[#F9F9F9] text-base mb-2 tracking-wide">
              <T en={title.en} zh={title.zh} />
            </h3>
            <p className="text-stone-500 text-sm leading-[1.7]">
              <T en={copy.en} zh={copy.zh} />
            </p>
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
  const { lang } = useLang();
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
          <T en="Trust & Assurance" zh="信任与保障" />
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl mb-6"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="A Small Number of Journeys, Each One Considered" zh="限量旅程，用心安排" />
        </h2>
        <p className="text-stone-500 text-sm md:text-base leading-[1.8] max-w-xl mx-auto">
          <T
            en="We accept a limited number of families each season, working alongside a licensed local travel partner to ensure full regulatory coverage, insurance, and 24-hour support throughout your journey."
            zh="我们每季仅接待有限数量的家庭，并与持牌本地旅行合作方紧密协作，确保全程受监管保障、投保完善，并提供24小时支持。"
          />
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeUp}
          className="bg-white border border-stone-200 p-8 flex items-center justify-center text-center"
        >
          <p className="text-stone-400 italic text-sm leading-[1.8]">
            <T en="Guest story coming soon." zh="客户故事即将呈现。" />
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="bg-white border border-stone-200 p-8 flex items-center justify-center text-center"
        >
          <p className="text-stone-400 italic text-sm leading-[1.8]">
            <T
              en="First journeys departing [season] — be among our founding guests."
              zh="首批旅程将于[季节]启程——成为我们的首批贵宾。"
            />
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 8. FAQ — accordion
// ---------------------------------------------------------------------------
const faqs = [
  {
    q: { en: "Is this trip suitable for families with children?", zh: "这次旅程适合带孩子的家庭吗？" },
    a: {
      en: "[FAQ_ANSWER — 待补充：建议年龄范围与体力要求]",
      zh: "[FAQ_ANSWER — 待补充：建议年龄范围与体力要求]",
    },
  },
  {
    q: { en: "What payment methods do you accept?", zh: "你们接受哪些付款方式？" },
    a: {
      en: "[FAQ_ANSWER — 待补充：付款方式，欧洲客人通常需要非支付宝/微信渠道]",
      zh: "[FAQ_ANSWER — 待补充：付款方式，欧洲客人通常需要非支付宝/微信渠道]",
    },
  },
  {
    q: { en: "What is your cancellation policy?", zh: "取消政策是怎样的？" },
    a: { en: "[FAQ_ANSWER — 待补充]", zh: "[FAQ_ANSWER — 待补充]" },
  },
  {
    q: { en: "Do your guides speak Italian or Spanish?", zh: "向导会说意大利语或西班牙语吗？" },
    a: {
      en: "[FAQ_ANSWER — 待补充：当前语言支持情况，如实说明]",
      zh: "[FAQ_ANSWER — 待补充：当前语言支持情况，如实说明]",
    },
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-[#F9F9F9] text-base md:text-lg pr-6">
          <T en={q.en} zh={q.zh} />
        </span>
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
        <p className="text-stone-500 text-sm leading-[1.8] pb-6 pr-10">
          <T en={a.en} zh={a.zh} />
        </p>
      </motion.div>
    </div>
  );
}

function FAQSection() {
  const { lang } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="text-center mb-16">
          <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
            <T en="FAQ" zh="常见问题" />
          </p>
          <h2
            className="text-[#F9F9F9] text-3xl md:text-4xl"
            style={{ fontFamily: serifFont(lang) }}
          >
            <T en="Frequently Asked" zh="常见问题解答" />
          </h2>
        </div>
        <div>
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 9. Pricing Teaser
// ---------------------------------------------------------------------------
function PricingTeaser() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-28 px-6">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className="w-10 h-px bg-[#C5A059] mx-auto mb-10" />
        <p
          className="text-xl md:text-2xl text-[#111111] leading-snug"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T
            en="From €1,450 per person — a journey without comparison, because there is nothing else quite like it."
            zh="每人价格自 €1,450 起——独一无二的旅程，因为世间再无相似之选。"
          />
        </p>
        <p className="text-stone-500 text-xs md:text-sm mt-6 tracking-wide">
          <T
            en="Final pricing is confirmed after a short consultation, based on season, group size, and trail selection."
            zh="最终价格将根据季节、团队人数及路线选择，在简短咨询后确认。"
          />
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 10. Enquiry Section
// ---------------------------------------------------------------------------
function EnquirySection() {
  const { lang } = useLang();
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
    <section id="enquire" className="bg-[#111111] py-24 md:py-32 px-6">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="text-center mb-14">
          <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
            <T en="Enquire" zh="咨询" />
          </p>
          <h2
            className="text-[#F9F9F9] text-3xl md:text-4xl"
            style={{ fontFamily: serifFont(lang) }}
          >
            <T en="Begin Your Journey" zh="开启旅程" />
          </h2>
        </div>

        {submitted ? (
          <div className="border border-[#C5A059] bg-[#161616] px-8 py-14 text-center">
            <p
              className="text-[#F9F9F9] text-xl mb-2"
              style={{ fontFamily: serifFont(lang) }}
            >
              <T en="Thank You" zh="感谢您的咨询" />
            </p>
            <p className="text-stone-400 text-sm">
              <T
                en="Your enquiry has been received. We will be in touch shortly."
                zh="我们已收到您的咨询，将尽快与您联系。"
              />
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  <T en="Name" zh="姓名" />
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-700 py-3 text-[#F9F9F9] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  <T en="Email" zh="邮箱" />
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-700 py-3 text-[#F9F9F9] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  <T en="Preferred Travel Dates" zh="预计出行日期" />
                </label>
                <input
                  type="text"
                  name="dates"
                  value={form.dates}
                  onChange={handleChange}
                  placeholder="e.g. October 2026"
                  className="w-full bg-transparent border-b border-stone-700 py-3 text-[#F9F9F9] placeholder:text-stone-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                  <T en="Number of Travelers" zh="出行人数" />
                </label>
                <input
                  type="number"
                  min="1"
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-700 py-3 text-[#F9F9F9] focus:outline-none focus:border-[#C5A059] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-stone-500 text-xs uppercase tracking-wider mb-2">
                <T en="Message" zh="留言" />
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-700 py-3 text-[#F9F9F9] focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
              />
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[#C5A059] text-black text-sm tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#b6924c] transition-colors duration-300"
              >
                <T en="Submit Enquiry" zh="提交咨询" />
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
// 11. Footer
// ---------------------------------------------------------------------------
function Footer() {
  const { lang } = useLang();
  return (
    <footer className="bg-[#111111] border-t border-stone-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="text-[#F9F9F9] tracking-[0.15em] text-sm uppercase"
          style={{ fontFamily: serifFont(lang) }}
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
        <p className="text-stone-600 text-xs tracking-wide">
          <T
            en="© 2026 Hidden Trails Zhangjiajie. All rights reserved."
            zh="© 2026 隐山小径 张家界。保留所有权利。"
          />
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function HiddenTrailsLanding() {
  const [lang, setLang] = useState("en");
  const toggle = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      <div className="min-h-screen bg-[#111111]" style={{ fontFamily: sansFont(lang) }}>
        <Navbar />
        <Hero />
        <Philosophy />
        <JourneySection />
        <SignatureExperience />
        <ServicesGrid />
        <TrustSection />
        <FAQSection />
        <PricingTeaser />
        <EnquirySection />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
