import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  BadgeCheck,
  Clock,
  Users2,
  Car,
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
 * QUARTZ PEAKS · 石峰之旅 — Landing Page (bilingual EN / 中文)
 * Single-file React component. Fonts loaded via Google Fonts <link> in index.html:
 *   Playfair Display + Inter (Latin), Noto Serif SC + Noto Sans SC (Chinese).
 * Photography: real, publicly published Zhangjiajie images of the actual itinerary
 * stops (Zhangjiajie National Forest Park, Tianmen Mountain, Wulingyuan / Tianzi
 * Mountain, the Grand Canyon Glass Bridge, Huanglong Cave), sourced from Wikimedia
 * Commons under CC BY 2.0 / CC BY-SA / public domain — see PHOTOS below for credit.
 * Each image renders with a small on-image attribution caption; keep it in production.
 * Content marked [FAQ_ANSWER — ...] is a placeholder and must be supplied by the client.
 */

// ---------------------------------------------------------------------------
// Photography — real, publicly licensed photographs of the actual itinerary stops
// ---------------------------------------------------------------------------
const PHOTOS = {
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/38197-Zhangjiajie_(49047512127).jpg?width=1920",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:38197-Zhangjiajie_(49047512127).jpg",
    alt: "Quartzite sandstone peaks of Zhangjiajie National Forest Park",
  },
  forestPark: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhangjiajie_National_Forest_Park_37829-Zhangjiajie_(48757250168).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Zhangjiajie_National_Forest_Park_37829-Zhangjiajie_(48757250168).jpg",
    alt: "Zhangjiajie National Forest Park",
  },
  tianmen: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianmen_38330-Zhangjiajie_(49047525877).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tianmen_38330-Zhangjiajie_(49047525877).jpg",
    alt: "Tianmen Cave, Tianmen Mountain National Forest Park",
  },
  tianzi: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/1_tianzishan_wulingyuan_zhangjiajie_2012.jpg?width=1400",
    credit: "Chensiyuan",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg",
    alt: "Panoramic view from Tianzi Mountain, Wulingyuan Scenic Area",
  },
  glassBridge: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhangjiajie_Glass_Bridge_20190726.jpg?width=1400",
    credit: "Sunyiming",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_Glass_Bridge_20190726.jpg",
    alt: "Zhangjiajie Grand Canyon Glass Bridge",
  },
  huanglong: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Huanglongdong.JPG?width=1400",
    credit: "Brookqi",
    license: "Public Domain",
    source: "https://commons.wikimedia.org/wiki/File:Huanglongdong.JPG",
    alt: "Huanglong Cave (Yellow Dragon Cave), Zhangjiajie",
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
          Quartz Peaks <span className="text-stone-500 text-xs align-middle">· 石峰之旅</span>
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
          <T en="A Private 4-Day Journey" zh="专属四日行程" />
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[#F9F9F9] text-4xl md:text-6xl lg:text-7xl leading-tight max-w-4xl"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="A Private Journey Through Zhangjiajie" zh="张家界，私享之旅" />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-stone-300 text-base md:text-lg mt-6 tracking-wide max-w-2xl leading-[1.7]"
        >
          <T
            en="Four days across Zhangjiajie's national parks and UNESCO scenery — Tianmen Mountain, Wulingyuan's stone forest, and the Grand Canyon glass bridge — with a licensed guide and a pace built around your family."
            zh="四天时间，穿越张家界国家森林公园、天门山、武陵源石林与大峡谷玻璃桥——专业持证向导全程陪同，行程节奏为您的家庭量身定制。"
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
            en="Zhangjiajie's peaks, canyons, and caves are best experienced without the friction of a fixed group schedule. We plan each day around your family's pace, with a licensed guide and private transport throughout."
            zh="张家界的奇峰、峡谷与溶洞，最适合以从容的节奏去体验，而非被固定的团队行程推着走。我们按照您家庭的节奏安排每一天，全程配备持证向导与私人用车。"
          />
        </p>
        <p
          className="text-xl md:text-2xl lg:text-3xl text-[#111111] leading-snug mt-6"
          style={{ fontFamily: serifFont(lang) }}
        >
          <T en="A private way to see all of it." zh="以私人定制的方式，尽览这一切。" />
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. The Journey — the real itinerary, alternating image/text blocks
// ---------------------------------------------------------------------------
const journeyStops = [
  {
    photo: PHOTOS.forestPark,
    title: { en: "Zhangjiajie National Forest Park", zh: "张家界国家森林公园" },
    copy: {
      en: "The park's quartzite sandstone pillars rise straight from the forest floor — the same peaks that inspired the floating mountains of Avatar. Your guide sets an unhurried pace for a full morning among them.",
      zh: "公园中拔地而起的石英砂岩峰林，正是电影《阿凡达》悬浮山的灵感来源。向导会为您安排一个从容的上午，深入其中细细游览。",
    },
  },
  {
    photo: PHOTOS.tianmen,
    title: { en: "Tianmen Mountain National Forest Park", zh: "天门山国家森林公园" },
    copy: {
      en: "A cable car ride above the valley leads to Tianmen Cave, a natural archway carved through the mountain, and the cliffside glass walkways beyond it.",
      zh: "缆车穿越山谷直达天门洞——一座天然形成的巨型山洞，再往前便是沿绝壁而建的玻璃栈道。",
    },
  },
  {
    photo: PHOTOS.tianzi,
    title: {
      en: "Wulingyuan Core Scenic Area — Tianzi Mountain & Suoxiyu",
      zh: "武陵源核心景区——天子山与索溪峪",
    },
    copy: {
      en: "Tianzi Mountain's viewing platforms look out over the full sweep of Wulingyuan's peaks, while the Suoxiyu valley offers a quieter, water-level view of the same landscape.",
      zh: "天子山观景台可俯瞰武陵源群峰全景，索溪峪峡谷则从谷底水岸，呈现同一片景观的另一种静谧视角。",
    },
  },
  {
    photo: PHOTOS.glassBridge,
    title: { en: "Zhangjiajie Grand Canyon Glass Bridge", zh: "张家界大峡谷玻璃桥" },
    copy: {
      en: "One of the world's longest and highest glass-bottomed bridges spans the Zhangjiajie Grand Canyon, roughly 300 metres above the valley floor.",
      zh: "张家界大峡谷玻璃桥是世界上最长、最高的玻璃桥之一，横跨峡谷，距谷底约300米。",
    },
  },
  {
    photo: PHOTOS.huanglong,
    title: { en: "Huanglong Cave (Yellow Dragon Cave)", zh: "黄龙洞" },
    copy: {
      en: "A limestone cave system with underground rivers and chambers of stalactites, formed over hundreds of thousands of years.",
      zh: "黄龙洞是一座喀斯特溶洞群，内有地下河与历经数十万年形成的钟乳石景观。",
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
          <T en="Four Days, Five Landmarks" zh="四日时光，五大景区" />
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
    icon: BadgeCheck,
    title: { en: "Licensed Professional Guide", zh: "专业持证向导" },
    copy: {
      en: "An officially licensed local guide, fluent in your language, with you at every site throughout the journey.",
      zh: "官方认证的本地专业向导，精通您的语言，全程陪同五大景区。",
    },
  },
  {
    icon: Clock,
    title: { en: "Timed to Avoid the Crowds", zh: "错峰安排" },
    copy: {
      en: "Entry times and routes planned around each site's quieter hours, based on years of local experience.",
      zh: "基于多年本地经验，合理安排入园时间与路线，尽量避开人流高峰。",
    },
  },
  {
    icon: Users2,
    title: { en: "Paced for Your Family", zh: "专属节奏" },
    copy: {
      en: "A private vehicle and a flexible schedule, so each day moves at a pace that suits your family — not a bus timetable.",
      zh: "私人专车，行程灵活安排，让每一天都跟随您家庭的节奏——而非大巴时刻表。",
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
            <h3 className="text-[#111111] text-lg mb-3" style={{ fontFamily: serifFont(lang) }}>
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
    icon: BadgeCheck,
    title: { en: "Licensed Bilingual Guide", zh: "持证双语向导" },
    copy: { en: "Officially licensed, native to Hunan, with you every step.", zh: "官方持证向导，土生土长的湖南本地人，全程随行。" },
  },
  {
    icon: Hotel,
    title: { en: "Curated Boutique Stay", zh: "精选精品住宿" },
    copy: { en: "3 nights of considered accommodation.", zh: "三晚精心挑选的住宿体验。" },
  },
  {
    icon: UtensilsCrossed,
    title: { en: "All Meals Included", zh: "全程餐饮" },
    copy: { en: "Breakfast, lunch, and dinner throughout the journey.", zh: "全程含早、中、晚三餐。" },
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
            en="From €1,450 per person — a private itinerary across Zhangjiajie's five landmark sites."
            zh="每人价格自 €1,450 起——涵盖张家界五大标志性景区的私人定制行程。"
          />
        </p>
        <p className="text-stone-500 text-xs md:text-sm mt-6 tracking-wide">
          <T
            en="Final pricing is confirmed after a short consultation, based on season, group size, and accommodation."
            zh="最终价格将根据季节、团队人数及住宿标准，在简短咨询后确认。"
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
            <p className="text-[#F9F9F9] text-xl mb-2" style={{ fontFamily: serifFont(lang) }}>
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
          Quartz Peaks <span className="text-stone-500 text-xs align-middle">· 石峰之旅</span>
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
            en="© 2026 Quartz Peaks Zhangjiajie. All rights reserved."
            zh="© 2026 石峰之旅 张家界。保留所有权利。"
          />
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function QuartzPeaksLanding() {
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
