import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Route,
  Clock,
  UserCheck,
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
  Mountain,
  DoorOpen,
  Landmark,
  Calendar,
  Umbrella,
  Flower2,
  CloudRain,
  Leaf,
  Snowflake,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * HIDDEN TRAILS · 隐山小径 — Landing Page (bilingual EN / 中文 / IT)
 * Single-file React component. Fonts loaded via Google Fonts <link> in index.html:
 *   Playfair Display + Inter (EN/IT, Latin charset covers Italian),
 *   Noto Serif SC + Noto Sans SC (中文).
 * Photography: a mix of Unsplash License images (free commercial use, no attribution
 * required) and real, named-landmark photos from Wikimedia Commons under CC BY 2.0 /
 * CC BY-SA 3.0/4.0 (commercial use permitted, attribution required — shown as on-image
 * credit captions). Both are genuinely, legally licensed for commercial use; this is a
 * deliberate, final choice rather than a placeholder pending official tourism-board
 * imagery — see PHOTOS below and the credit captions rendered by AttributedPhoto.
 * All copy lives in `content = { en: {...}, zh: {...}, it: {...} }` below; the language
 * toggle in the navbar sets a single `lang` state and every section reads from content[lang].
 * Company, payment, cancellation, insurance, language, and flight-logistics copy reflects
 * real info supplied by the operator (BabyDuck Travel Co., Ltd.) for a pitch/demo build.
 * Pricing tiers are indicative market-rate estimates, explicitly marked as such — confirm
 * real figures before using them commercially. The child-suitability FAQ answer is still a
 * placeholder draft (no real policy supplied yet).
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
// "Why Zhangjiajie" photography — real, named-landmark photos from Wikimedia
// Commons (CC BY 2.0 / CC BY-SA 3.0/4.0), all legally licensed for commercial
// use. This is the settled photo strategy, not a placeholder. Note: no
// freely-licensed photo of the actual Tianmen Fox Fairy stage performance
// exists publicly (confirmed by search); tianmenCave shows the mountain and
// cave where the show is staged at its foot instead. Each landmark carries
// 2-3 real photos so its lightbox reads as a small gallery rather than a
// single enlarged image.
// ---------------------------------------------------------------------------
const PHOTOS = {
  pillars: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/38197-Zhangjiajie_(49047512127).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:38197-Zhangjiajie_(49047512127).jpg",
    alt: "Quartzite sandstone pillars of the Wulingyuan Scenic Area",
  },
  pillars2: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Avatar_World_37845-Zhangjiajie_(49046811673).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Avatar_World_37845-Zhangjiajie_(49046811673).jpg",
    alt: "Avatar World, Yuanjiajie — the pinnacles that inspired the film's floating mountains",
  },
  pillars3: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Avatar_World_38391-Zhangjiajie_(49047531272).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Avatar_World_38391-Zhangjiajie_(49047531272).jpg",
    alt: "Avatar World, Yuanjiajie — quartzite pinnacles rising from the valley",
  },
  tianmenCave: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianmen_38330-Zhangjiajie_(49047525877).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tianmen_38330-Zhangjiajie_(49047525877).jpg",
    alt: "Tianmen Cave, Tianmen Mountain — where the Tianmen Fox Fairy show is staged",
  },
  tianmenCave2: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianmen_Mountain_38268-Zhangjiajie_(48757241953).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tianmen_Mountain_38268-Zhangjiajie_(48757241953).jpg",
    alt: "Tianmen Mountain, Zhangjiajie",
  },
  tianmenCave3: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianmen_Mountain_38303-Zhangjiajie_(48757565201).jpg?width=1400",
    credit: "xiquinhosilva",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Tianmen_Mountain_38303-Zhangjiajie_(48757565201).jpg",
    alt: "Tianmen Mountain cable car route, Zhangjiajie",
  },
  wulingyuan: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/1_tianzishan_wulingyuan_zhangjiajie_2012.jpg?width=1400",
    credit: "Chensiyuan",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg",
    alt: "Panoramic view over the Wulingyuan Scenic Area from Tianzi Mountain",
  },
  wulingyuan2: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/1_zhangjiajie_huangshizhai_wulingyuan_panorama_2012.jpg?width=1400",
    credit: "Chensiyuan",
    license: "CC BY-SA 4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:1_zhangjiajie_huangshizhai_wulingyuan_panorama_2012.jpg",
    alt: "Five Fingers Peak, Huangshizhai, Wulingyuan Scenic Area",
  },
  seasonMisty: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Zhangjiajie_(223137313).jpeg?width=1400",
    credit: "Hanlu Cao",
    license: "CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_(223137313).jpeg",
    alt: "Mist and rain over the forested peaks of Zhangjiajie",
  },
  yangjiajie: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yangjiajie.jpg?width=1400",
    credit: "Yoo Chung",
    license: "CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Yangjiajie.jpg",
    alt: "Yangjiajie scenic area, Zhangjiajie",
  },
};

// ---------------------------------------------------------------------------
// Content — all bilingual copy lives here
// ---------------------------------------------------------------------------
const content = {
  en: {
    nav: { cta: "Begin Your Journey" },
    hero: {
      title: "Where the Trail Leaves the Map",
      subtitle:
        "A private 4-day journey with a native guide, timed around the light and the crowds, on trails no app or guidebook lists — everything else, arranged.",
      anchor:
        "The same mountains that inspired a world you've already seen on screen — explored the way almost no one else ever does.",
    },
    tripFacts: {
      items: [
        { icon: Calendar, label: "4 Days / 3 Nights" },
        { icon: Users, label: "Private Tour, 1–6 Travelers" },
        { icon: ShieldCheck, label: "Guide, Driver, Hotel & Meals Included" },
      ],
      priceLine: "From €1,250 per person",
    },
    breather: {
      line: "The mountains set the schedule. We simply learned, over years, when to listen.",
    },
    whyZhangjiajie: {
      eyebrow: "Why Zhangjiajie",
      heading: "A Landscape Unlike Any Other",
      items: [
        {
          icon: Mountain,
          gallery: [PHOTOS.pillars, PHOTOS.pillars2, PHOTOS.pillars3],
          title: "Pillars Found Nowhere Else",
          body: "Thousands of quartz-sandstone pillars rise from the forest floor — a landform so singular that one of them was officially renamed Avatar Hallelujah Mountain after inspiring the floating peaks of Pandora.",
        },
        {
          icon: DoorOpen,
          gallery: [PHOTOS.tianmenCave, PHOTOS.tianmenCave2, PHOTOS.tianmenCave3],
          title: "A Door Carved by the Mountain Itself",
          body: "Tianmen Cave, the world's highest natural archway, is said to have opened in a single moment in 263 AD, when a section of the cliff face collapsed — a threshold locals still call the gate between worlds. After dark, the same legend takes the stage at its foot, in the open-air Tianmen Fox Fairy performance.",
        },
        {
          icon: Landmark,
          gallery: [PHOTOS.wulingyuan, PHOTOS.wulingyuan2],
          title: "A UNESCO World Heritage Landscape",
          body: "The Wulingyuan Scenic Area, encompassing Zhangjiajie National Forest Park, has been protected as a World Heritage Site since 1992 — one of the rarest karst-and-quartzite landscapes on Earth.",
        },
      ],
    },
    bestTimeToVisit: {
      eyebrow: "Best Time to Visit",
      heading: "Choose Your Zhangjiajie",
      intro:
        "Every season shows these mountains differently. We'll help you pick the dates that match what you want most from the trip.",
      seasons: [
        {
          icon: Flower2,
          photo: { src: IMG_PEAKS, alt: "Zhangjiajie peaks in spring light" },
          label: "Spring",
          months: "March – May",
          tag: "Great for Photography",
          body: "Clear skies, mild temperatures, and wildflowers along the lower trails — one of the two best windows for crisp, distant views.",
        },
        {
          icon: CloudRain,
          photo: PHOTOS.seasonMisty,
          label: "Summer",
          months: "June – August",
          tag: "Rainy Season",
          body: "Warm and humid, with frequent mist and low cloud. Atmospheric for photos of the peaks emerging from fog, but visibility can be limited.",
        },
        {
          icon: Leaf,
          photo: { src: IMG_CLIFF, alt: "Zhangjiajie canyon in autumn" },
          label: "Autumn",
          months: "September – November",
          tag: "Best Overall",
          body: "The clearest air of the year, comfortable temperatures, and golden foliage on the lower slopes — most travelers' first choice.",
        },
        {
          icon: Snowflake,
          photo: { src: IMG_VALLEY, alt: "Zhangjiajie valley in winter" },
          label: "Winter",
          months: "December – February",
          tag: "Quiet Season",
          body: "Colder, with occasional snow dusting the higher peaks and noticeably fewer visitors — a starker, quieter version of the same landscape.",
        },
      ],
    },
    journey: {
      eyebrow: "The Journey",
      heading: "Four Days, Five Moments",
      stops: [
        {
          img: IMG_PEAKS,
          variant: "full",
          day: "Day 1",
          title: "Tianmen Mountain: The Door That Opened Itself",
          body: "Legend says this mountain once tore itself open in a single moment — a door the heavens chose to open, not one that was built. After dark, the same legend comes alive on stage at the mountain's base, in the Tianmen Fox Fairy performance — an open-air retelling of the fox spirit said to have crossed through that door into the world of men. By day, you'll pass through it yourself: through a passage only locals know, at the one hour it belongs to no one but you.",
        },
        {
          img: IMG_CLIFF,
          day: "Day 2",
          title: "Zhangjiajie National Forest Park: The Empty Overlook",
          before: "These peaks took ",
          emphasis: "380 million years",
          after:
            " to become what they are. Most visitors see them for the length of a photograph. Through trails only locals walk, timed to the one hour the light and the crowds align in your favor, you'll have them to yourself far longer than that.",
        },
        {
          img: PHOTOS.yangjiajie.src,
          credit: PHOTOS.yangjiajie.credit,
          license: PHOTOS.yangjiajie.license,
          source: PHOTOS.yangjiajie.source,
          day: "Day 3 · Morning",
          title: "Yangjiajie & Laowuchang: The Quiet Side of Wulingyuan",
          body: "A 16-kilometre ridge trail through Yangjiajie leads to the Natural Great Wall, a formation of parallel stone walls that no shuttle bus reaches. Laowuchang, reachable only on foot, opens onto the terraced farmland of Sky Garden and the rock spires known as Warriors' Gathering — both ranked among Zhangjiajie's ten finest views, yet rarely crowded. Our local partner chooses the exact route on the day, based on the season, the weather, and your group's pace.",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          day: "Day 3 · Evening",
          title: "Dinner at the Edge of the World",
          body: "A private meal, prepared with mountain-grown ingredients, served where the cliffs fall away into cloud — the stories of these mountains told by the one person who truly knows them.",
        },
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          variant: "full",
          day: "Day 4",
          title: "Zhangjiajie Grand Canyon: The Bridge Above the Clouds",
          body: "One of the world's longest and highest glass-bottomed bridges spans the canyon floor, roughly 300 metres below — a gentler final morning before the journey home, walked at whatever pace you choose.",
        },
      ],
    },
    signature: {
      eyebrow: "Why Book With Us",
      heading: "No Middleman Between You and Zhangjiajie",
      items: [
        {
          icon: Route,
          title: "Direct to Zhangjiajie",
          body: "You're booking directly with the team that runs your trip on the ground in Zhangjiajie — not a European agency that resells to a local partner. No relay, no markup, no itinerary lost in translation.",
        },
        {
          icon: Clock,
          title: "Timed to Perfection",
          body: "Every route timed around light, weather, and crowd patterns known only through years of local observation.",
        },
        {
          icon: UserCheck,
          title: "One Team, Start to Finish",
          body: "The people who answer your first message are the same people arranging your guide, driver, and hotel — nothing gets handed off along the way.",
        },
      ],
    },
    services: {
      eyebrow: "All-Inclusive",
      heading: "Every Detail, Arranged",
      note: "International and domestic flights to Zhangjiajie are not included — book your own arrival, and we take over the moment you land.",
      items: [
        { icon: Car, text: "Private vehicle & driver throughout your stay" },
        { icon: Users, text: "Dedicated bilingual guide, native to Zhangjiajie" },
        { icon: Hotel, text: "Curated boutique accommodation, 3 nights" },
        { icon: UtensilsCrossed, text: "All meals, including one private mountain-side dinner" },
        { icon: Umbrella, text: "Travel insurance included, arranged on your behalf" },
        { icon: ShieldCheck, text: "No hidden costs, no forced shopping, no group merging" },
      ],
    },
    trust: {
      eyebrow: "Trust & Assurance",
      title: "Every Journey, Thoughtfully Arranged",
      body: "Each itinerary is planned individually around your family — never a fixed template. We are BabyDuck Travel Co., Ltd. (贝贝鸭可爱旅游有限公司), based in Zhangjiajie, Hunan. Every journey includes travel insurance arranged on your behalf and 24-hour support from the moment you land.",
      story: {
        label: "A Sample Guest Story",
        quote: "We didn't expect to have Tianmen Cave to ourselves at sunrise — but there we were, just our family and our guide, watching the mist pull back from the door in the mountain. Three days later: dinner on a ridge that appears on no map we could find, listening to stories about these peaks no guidebook had told us. It never felt like a tour. It felt like being let in on something.",
        disclaimer: "Illustrative only — a real guest account will replace this once our first journeys depart.",
      },
      foundingNote: "First journeys departing [season] — be among our founding guests",
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
          body: "Booking your journey is simple: pay us by major credit card (Visa, Mastercard, Amex) through a secure international platform. Day-to-day spending in China is different — most local vendors, taxis, and small restaurants run on Alipay or WeChat Pay rather than cash or foreign cards. Both now accept international Visa/Mastercard, and we'll help you set one up before or upon arrival.",
        },
        {
          icon: Languages,
          title: "Language Support",
          body: "Guides are fluent in Mandarin and English. Support in other languages, including Italian, can be arranged for an additional fee via a specialized interpreter-guide, subject to availability.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Frequently Asked",
      items: [
        {
          q: "Is this trip suitable for families with children?",
          a: "This journey involves several hours of walking each day, including uneven mountain trails and steps. It's generally suitable for children aged 8 and above who are comfortable with moderate hiking. [Draft answer — to be confirmed]",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards (Visa, Mastercard, Amex) through a secure international third-party payment platform. A deposit secures your booking, with the balance due before departure.",
        },
        {
          q: "What is your cancellation policy?",
          a: "Cancellations are handled in accordance with China's statutory travel contract regulations. The refund amount depends on costs already committed on your behalf (hotel deposits, permits, guide bookings) at the time of cancellation — we'll confirm the exact terms for your dates when you book.",
        },
        {
          q: "Do your guides speak Italian?",
          a: "Our guides are fluent in Mandarin and English. Italian-speaking support can be arranged for an additional fee via a specialized interpreter-guide, subject to availability.",
        },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "What This Journey Costs",
      tiers: [
        { label: "Solo Traveler", price: "€2,850", unit: "per person" },
        { label: "2 Travelers", price: "€1,950", unit: "per person" },
        { label: "3–4 Travelers (Family)", price: "€1,450", unit: "per person" },
        { label: "5–6 Travelers (Small Group)", price: "€1,250", unit: "per person" },
      ],
      note: "Indicative pricing based on current market rates — confirmed after a short consultation, based on season and trail selection.",
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
      submitting: "Sending…",
      successTitle: "Thank You",
      successBody: "Your enquiry has been received. We will be in touch shortly.",
      errorBody: "Something went wrong sending your enquiry. Please try again, or email us directly at yalinggan911@gmail.com.",
    },
    footer: {
      operator: "Operated by BabyDuck Travel Co., Ltd. (贝贝鸭可爱旅游有限公司)",
      contact: "yalinggan911@gmail.com · No. 8 Erxiang, Yongding District, Zhangjiajie, Hunan, China",
      copyright: "© 2026 Hidden Trails Zhangjiajie",
    },
  },

  it: {
    nav: { cta: "Inizia il Tuo Viaggio" },
    hero: {
      title: "Dove il Sentiero Lascia la Mappa",
      subtitle:
        "Un viaggio privato di 4 giorni con una guida nativa, calibrato su luce e flussi turistici, su sentieri che non compaiono in nessuna app o guida — tutto il resto, organizzato per voi.",
      anchor:
        "Le stesse montagne che hanno ispirato un mondo che avete già visto sullo schermo — esplorate come quasi nessuno ha mai fatto.",
    },
    tripFacts: {
      items: [
        { icon: Calendar, label: "4 Giorni / 3 Notti" },
        { icon: Users, label: "Viaggio Privato, 1–6 Viaggiatori" },
        { icon: ShieldCheck, label: "Guida, Autista, Hotel e Pasti Inclusi" },
      ],
      priceLine: "A partire da €1.250 a persona",
    },
    breather: {
      line: "Sono le montagne a dettare i tempi. Noi abbiamo solo imparato, con gli anni, quando ascoltarle.",
    },
    whyZhangjiajie: {
      eyebrow: "Perché Zhangjiajie",
      heading: "Un Paesaggio Senza Eguali",
      items: [
        {
          icon: Mountain,
          gallery: [PHOTOS.pillars, PHOTOS.pillars2, PHOTOS.pillars3],
          title: "Pilastri che Non Esistono Altrove",
          body: "Migliaia di pilastri di arenaria quarzifera si ergono dal terreno forestale — una conformazione così unica che uno di essi è stato ufficialmente ribattezzato Avatar Hallelujah Mountain, dopo aver ispirato le montagne fluttuanti di Pandora.",
        },
        {
          icon: DoorOpen,
          gallery: [PHOTOS.tianmenCave, PHOTOS.tianmenCave2, PHOTOS.tianmenCave3],
          title: "Una Porta Scavata dalla Montagna Stessa",
          body: "La Grotta di Tianmen, il più alto arco naturale al mondo, si dice si sia aperta in un solo istante nel 263 d.C., quando una porzione della parete rocciosa crollò — una soglia che i locali chiamano ancora la porta tra i mondi. Dopo il tramonto, la stessa leggenda prende vita ai suoi piedi, nello spettacolo all'aperto Tianmen Fox Fairy.",
        },
        {
          icon: Landmark,
          gallery: [PHOTOS.wulingyuan, PHOTOS.wulingyuan2],
          title: "Un Paesaggio Patrimonio dell'UNESCO",
          body: "L'area panoramica di Wulingyuan, che comprende il Parco Forestale Nazionale di Zhangjiajie, è protetta come Patrimonio dell'Umanità dal 1992 — uno dei paesaggi di arenaria quarzifera più rari al mondo.",
        },
      ],
    },
    bestTimeToVisit: {
      eyebrow: "Periodo Migliore per Visitare",
      heading: "Scegliete il Vostro Zhangjiajie",
      intro:
        "Ogni stagione mostra queste montagne in modo diverso. Vi aiuteremo a scegliere le date più adatte a ciò che desiderate dal viaggio.",
      seasons: [
        {
          icon: Flower2,
          photo: { src: IMG_PEAKS, alt: "Le vette di Zhangjiajie in primavera" },
          label: "Primavera",
          months: "Marzo – Maggio",
          tag: "Ideale per Fotografia",
          body: "Cieli tersi, temperature miti e fiori selvatici lungo i sentieri più bassi — una delle due finestre migliori per vedute nitide e distanti.",
        },
        {
          icon: CloudRain,
          photo: PHOTOS.seasonMisty,
          label: "Estate",
          months: "Giugno – Agosto",
          tag: "Stagione delle Piogge",
          body: "Caldo e umido, con nebbia frequente e nuvole basse. Suggestivo per fotografare le vette che emergono dalla foschia, ma la visibilità può essere limitata.",
        },
        {
          icon: Leaf,
          photo: { src: IMG_CLIFF, alt: "Il canyon di Zhangjiajie in autunno" },
          label: "Autunno",
          months: "Settembre – Novembre",
          tag: "Il Migliore in Assoluto",
          body: "L'aria più limpida dell'anno, temperature piacevoli e foliage dorato sui pendii più bassi — la prima scelta della maggior parte dei viaggiatori.",
        },
        {
          icon: Snowflake,
          photo: { src: IMG_VALLEY, alt: "La valle di Zhangjiajie in inverno" },
          label: "Inverno",
          months: "Dicembre – Febbraio",
          tag: "Stagione Tranquilla",
          body: "Più freddo, con occasionali spolverate di neve sulle vette più alte e visitatori nettamente inferiori — una versione più essenziale e silenziosa dello stesso paesaggio.",
        },
      ],
    },
    journey: {
      eyebrow: "Il Viaggio",
      heading: "Quattro Giorni, Cinque Momenti",
      stops: [
        {
          img: IMG_PEAKS,
          variant: "full",
          day: "Giorno 1",
          title: "Monte Tianmen: La Porta che si Aprì da Sola",
          body: "La leggenda narra che questa montagna si sia aperta in un solo istante — una porta che il cielo scelse di aprire, non che l'uomo costruì. Dopo il tramonto, la stessa leggenda prende vita sul palco ai piedi della montagna, nello spettacolo Tianmen Fox Fairy — una rappresentazione all'aperto dello spirito volpe che, si narra, attraversò quella porta per entrare nel mondo degli uomini. Di giorno, la attraverserete voi stessi: attraverso un passaggio noto solo ai locali, nell'unica ora in cui appartiene solo a voi.",
        },
        {
          img: IMG_CLIFF,
          day: "Giorno 2",
          title: "Parco Forestale Nazionale di Zhangjiajie: Il Belvedere Vuoto",
          before: "Queste vette hanno impiegato ",
          emphasis: "380 milioni di anni",
          after:
            " a diventare ciò che sono. La maggior parte dei visitatori le osserva per il tempo di una fotografia. Attraverso sentieri noti solo ai locali, calibrati sull'unica ora in cui luce e flussi turistici giocano a vostro favore, le avrete tutte per voi molto più a lungo.",
        },
        {
          img: PHOTOS.yangjiajie.src,
          credit: PHOTOS.yangjiajie.credit,
          license: PHOTOS.yangjiajie.license,
          source: PHOTOS.yangjiajie.source,
          day: "Giorno 3 · Mattina",
          title: "Yangjiajie e Laowuchang: Il Lato Tranquillo di Wulingyuan",
          body: "Un sentiero di cresta di 16 chilometri attraverso Yangjiajie conduce alla Grande Muraglia Naturale, una formazione di pareti di roccia parallele non raggiungibile in navetta. Laowuchang, accessibile solo a piedi, si apre sulle terrazze coltivate del Giardino Sospeso e sulle guglie rocciose note come il Raduno dei Guerrieri — entrambi tra i dieci panorami più belli di Zhangjiajie, eppure raramente affollati. Il nostro partner locale sceglie il percorso esatto il giorno stesso, in base alla stagione, al meteo e al ritmo del vostro gruppo.",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          day: "Giorno 3 · Sera",
          title: "Cena ai Confini del Mondo",
          body: "Un pasto privato, preparato con ingredienti di montagna, servito dove le scogliere si perdono tra le nuvole — le storie di queste montagne raccontate da chi le conosce davvero.",
        },
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          variant: "full",
          day: "Giorno 4",
          title: "Grand Canyon di Zhangjiajie: Il Ponte Sopra le Nuvole",
          body: "Uno dei ponti di vetro più lunghi e alti al mondo attraversa il canyon, a circa 300 metri dal fondovalle — un'ultima mattinata più rilassata prima del viaggio di ritorno, percorsa al ritmo che preferite.",
        },
      ],
    },
    signature: {
      eyebrow: "Perché Prenotare con Noi",
      heading: "Nessun Intermediario tra Voi e Zhangjiajie",
      items: [
        {
          icon: Route,
          title: "Direttamente a Zhangjiajie",
          body: "State prenotando direttamente con il team che gestisce il vostro viaggio sul posto a Zhangjiajie — non un'agenzia europea che rivende a un partner locale. Nessun passaggio intermedio, nessun sovrapprezzo, nessun itinerario perso nella traduzione.",
        },
        {
          icon: Clock,
          title: "Un Tempismo Perfetto",
          body: "Ogni percorso calibrato su luce, meteo e flussi turistici, conosciuti solo dopo anni di osservazione locale.",
        },
        {
          icon: UserCheck,
          title: "Un Solo Team, dall'Inizio alla Fine",
          body: "Le persone che rispondono al vostro primo messaggio sono le stesse che organizzano la vostra guida, l'autista e l'hotel — nulla viene passato di mano in mano lungo il percorso.",
        },
      ],
    },
    services: {
      eyebrow: "Tutto Incluso",
      heading: "Ogni Dettaglio, Curato",
      note: "I voli internazionali e nazionali per Zhangjiajie non sono inclusi — prenotate autonomamente il vostro arrivo: dal momento in cui atterrate, ci occupiamo di tutto noi.",
      items: [
        { icon: Car, text: "Veicolo privato e autista per tutto il soggiorno" },
        { icon: Users, text: "Guida bilingue dedicata, nativa di Zhangjiajie" },
        { icon: Hotel, text: "Alloggio boutique selezionato, 3 notti" },
        { icon: UtensilsCrossed, text: "Tutti i pasti, inclusa una cena privata in montagna" },
        { icon: Umbrella, text: "Assicurazione di viaggio inclusa, organizzata per voi" },
        { icon: ShieldCheck, text: "Nessun costo nascosto, nessuno shopping forzato, nessun gruppo misto" },
      ],
    },
    trust: {
      eyebrow: "Fiducia e Garanzie",
      title: "Ogni Viaggio, Curato con Attenzione",
      body: "Ogni itinerario è pianificato individualmente attorno alla vostra famiglia — mai un modello fisso. Siamo BabyDuck Travel Co., Ltd. (贝贝鸭可爱旅游有限公司), con sede a Zhangjiajie, Hunan. Ogni viaggio include un'assicurazione di viaggio organizzata per voi e assistenza 24 ore su 24 dal momento in cui atterrate.",
      story: {
        label: "Una Storia di Esempio",
        quote: "Non ci aspettavamo di avere la Grotta di Tianmen tutta per noi all'alba — eppure eravamo lì, solo la nostra famiglia e la nostra guida, a guardare la nebbia ritirarsi da quella porta tra le montagne. Tre giorni dopo, una cena su una cresta che non compare su nessuna mappa che abbiamo trovato, ad ascoltare storie su queste vette che nessuna guida avrebbe potuto raccontarci. Non è mai sembrato un tour. È sembrato essere ammessi in qualcosa.",
        disclaimer: "Solo a scopo illustrativo — sarà sostituita da un racconto reale non appena partiranno i primi viaggi.",
      },
      foundingNote: "Prime partenze [stagione] — tra i nostri primi ospiti",
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
          body: "Prenotare il viaggio è semplice: pagateci con la vostra carta di credito principale (Visa, Mastercard, Amex) tramite una piattaforma internazionale sicura. La spesa quotidiana in Cina è diversa — la maggior parte dei negozi locali, taxi e piccoli ristoranti funzionano con Alipay o WeChat Pay piuttosto che contanti o carte straniere. Entrambi ora accettano carte Visa/Mastercard internazionali collegate, e vi aiuteremo a configurarne una prima o all'arrivo.",
        },
        {
          icon: Languages,
          title: "Supporto Linguistico",
          body: "Le guide parlano correntemente mandarino e inglese. Il supporto in altre lingue, incluso l'italiano, può essere organizzato con un costo aggiuntivo tramite una guida-interprete specializzata, in base alla disponibilità.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Domande Frequenti",
      items: [
        {
          q: "Questo viaggio è adatto a famiglie con bambini?",
          a: "Questo viaggio prevede diverse ore di cammino al giorno, inclusi sentieri di montagna e scalinate irregolari. È generalmente adatto a bambini dagli 8 anni in su, a proprio agio con un'escursione di intensità moderata. [Bozza — da confermare]",
        },
        {
          q: "Quali metodi di pagamento accettate?",
          a: "Accettiamo le principali carte di credito (Visa, Mastercard, Amex) tramite una piattaforma di pagamento internazionale di terze parti sicura. Un acconto conferma la prenotazione, con il saldo dovuto prima della partenza.",
        },
        {
          q: "Qual è la vostra politica di cancellazione?",
          a: "Le cancellazioni sono gestite in conformità con la normativa cinese sui contratti di viaggio. L'importo del rimborso dipende dai costi già impegnati per voi (depositi alberghieri, permessi, prenotazione della guida) al momento della cancellazione — vi confermeremo i termini esatti per le vostre date al momento della prenotazione.",
        },
        {
          q: "Le vostre guide parlano italiano?",
          a: "Le nostre guide parlano correntemente mandarino e inglese. Il supporto in italiano può essere organizzato con un costo aggiuntivo tramite una guida-interprete specializzata, in base alla disponibilità.",
        },
      ],
    },
    pricing: {
      eyebrow: "Prezzi",
      heading: "Quanto Costa Questo Viaggio",
      tiers: [
        { label: "Viaggiatore Singolo", price: "€2.850", unit: "a persona" },
        { label: "2 Viaggiatori", price: "€1.950", unit: "a persona" },
        { label: "3–4 Viaggiatori (Famiglia)", price: "€1.450", unit: "a persona" },
        { label: "5–6 Viaggiatori (Piccolo Gruppo)", price: "€1.250", unit: "a persona" },
      ],
      note: "Prezzi indicativi basati sulle tariffe di mercato attuali — confermati dopo una breve consulenza, in base alla stagione e ai sentieri scelti.",
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
      submitting: "Invio in corso…",
      successTitle: "Grazie",
      successBody: "La vostra richiesta è stata ricevuta. Vi contatteremo a breve.",
      errorBody: "Si è verificato un errore nell'invio della richiesta. Riprovate, oppure scriveteci direttamente a yalinggan911@gmail.com.",
    },
    footer: {
      operator: "Gestito da BabyDuck Travel Co., Ltd. (贝贝鸭可爱旅游有限公司)",
      contact: "yalinggan911@gmail.com · No. 8 Erxiang, Distretto di Yongding, Zhangjiajie, Hunan, Cina",
      copyright: "© 2026 Hidden Trails Zhangjiajie",
    },
  },

  zh: {
    nav: { cta: "开启旅程" },
    hero: {
      title: "小径离开地图之处，旅程开始",
      subtitle: "为期四天的私人行程，由本地向导全程陪同，行程时机避开人流与光线不佳的时段，走的是任何软件、攻略都查不到的小径——其余的一切，都由我们安排好。",
      anchor: "这里正是您曾在银幕上见过的那个世界的灵感之源——以几乎无人能及的方式深入探索。",
    },
    tripFacts: {
      items: [
        { icon: Calendar, label: "4天3晚" },
        { icon: Users, label: "私人团，1-6人" },
        { icon: ShieldCheck, label: "向导、司机、酒店、餐饮全包" },
      ],
      priceLine: "每人价格自 €1,250 起",
    },
    breather: {
      line: "从来不是我们安排大山的日程，而是这些年，我们学会了在对的时刻聆听它。",
    },
    whyZhangjiajie: {
      eyebrow: "为什么是张家界",
      heading: "举世无双的地貌",
      items: [
        {
          icon: Mountain,
          gallery: [PHOTOS.pillars, PHOTOS.pillars2, PHOTOS.pillars3],
          title: "绝无仅有的峰林",
          body: "数千座石英砂岩峰柱拔地而起——如此独特的地貌，其中一座更因启发了《阿凡达》潘多拉星球的悬浮山，而被正式更名为「阿凡达·哈利路亚山」。",
        },
        {
          icon: DoorOpen,
          gallery: [PHOTOS.tianmenCave, PHOTOS.tianmenCave2, PHOTOS.tianmenCave3],
          title: "山体自行开凿的门",
          body: "天门洞是世界上已知海拔最高的天然穿山溶洞，相传于公元263年山体崩裂的瞬间豁然洞开——当地人至今仍称它为通往异界的门。入夜后，同一个传说会在洞前的《天门狐仙》实景演出中重新上演。",
        },
        {
          icon: Landmark,
          gallery: [PHOTOS.wulingyuan, PHOTOS.wulingyuan2],
          title: "世界自然遗产地貌",
          body: "武陵源风景名胜区（含张家界国家森林公园）自1992年起被列入世界自然遗产名录——是地球上最稀有的石英砂岩峰林地貌之一。",
        },
      ],
    },
    bestTimeToVisit: {
      eyebrow: "最佳出行季节",
      heading: "选择您的张家界",
      intro: "每个季节呈现的张家界都不尽相同。我们会根据您最看重的体验，帮您选择合适的出行日期。",
      seasons: [
        {
          icon: Flower2,
          photo: { src: IMG_PEAKS, alt: "春日光线下的张家界山峰" },
          label: "春季",
          months: "3月 – 5月",
          tag: "拍照绝佳",
          body: "天气晴朗，气温宜人，低海拔小径野花盛开——是全年两个最佳观景窗口期之一。",
        },
        {
          icon: CloudRain,
          photo: PHOTOS.seasonMisty,
          label: "夏季",
          months: "6月 – 8月",
          tag: "雨季",
          body: "温暖潮湿，云雾天气频繁。山峰在云海中若隐若现，别有意境，但能见度可能受限。",
        },
        {
          icon: Leaf,
          photo: { src: IMG_CLIFF, alt: "秋日的张家界峡谷" },
          label: "秋季",
          months: "9月 – 11月",
          tag: "全年首选",
          body: "全年空气最通透的季节，气温舒适，低海拔山坡层林尽染——大多数游客的第一选择。",
        },
        {
          icon: Snowflake,
          photo: { src: IMG_VALLEY, alt: "冬日的张家界山谷" },
          label: "冬季",
          months: "12月 – 2月",
          tag: "静谧时节",
          body: "气温较低，高海拔山峰偶有薄雪，游客明显减少——呈现同一片风景更清冷、更静谧的一面。",
        },
      ],
    },
    journey: {
      eyebrow: "旅程",
      heading: "四天，五个瞬间",
      stops: [
        {
          img: IMG_PEAKS,
          variant: "full",
          day: "第1天",
          title: "天门山：自己裂开的门",
          body: "传说这座山曾在瞬间自行裂开——那是上天选择开启的门，而非人工凿成。入夜后，同一个传说会在山脚下的《天门狐仙》实景演出中重现——讲述那只据说曾穿过此门、来到人间的狐仙的故事。白天，您将亲自穿过它——通过一条只有本地人知晓的通道，在那唯独属于您的一个时刻。",
        },
        {
          img: IMG_CLIFF,
          day: "第2天",
          title: "张家界国家森林公园：无人的观景台",
          before: "这些山峰历经了",
          emphasis: "3.8亿年",
          after:
            "才形成今日的模样。大多数游客只用拍一张照片的时间看它们一眼。而通过只有本地人才走的小径，在光线与人流恰好对您有利的那一个小时，您将拥有它们更久的独享时光。",
        },
        {
          img: PHOTOS.yangjiajie.src,
          credit: PHOTOS.yangjiajie.credit,
          license: PHOTOS.yangjiajie.license,
          source: PHOTOS.yangjiajie.source,
          day: "第3天 · 上午",
          title: "杨家界与老屋场：武陵源清净的一面",
          body: "杨家界16公里的山脊小径通向天然长城——由平行石墙构成的地质奇观，观光车无法到达。老屋场则只能徒步抵达，可见「空中田园」的层叠梯田与「神兵聚会」石峰群——两处都位列「张家界十大名景」，却鲜有人潮。具体路线由地接社根据当季情况、天气与您团队的体力水平，现场为您安排。",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          day: "第3天 · 晚间",
          title: "天涯尽头的晚宴",
          body: "一场私人晚宴，选用山间食材烹制，设于云雾漫过悬崖的边缘——由唯一真正了解这片山脉的人，为您讲述它的故事。",
        },
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          variant: "full",
          day: "第4天",
          title: "张家界大峡谷：云端之上的桥",
          body: "世界上最长、最高的玻璃桥之一横跨峡谷，距谷底约300米——在归程之前，以您喜欢的节奏，度过一个更从容的最后清晨。",
        },
      ],
    },
    signature: {
      eyebrow: "为什么选择我们",
      heading: "您和张家界之间，没有中间商",
      items: [
        {
          icon: Route,
          title: "直连张家界，没有中间商",
          body: "您现在联系的，就是实际在张家界为您安排行程的团队——不是把您的需求转包给地接社的欧洲旅行社。少一层转包，少一层信息失真，也少一层加价。",
        },
        {
          icon: Clock,
          title: "精准择时",
          body: "每一条路线的时间安排，都基于多年本地观察积累的光线、天气与人流规律。",
        },
        {
          icon: UserCheck,
          title: "从咨询到落地，同一个团队",
          body: "回复您咨询的人，和安排向导、司机、酒店的人是同一拨人——不会在中途被转手。",
        },
      ],
    },
    services: {
      eyebrow: "全包服务",
      heading: "每个细节，皆已安排",
      note: "往返及国内段机票不包含在内——请自行预订抵达张家界的行程，落地后的一切由我们全权负责。",
      items: [
        { icon: Car, text: "全程私人专车及司机" },
        { icon: Users, text: "专属双语向导，土生土长的张家界人" },
        { icon: Hotel, text: "三晚精心挑选的精品住宿" },
        { icon: UtensilsCrossed, text: "全程餐饮，包含一场私人山间晚宴" },
        { icon: Umbrella, text: "包含旅行保险，由我们统一为您安排" },
        { icon: ShieldCheck, text: "无隐藏消费、无强制购物、无拼团合并" },
      ],
    },
    trust: {
      eyebrow: "信任与保障",
      title: "每一程旅途，皆用心安排",
      body: "每一份行程都为您的家庭单独规划——从不是套用模板。我们是贝贝鸭可爱旅游有限公司（BabyDuck Travel Co., Ltd.），总部位于湖南张家界。每一程旅途都包含由我们统一安排的旅行保险，并提供落地后的24小时支持。",
      story: {
        label: "示例客户故事",
        quote: "我们没想到能在日出时分独享天门洞——但那天真的只有我们一家和向导，看着晨雾从山间那扇「门」缓缓散去。三天后，我们在一处任何地图都找不到的山脊上共进晚餐，听着这些山峰的故事，是任何攻略都写不出来的。这从来不像是一次跟团游，倒像是被邀请走进了什么秘密。",
        disclaimer: "仅为示例——首批旅程正式出发后，将替换为真实客户的分享。",
      },
      foundingNote: "首批旅程将于[季节]启程——成为我们的首批贵宾",
    },
    beforeYouArrive: {
      eyebrow: "行前须知",
      lead: "启程之前，有几件事值得您先了解。",
      items: [
        {
          icon: FileCheck,
          title: "无需签证",
          body: "意大利护照持有人可凭免签政策入境中国，停留最长30天——完全覆盖本次行程时长。只需护照在抵达之日起有效期满六个月以上即可。",
        },
        {
          icon: CreditCard,
          title: "支付，全程代劳",
          body: "预订行程很简单：通过安全的国际支付平台，用主流信用卡（Visa、Mastercard、运通等）支付给我们即可。但在中国境内的日常消费不一样——大多数本地商户、出租车和小餐馆使用支付宝或微信支付，而非现金或境外银行卡。这两个平台现在都支持绑定国际维萨/万事达信用卡，我们会在出发前或抵达后帮您完成设置。",
        },
        {
          icon: Languages,
          title: "语言支持",
          body: "向导精通普通话和英语。如需其他语言（包括意大利语）支持，可加价安排专职翻译向导，视具体情况而定。",
        },
      ],
    },
    faq: {
      eyebrow: "常见问题",
      heading: "常见问题解答",
      items: [
        {
          q: "这次旅程适合带孩子的家庭吗？",
          a: "本次旅程每天包含数小时步行，涉及不平整的山路和台阶，通常适合8岁以上、能够适应中等强度徒步的儿童。[草拟答案 — 待确认]",
        },
        {
          q: "你们接受哪些付款方式？",
          a: "我们通过安全的国际第三方支付平台接受主流信用卡（Visa、Mastercard、运通等）付款。预订需支付定金，尾款于出发前结清。",
        },
        {
          q: "取消政策是怎样的？",
          a: "取消政策按照国家相关旅游合同法规执行。退款金额将根据取消时已为您支付的成本（酒店定金、门票预订、向导安排等）确定——具体条款会在您预订时为您确认。",
        },
        {
          q: "向导会说意大利语吗？",
          a: "我们的向导精通普通话和英语。如需意大利语支持，可加价安排专职翻译向导，视具体情况而定。",
        },
      ],
    },
    pricing: {
      eyebrow: "价格",
      heading: "旅程费用",
      tiers: [
        { label: "单人出行", price: "€2,850", unit: "每人" },
        { label: "2人结伴", price: "€1,950", unit: "每人" },
        { label: "3-4人（家庭）", price: "€1,450", unit: "每人" },
        { label: "5-6人（小团）", price: "€1,250", unit: "每人" },
      ],
      note: "以上为参考市场价，最终价格将根据季节及路线选择，在简短咨询后确认。",
    },
    enquiry: {
      eyebrow: "咨询",
      title: "开启旅程",
      labels: {
        name: "姓名",
        email: "邮箱",
        dates: "预计出行日期",
        travelers: "出行人数",
        message: "留言",
      },
      submit: "提交咨询",
      submitting: "发送中…",
      successTitle: "感谢您的咨询",
      successBody: "我们已收到您的咨询，将尽快与您联系。",
      errorBody: "提交咨询时出现问题，请重试，或直接发邮件到 yalinggan911@gmail.com 联系我们。",
    },
    footer: {
      operator: "运营主体：贝贝鸭可爱旅游有限公司（BabyDuck Travel Co., Ltd.）",
      contact: "yalinggan911@gmail.com · 湖南省张家界市永定区二巷8号",
      copyright: "© 2026 隐山小径 张家界",
    },
  },
};

// ---------------------------------------------------------------------------
// Language context
// ---------------------------------------------------------------------------
const LANGS = ["en", "zh", "it"];
const LangContext = createContext({ lang: "en", t: content.en, setLang: () => {} });
const useLang = () => useContext(LangContext);

function headingFont(lang) {
  return lang === "zh" ? "'Noto Serif SC', serif" : "'Playfair Display', serif";
}
function bodyFont(lang) {
  return lang === "zh" ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif";
}

// ---------------------------------------------------------------------------
// Lightbox — a full-screen "photo exhibition" viewer. Each opener passes a
// `gallery` array (currently one photo per landmark, since that's all we have
// licensed today) plus a title; wired for multiple photos so gallery arrays
// can simply grow to 2+ images later without any other code changing.
// ---------------------------------------------------------------------------
const LightboxContext = createContext({ open: () => {} });
const useLightbox = () => useContext(LightboxContext);

function Lightbox({ state, onClose, onNav }) {
  const { gallery, index, title } = state;
  if (!gallery) return null;
  const photo = gallery[index];
  const hasMultiple = gallery.length > 1;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center px-4 py-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
      >
        <X size={28} strokeWidth={1.2} />
      </button>

      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          aria-label="Previous photo"
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft size={36} strokeWidth={1} />
        </button>
      )}

      <img
        src={photo.src}
        alt={photo.alt || title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[75vh] max-w-full md:max-w-[85vw] object-contain"
      />

      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          aria-label="Next photo"
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight size={36} strokeWidth={1} />
        </button>
      )}

      <div className="mt-5 text-center max-w-xl px-4" onClick={(e) => e.stopPropagation()}>
        {title && <p className="text-[#F9F9F9] text-sm md:text-base mb-1">{title}</p>}
        {photo.credit && (
          <a
            href={photo.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            © {photo.credit} · {photo.license}
          </a>
        )}
        {hasMultiple && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {gallery.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === index ? "bg-[#C5A059]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LightboxProvider({ children }) {
  const [state, setState] = useState({ gallery: null, index: 0, title: "" });

  const open = (gallery, title, index = 0) => setState({ gallery, index, title });
  const close = () => setState({ gallery: null, index: 0, title: "" });
  const nav = (dir) =>
    setState((s) => ({
      ...s,
      index: (s.index + dir + s.gallery.length) % s.gallery.length,
    }));

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state.gallery && <Lightbox state={state} onClose={close} onNav={nav} />}
    </LightboxContext.Provider>
  );
}

// A small "view larger" hint shown on hover over any gallery-enabled photo
function ExpandHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors cursor-pointer group">
      <Maximize2
        className="text-white opacity-0 group-hover:opacity-90 transition-opacity"
        size={22}
        strokeWidth={1.3}
      />
    </div>
  );
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
// Language toggle
// ---------------------------------------------------------------------------
const LANG_LABELS = { en: "EN", zh: "中文", it: "IT" };

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="flex items-center gap-1.5 text-xs tracking-[0.15em]"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="text-stone-600">/</span>}
          <button
            onClick={() => setLang(code)}
            className={`transition-colors ${
              lang === code ? "text-[#C5A059]" : "text-stone-300 hover:text-[#C5A059]"
            }`}
          >
            {LANG_LABELS[code]}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useLang();

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
          style={{ fontFamily: headingFont(lang) }}
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
  const { t, lang } = useLang();
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
          style={{ fontFamily: headingFont(lang) }}
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
// Trip Facts — a scannable spec strip so a first-time reader knows exactly
// what's being sold (duration, group size, inclusions, price) before any of
// the mood/differentiation copy that follows.
// ---------------------------------------------------------------------------
function TripFacts() {
  const { t } = useLang();
  return (
    <section className="bg-[#0d0d0d] border-b border-stone-800 py-8 px-6">
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {t.tripFacts.items.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Icon className="text-[#C5A059] shrink-0" size={20} strokeWidth={1.3} />
              <span className="text-stone-300 text-xs md:text-sm whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
        <div className="text-[#C5A059] text-sm md:text-base tracking-wide whitespace-nowrap">
          {t.tripFacts.priceLine}
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Attributed photo — real Wikimedia Commons photography with a credit caption
// ---------------------------------------------------------------------------
function AttributedPhoto({ gallery, title, className = "" }) {
  const { open } = useLightbox();
  const photo = gallery[0];
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-stone-900 cursor-pointer ${className}`}
      onClick={() => open(gallery, title)}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <ExpandHint />
      {gallery.length > 1 && (
        <span className="absolute top-2 left-2 text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {gallery.length} photos
        </span>
      )}
      {photo.credit && (
        <a
          href={photo.source}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-1.5 right-2 text-[10px] text-white/60 hover:text-white/90 transition-colors"
        >
          © {photo.credit} · {photo.license}
        </a>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Breather — a full-bleed photo pause between the "why us" and "why here"
// sections, letting the landscape carry the transition instead of more copy
// ---------------------------------------------------------------------------
function Breather() {
  const { t } = useLang();
  return (
    <section className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden bg-[#111111]">
      <img
        src={IMG_CLIFF}
        alt="Cliffs and mist over the Zhangjiajie canyon"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 h-full flex items-center justify-center text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#F9F9F9] text-lg md:text-2xl italic max-w-xl leading-[1.7]">
          {t.breather.line}
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Why Zhangjiajie — the geography and legend that make this place distinct
// ---------------------------------------------------------------------------
function WhyZhangjiajie() {
  const { t, lang } = useLang();
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
          {t.whyZhangjiajie.eyebrow}
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl"
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.whyZhangjiajie.heading}
        </h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.whyZhangjiajie.items.map(({ icon: Icon, gallery, title, body }, i) => (
          <motion.div key={i} variants={fadeUp}>
            <AttributedPhoto gallery={gallery} title={title} className="mb-6" />
            <div className="px-2">
              <Icon className="mb-4 text-[#C5A059]" size={26} strokeWidth={1.2} />
              <h3
                className="text-[#111111] text-lg mb-3"
                style={{ fontFamily: headingFont(lang) }}
              >
                {title}
              </h3>
              <p className="text-stone-500 text-sm leading-[1.7]">{body}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Best Time to Visit — seasonal planning, its own dedicated section
// ---------------------------------------------------------------------------
const MONTH_SEASON = [
  "winter", "winter", "spring", "spring", "spring", "summer",
  "summer", "summer", "autumn", "autumn", "autumn", "winter",
];
const SEASON_BAR_STYLE = {
  spring: "bg-[#C5A059]/30",
  summer: "bg-stone-700",
  autumn: "bg-[#C5A059]",
  winter: "bg-stone-300",
};

function BestTimeToVisit() {
  const { t, lang } = useLang();
  return (
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6 border-t border-stone-200">
      <motion.div
        className="max-w-2xl mx-auto text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.bestTimeToVisit.eyebrow}
        </p>
        <h2
          className="text-[#111111] text-3xl md:text-4xl mb-5"
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.bestTimeToVisit.heading}
        </h2>
        <p className="text-stone-500 text-sm md:text-base leading-[1.7]">
          {t.bestTimeToVisit.intro}
        </p>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.bestTimeToVisit.seasons.map(({ icon: Icon, photo, label, months, tag, body }, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center px-2">
            <AttributedPhoto gallery={[photo]} title={label} className="mb-5" />
            <Icon className="mx-auto mb-5 text-[#C5A059]" size={30} strokeWidth={1.2} />
            <h3
              className="text-[#111111] text-lg mb-1"
              style={{ fontFamily: headingFont(lang) }}
            >
              {label}
            </h3>
            <p className="text-stone-400 text-xs uppercase tracking-wider mb-3">{months}</p>
            <span className="inline-block text-[10px] uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/40 rounded-full px-3 py-1 mb-4">
              {tag}
            </span>
            <p className="text-stone-500 text-sm leading-[1.7]">{body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className="flex gap-0.5 h-3">
          {MONTH_SEASON.map((season, i) => (
            <div key={i} className={`flex-1 ${SEASON_BAR_STYLE[season]}`} />
          ))}
        </div>
        <div className="flex justify-between text-stone-400 text-[10px] uppercase tracking-wider mt-2">
          <span>Jan</span>
          <span>Apr</span>
          <span>Jul</span>
          <span>Oct</span>
          <span>Dec</span>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 4. The Journey — alternating image/text blocks
// ---------------------------------------------------------------------------
function JourneySection() {
  const { t, lang } = useLang();
  const { open } = useLightbox();
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
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.journey.heading}
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 space-y-20 md:space-y-32">
        {t.journey.stops.map((stop, i) => {
          if (stop.variant === "full") {
            return (
              <div key={i} className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
                <div
                  className="relative h-[60vh] md:h-[75vh] overflow-hidden cursor-pointer"
                  onClick={() => open([{ src: stop.img, alt: stop.title }], stop.title)}
                >
                  <img
                    src={stop.img}
                    alt={stop.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover ${
                      stop.imgPosition || ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-5 right-5 flex items-center gap-1.5 text-white/70 text-xs uppercase tracking-wider">
                    <Maximize2 size={14} strokeWidth={1.3} />
                  </div>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                  >
                    {stop.day && (
                      <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
                        {stop.day}
                      </p>
                    )}
                    <h3
                      className="text-[#F9F9F9] text-3xl md:text-5xl mb-5 max-w-2xl"
                      style={{ fontFamily: headingFont(lang) }}
                    >
                      {stop.title}
                    </h3>
                    <p className="text-stone-200 text-base md:text-lg leading-[1.8] max-w-xl">
                      {stop.body}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          }

          return (
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
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-stone-900 cursor-pointer"
                  onClick={() =>
                    open(
                      [
                        {
                          src: stop.img,
                          alt: stop.title,
                          credit: stop.credit,
                          license: stop.license,
                          source: stop.source,
                        },
                      ],
                      stop.title
                    )
                  }
                >
                  <img
                    src={stop.img}
                    alt={stop.title}
                    loading="lazy"
                    className={`w-full h-full object-cover ${stop.imgPosition || ""}`}
                  />
                  <ExpandHint />
                  {stop.credit && (
                    <a
                      href={stop.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-1.5 right-2 text-[10px] text-white/60 hover:text-white/90 transition-colors"
                    >
                      © {stop.credit} · {stop.license}
                    </a>
                  )}
                </div>
              </motion.div>
              <motion.div
                className="w-full md:w-1/2 text-center md:text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                {stop.day && (
                  <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-3">
                    {stop.day}
                  </p>
                )}
                <h3
                  className="text-[#F9F9F9] text-2xl md:text-3xl mb-4"
                  style={{ fontFamily: headingFont(lang) }}
                >
                  {stop.title}
                </h3>
                <p className="text-stone-400 text-base leading-[1.8]">
                  {stop.emphasis ? (
                    <>
                      {stop.before}
                      <span
                        className="text-[#C5A059] text-lg md:text-xl"
                        style={{ fontFamily: headingFont(lang) }}
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
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 5. Signature Experience — differentiators
// ---------------------------------------------------------------------------
function SignatureExperience() {
  const { t, lang } = useLang();
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
          style={{ fontFamily: headingFont(lang) }}
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
              style={{ fontFamily: headingFont(lang) }}
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
  const { t, lang } = useLang();
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
          className="text-[#F9F9F9] text-3xl md:text-4xl mb-4"
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.services.heading}
        </h2>
        {t.services.note && (
          <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto">{t.services.note}</p>
        )}
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
  const { t, lang } = useLang();
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
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.trust.title}
        </h2>
        <p className="text-stone-500 text-sm md:text-base leading-[1.8] max-w-xl mx-auto">
          {t.trust.body}
        </p>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="bg-white border border-stone-200 px-8 py-10 md:px-12 md:py-12">
          <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-5">
            {t.trust.story.label}
          </p>
          <p
            className="text-[#111111] text-lg md:text-xl leading-[1.8] italic mb-6"
            style={{ fontFamily: headingFont(lang) }}
          >
            "{t.trust.story.quote}"
          </p>
          <div className="border-t border-stone-200 pt-4">
            <p className="text-stone-400 text-[11px] uppercase tracking-wider leading-[1.6]">
              {t.trust.story.disclaimer}
            </p>
          </div>
        </div>
        <p className="text-center text-stone-500 text-sm italic mt-8">{t.trust.foundingNote}</p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 8. Before You Arrive
// ---------------------------------------------------------------------------
function BeforeYouArrive() {
  const { t, lang } = useLang();
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
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.beforeYouArrive.eyebrow}
        </h2>
        <p className="text-stone-400 text-sm md:text-base">{t.beforeYouArrive.lead}</p>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {t.beforeYouArrive.items.map(({ icon: Icon, title, body }, i) => (
          <motion.div key={i} variants={fadeUp} className="border border-stone-800 px-6 py-10">
            <Icon className="mb-5 text-[#C5A059]" size={28} strokeWidth={1.2} />
            <h3
              className="text-[#F9F9F9] text-lg mb-3"
              style={{ fontFamily: headingFont(lang) }}
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
  const { t, lang } = useLang();
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
            style={{ fontFamily: headingFont(lang) }}
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
  const { t, lang } = useLang();
  return (
    <section className="bg-[#111111] py-24 md:py-28 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <p className="text-[#C5A059] text-xs tracking-[0.3em] uppercase mb-4">
          {t.pricing.eyebrow}
        </p>
        <h2
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.pricing.heading}
        </h2>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800 mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {t.pricing.tiers.map((tier, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="bg-[#111111] px-6 py-10 text-center"
          >
            <p className="text-stone-500 text-xs uppercase tracking-wider mb-4">{tier.label}</p>
            <p
              className="text-[#C5A059] text-3xl mb-1"
              style={{ fontFamily: headingFont(lang) }}
            >
              {tier.price}
            </p>
            <p className="text-stone-500 text-xs">{tier.unit}</p>
          </motion.div>
        ))}
      </motion.div>

      <p className="max-w-xl mx-auto text-center text-stone-500 text-xs md:text-sm tracking-wide">
        {t.pricing.note}
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 11. Enquiry Section
// ---------------------------------------------------------------------------
function EnquirySection() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: "",
    travelers: "",
    message: "",
    website: "", // honeypot — real visitors never see or fill this
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send enquiry.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(t.enquiry.errorBody);
    } finally {
      setSubmitting(false);
    }
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
            style={{ fontFamily: headingFont(lang) }}
          >
            {t.enquiry.title}
          </h2>
        </div>

        {submitted ? (
          <div className="border border-[#C5A059] bg-white px-8 py-14 text-center">
            <p
              className="text-[#111111] text-xl mb-2"
              style={{ fontFamily: headingFont(lang) }}
            >
              {t.enquiry.successTitle}
            </p>
            <p className="text-stone-500 text-sm">{t.enquiry.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
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
            {error && <p className="text-center text-red-600 text-sm">{error}</p>}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#C5A059] text-black text-sm tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#b6924c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {submitting ? t.enquiry.submitting : t.enquiry.submit}
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
  const { t, lang } = useLang();
  return (
    <footer className="bg-[#111111] border-t border-stone-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-[#F9F9F9] tracking-[0.15em] text-sm uppercase"
            style={{ fontFamily: headingFont(lang) }}
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
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left border-t border-stone-900 pt-6">
          <p className="text-stone-500 text-xs tracking-wide">{t.footer.operator}</p>
          <p className="text-stone-500 text-xs tracking-wide">{t.footer.contact}</p>
          <p className="text-stone-600 text-xs tracking-wide">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function HiddenTrailsLanding() {
  const [lang, setLang] = useState("en");
  const t = content[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <LightboxProvider>
        <div className="min-h-screen bg-[#111111]" style={{ fontFamily: bodyFont(lang) }}>
          <Navbar />
          <Hero />
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TripFacts />
            <SignatureExperience />
            <Breather />
            <WhyZhangjiajie />
            <BestTimeToVisit />
            <JourneySection />
            <ServicesGrid />
            <TrustSection />
            <BeforeYouArrive />
            <FAQSection />
            <PricingTeaser />
            <EnquirySection />
          </motion.div>
          <Footer />
        </div>
      </LightboxProvider>
    </LangContext.Provider>
  );
}
