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
  Mountain,
  DoorOpen,
  Landmark,
} from "lucide-react";

/**
 * HIDDEN TRAILS · 隐山小径 — Landing Page (bilingual EN / 中文 / IT)
 * Single-file React component. Fonts loaded via Google Fonts <link> in index.html:
 *   Playfair Display + Inter (EN/IT, Latin charset covers Italian),
 *   Noto Serif SC + Noto Sans SC (中文).
 * Photography: Unsplash License (free for commercial use, no attribution required).
 * All copy lives in `content = { en: {...}, zh: {...}, it: {...} }` below; the language
 * toggle in the navbar sets a single `lang` state and every section reads from content[lang].
 * FAQ / Before You Arrive answers are drafted with industry-standard defaults and marked
 * "to be confirmed" — replace with the client's actual policies before launch.
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
    whyZhangjiajie: {
      eyebrow: "Why Zhangjiajie",
      heading: "A Landscape Unlike Any Other",
      items: [
        {
          icon: Mountain,
          title: "Pillars Found Nowhere Else",
          body: "Thousands of quartz-sandstone pillars rise from the forest floor — a landform so singular that one of them was officially renamed Avatar Hallelujah Mountain after inspiring the floating peaks of Pandora.",
        },
        {
          icon: DoorOpen,
          title: "A Door Carved by the Mountain Itself",
          body: "Tianmen Cave, the world's highest natural archway, is said to have opened in a single moment in 263 AD, when a section of the cliff face collapsed — a threshold locals still call the gate between worlds.",
        },
        {
          icon: Landmark,
          title: "A UNESCO World Heritage Landscape",
          body: "The Wulingyuan Scenic Area, encompassing Zhangjiajie National Forest Park, has been protected as a World Heritage Site since 1992 — one of the rarest karst-and-quartzite landscapes on Earth.",
        },
      ],
    },
    journey: {
      eyebrow: "The Journey",
      heading: "Four Days, Five Moments",
      stops: [
        {
          img: IMG_PEAKS,
          title: "Tianmen Mountain: The Door That Opened Itself",
          body: "Legend says this mountain once tore itself open in a single moment — a door the heavens chose to open, not one that was built. After dark, the same legend comes alive on stage at the mountain's base, in the Tianmen Fox Fairy performance — an open-air retelling of the fox spirit said to have crossed through that door into the world of men. By day, you'll pass through it yourself: through a passage only locals know, at the one hour it belongs to no one but you.",
        },
        {
          img: IMG_CLIFF,
          title: "Zhangjiajie National Forest Park: The Empty Overlook",
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
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          title: "Zhangjiajie Grand Canyon: The Bridge Above the Clouds",
          body: "One of the world's longest and highest glass-bottomed bridges spans the canyon floor, roughly 300 metres below — a gentler final morning before the journey home, walked at whatever pace you choose.",
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
          body: "China runs largely on mobile payment systems that most international cards can't access directly. Our team can pre-load a local payment app on your behalf or arrange cash exchange on arrival, so you're covered from day one. [Draft answer — to be confirmed]",
        },
        {
          icon: Languages,
          title: "Language Support",
          body: "Guides are fluent in English and Mandarin. Italian-speaking support can be arranged in advance, subject to availability. [Draft answer — to be confirmed]",
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
          a: "We accept international bank transfer and major credit cards (Visa, Mastercard). A deposit secures your booking, with the balance due before departure. [Draft answer — to be confirmed]",
        },
        {
          q: "What is your cancellation policy?",
          a: "Full refund if cancelled 30+ days before departure; 50% refund between 15–29 days; no refund within 14 days of departure. [Draft answer — to be confirmed]",
        },
        {
          q: "Do your guides speak Italian?",
          a: "Our guides are fluent in English and Mandarin; Italian-speaking support can be arranged with advance notice, subject to availability. [Draft answer — to be confirmed]",
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
    whyZhangjiajie: {
      eyebrow: "Perché Zhangjiajie",
      heading: "Un Paesaggio Senza Eguali",
      items: [
        {
          icon: Mountain,
          title: "Pilastri che Non Esistono Altrove",
          body: "Migliaia di pilastri di arenaria quarzifera si ergono dal terreno forestale — una conformazione così unica che uno di essi è stato ufficialmente ribattezzato Avatar Hallelujah Mountain, dopo aver ispirato le montagne fluttuanti di Pandora.",
        },
        {
          icon: DoorOpen,
          title: "Una Porta Scavata dalla Montagna Stessa",
          body: "La Grotta di Tianmen, il più alto arco naturale al mondo, si dice si sia aperta in un solo istante nel 263 d.C., quando una porzione della parete rocciosa crollò — una soglia che i locali chiamano ancora la porta tra i mondi.",
        },
        {
          icon: Landmark,
          title: "Un Paesaggio Patrimonio dell'UNESCO",
          body: "L'area panoramica di Wulingyuan, che comprende il Parco Forestale Nazionale di Zhangjiajie, è protetta come Patrimonio dell'Umanità dal 1992 — uno dei paesaggi di arenaria quarzifera più rari al mondo.",
        },
      ],
    },
    journey: {
      eyebrow: "Il Viaggio",
      heading: "Quattro Giorni, Cinque Momenti",
      stops: [
        {
          img: IMG_PEAKS,
          title: "Monte Tianmen: La Porta che si Aprì da Sola",
          body: "La leggenda narra che questa montagna si sia aperta in un solo istante — una porta che il cielo scelse di aprire, non che l'uomo costruì. Dopo il tramonto, la stessa leggenda prende vita sul palco ai piedi della montagna, nello spettacolo Tianmen Fox Fairy — una rappresentazione all'aperto dello spirito volpe che, si narra, attraversò quella porta per entrare nel mondo degli uomini. Di giorno, la attraverserete voi stessi: attraverso un passaggio noto solo ai locali, nell'unica ora in cui appartiene solo a voi.",
        },
        {
          img: IMG_CLIFF,
          title: "Parco Forestale Nazionale di Zhangjiajie: Il Belvedere Vuoto",
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
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          title: "Grand Canyon di Zhangjiajie: Il Ponte Sopra le Nuvole",
          body: "Uno dei ponti di vetro più lunghi e alti al mondo attraversa il canyon, a circa 300 metri dal fondovalle — un'ultima mattinata più rilassata prima del viaggio di ritorno, percorsa al ritmo che preferite.",
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
          body: "In Cina si utilizzano prevalentemente sistemi di pagamento mobile non sempre accessibili con le carte internazionali. Il nostro team può pre-caricare per voi un'app di pagamento locale o organizzare il cambio contante all'arrivo, così sarete coperti fin dal primo giorno. [Bozza — da confermare]",
        },
        {
          icon: Languages,
          title: "Supporto Linguistico",
          body: "Le guide parlano correntemente inglese e mandarino. Un supporto in italiano può essere organizzato in anticipo, in base alla disponibilità. [Bozza — da confermare]",
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
          a: "Accettiamo bonifico bancario internazionale e le principali carte di credito (Visa, Mastercard). Un acconto conferma la prenotazione, con il saldo dovuto prima della partenza. [Bozza — da confermare]",
        },
        {
          q: "Qual è la vostra politica di cancellazione?",
          a: "Rimborso totale in caso di cancellazione con più di 30 giorni di anticipo; rimborso del 50% tra 15 e 29 giorni; nessun rimborso entro 14 giorni dalla partenza. [Bozza — da confermare]",
        },
        {
          q: "Le vostre guide parlano italiano?",
          a: "Le nostre guide parlano correntemente inglese e mandarino; è possibile organizzare un supporto in italiano su richiesta anticipata, in base alla disponibilità. [Bozza — da confermare]",
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

  zh: {
    nav: { cta: "开启旅程" },
    hero: {
      title: "地图尽头，旅程开始",
      subtitle: "为期四天的私人张家界秘境之旅——由世代居于此山的向导，带您走入隐秘小径。",
      anchor: "这里正是您曾在银幕上见过的那个世界的灵感之源——以几乎无人能及的方式深入探索。",
    },
    philosophy:
      "大多数游客只是隔着取景框、挤在人群中看张家界。两千年前，一位早已功成名就的人，选择遁入这片山林，而非留在成就了他声名的世界中。我们认为，他看透了什么。这不是观光，这是一场心甘情愿的隐退。",
    whyZhangjiajie: {
      eyebrow: "为什么是张家界",
      heading: "举世无双的地貌",
      items: [
        {
          icon: Mountain,
          title: "绝无仅有的峰林",
          body: "数千座石英砂岩峰柱拔地而起——如此独特的地貌，其中一座更因启发了《阿凡达》潘多拉星球的悬浮山，而被正式更名为「阿凡达·哈利路亚山」。",
        },
        {
          icon: DoorOpen,
          title: "山体自行开凿的门",
          body: "天门洞是世界上已知海拔最高的天然穿山溶洞，相传于公元263年山体崩裂的瞬间豁然洞开——当地人至今仍称它为通往异界的门。",
        },
        {
          icon: Landmark,
          title: "世界自然遗产地貌",
          body: "武陵源风景名胜区（含张家界国家森林公园）自1992年起被列入世界自然遗产名录——是地球上最稀有的石英砂岩峰林地貌之一。",
        },
      ],
    },
    journey: {
      eyebrow: "旅程",
      heading: "四天，五个瞬间",
      stops: [
        {
          img: IMG_PEAKS,
          title: "天门山：自己裂开的门",
          body: "传说这座山曾在瞬间自行裂开——那是上天选择开启的门，而非人工凿成。入夜后，同一个传说会在山脚下的《天门狐仙》实景演出中重现——讲述那只据说曾穿过此门、来到人间的狐仙的故事。白天，您将亲自穿过它——通过一条只有本地人知晓的通道，在那唯独属于您的一个时刻。",
        },
        {
          img: IMG_CLIFF,
          title: "张家界国家森林公园：无人的观景台",
          before: "这些山峰历经了",
          emphasis: "3.8亿年",
          after:
            "才形成今日的模样。大多数游客只用拍一张照片的时间看它们一眼。而通过只有本地人才走的小径，在光线与人流恰好对您有利的那一个小时，您将拥有它们更久的独享时光。",
        },
        {
          img: IMG_VALLEY,
          title: "无名的山脊",
          body: "整整一天，走在任何旅行指南都未曾记载的山脊小径上——由世代山民踏出的路，通往这个省份大多数居民都未曾见过的景致。",
        },
        {
          img: IMG_HERO,
          imgPosition: "object-bottom",
          title: "天涯尽头的晚宴",
          body: "一场私人晚宴，选用山间食材烹制，设于云雾漫过悬崖的边缘——由唯一真正了解这片山脉的人，为您讲述它的故事。",
        },
        {
          img: IMG_VALLEY,
          imgPosition: "object-top",
          title: "张家界大峡谷：云端之上的桥",
          body: "世界上最长、最高的玻璃桥之一横跨峡谷，距谷底约300米——在归程之前，以您喜欢的节奏，度过一个更从容的最后清晨。",
        },
      ],
    },
    signature: {
      eyebrow: "标志性体验",
      heading: "这场旅程为何与众不同",
      items: [
        {
          icon: Compass,
          title: "本地土生向导",
          body: "并非持证导游——而是一位在此山中生活数十年、走遍未标记山径的当地居民。",
        },
        {
          icon: Clock,
          title: "精准择时",
          body: "每一条路线的时间安排，都基于多年本地观察积累的光线、天气与人流规律。",
        },
        {
          icon: MapPinOff,
          title: "地图之外",
          body: "整整一日的行程，不存在于任何应用程序、旅行指南，或其他行程单中。",
        },
      ],
    },
    services: {
      eyebrow: "全包服务",
      heading: "每个细节，皆已安排",
      items: [
        { icon: Car, text: "全程私人专车及司机" },
        { icon: Users, text: "专属双语向导，土生土长的张家界人" },
        { icon: Hotel, text: "三晚精心挑选的精品住宿" },
        { icon: UtensilsCrossed, text: "全程餐饮，包含一场私人山间晚宴" },
        { icon: ShieldCheck, text: "无隐藏消费、无强制购物、无拼团合并" },
      ],
    },
    trust: {
      eyebrow: "信任与保障",
      title: "限量旅程，用心安排",
      body: "我们每季仅接待有限数量的家庭，并与持牌本地旅行合作方紧密协作，确保全程受监管保障、投保完善，并提供24小时支持。",
      reviews: ["客户故事即将呈现", "首批旅程将于[季节]启程——成为我们的首批贵宾"],
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
          body: "中国主要使用移动支付系统，大多数国际银行卡无法直接使用。我们可以为您提前充值本地支付软件，或在抵达时安排现金兑换服务，让您从第一天起就无需担心支付问题。[草拟答案 — 待确认]",
        },
        {
          icon: Languages,
          title: "语言支持",
          body: "向导精通英语与普通话。如提前申请，可视情况安排意大利语支持。[草拟答案 — 待确认]",
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
          a: "我们接受国际银行转账及主要信用卡（Visa、Mastercard）支付。预订需支付定金，尾款于出发前结清。[草拟答案 — 待确认]",
        },
        {
          q: "取消政策是怎样的？",
          a: "出发前30天以上取消可全额退款；出发前15–29天取消退还50%；出发前14天内取消不予退款。[草拟答案 — 待确认]",
        },
        {
          q: "向导会说意大利语吗？",
          a: "我们的向导精通英语和普通话；如提前告知，可视情况安排意大利语支持。[草拟答案 — 待确认]",
        },
      ],
    },
    pricing: {
      line: "每人价格自 €1,450 起——独一无二的旅程，因为世间再无相似之选。",
      sub: "最终价格将根据季节、团队人数及路线选择，在简短咨询后确认。",
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
      successTitle: "感谢您的咨询",
      successBody: "我们已收到您的咨询，将尽快与您联系。",
    },
    footer: {
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
// 3. Philosophy / Positioning
// ---------------------------------------------------------------------------
function Philosophy() {
  const { t, lang } = useLang();
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
          style={{ fontFamily: headingFont(lang) }}
        >
          {t.philosophy}
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
    <section className="bg-[#F9F9F9] py-24 md:py-32 px-6 border-t border-stone-200">
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
        {t.whyZhangjiajie.items.map(({ icon: Icon, title, body }, i) => (
          <motion.div key={i} variants={fadeUp} className="text-center px-4">
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
// 4. The Journey — alternating image/text blocks
// ---------------------------------------------------------------------------
function JourneySection() {
  const { t, lang } = useLang();
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
        ))}
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
          className="text-[#F9F9F9] text-3xl md:text-4xl"
          style={{ fontFamily: headingFont(lang) }}
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
        className="max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className="w-10 h-px bg-[#C5A059] mx-auto mb-10" />
        <p
          className="text-xl md:text-2xl text-[#F9F9F9] leading-snug"
          style={{ fontFamily: headingFont(lang) }}
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
  const { t, lang } = useLang();
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
  const { t, lang } = useLang();
  return (
    <footer className="bg-[#111111] border-t border-stone-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
  const t = content[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <div className="min-h-screen bg-[#111111]" style={{ fontFamily: bodyFont(lang) }}>
        <Navbar />
        <Hero />
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Philosophy />
          <WhyZhangjiajie />
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
