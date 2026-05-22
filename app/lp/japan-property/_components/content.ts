import type { Locale } from "./i18n-context";

type T = { en: string; ja: string };
type TList = { en: string[]; ja: string[] };

export const content = {
  brand: {
    name: { en: "Tsubata's Japan", ja: "Tsubata's Japan" } as T,
    tagline: {
      en: "Authentic Japanese Properties, Curated by an Insider",
      ja: "本物の日本物件を、内側からキュレート",
    } as T,
  },
  nav: {
    services: { en: "Services", ja: "サービス" } as T,
    properties: { en: "Properties", ja: "物件サンプル" } as T,
    process: { en: "Process", ja: "ご利用の流れ" } as T,
    about: { en: "About", ja: "プロフィール" } as T,
    contact: { en: "Contact", ja: "お問い合わせ" } as T,
  },
  hero: {
    badge: { en: "Trusted by international buyers", ja: "海外バイヤーから信頼" } as T,
    title: {
      en: "Find Your Authentic Japanese Home",
      ja: "あなただけの、本物の日本の家を見つける",
    } as T,
    subtitle: {
      en: "I'm Kosaku Tsubata, a Tokyo software engineer turned property advisor. I personally inspect, evaluate, and curate Japanese homes for international buyers — from coastal akiya to traditional countryside houses.",
      ja: "津端晃作です。東京のソフトウェアエンジニアであり、物件アドバイザー。海外のお客様向けに、日本各地の物件を実際に視察・評価・キュレーションしています。海辺の空き家から伝統的な古民家まで。",
    } as T,
    ctaPrimary: { en: "Book Free 15-min Consultation", ja: "無料15分相談を予約" } as T,
    ctaSecondary: { en: "View Sample Properties", ja: "物件サンプルを見る" } as T,
    statLabel1: { en: "Properties Curated", ja: "キュレート済物件" } as T,
    statLabel2: { en: "Municipalities Covered", ja: "対応自治体" } as T,
    statLabel3: { en: "Languages", ja: "対応言語" } as T,
    stat3Value: { en: "EN / JP", ja: "EN / JP" } as T,
  },
  painPoints: {
    eyebrow: { en: "The Reality", ja: "現状の問題" } as T,
    title: {
      en: "Why Buying Japanese Property Feels Impossible",
      ja: "なぜ日本物件購入は難しいのか",
    } as T,
    items: [
      {
        title: {
          en: "The Language & Cultural Wall",
          ja: "言語と文化の壁",
        } as T,
        body: {
          en: "Most local brokers don't speak English, and Japanese real estate culture is built on relationships and unwritten rules — not what's online.",
          ja: "地元業者の多くは英語が話せず、日本の不動産文化は人間関係と暗黙のルールで動いています。Webサイトには載らない情報が大半です。",
        } as T,
      },
      {
        title: {
          en: "Hidden Risks in Cheap Akiya",
          ja: "格安空き家の隠れたリスク",
        } as T,
        body: {
          en: "A ¥1M house can cost ¥10M after structural repairs, unregistered buildings, inheritance issues, and zoning surprises. You can't tell from photos.",
          ja: "100万円の物件が、構造補強・未登記建物・相続問題・用途地域の落とし穴で結果1,000万円超になることも。写真だけでは判断できません。",
        } as T,
      },
      {
        title: {
          en: "No One Curates for You",
          ja: "自分用に厳選してくれる人がいない",
        } as T,
        body: {
          en: "Sites like Akiya Japan list 60,000+ properties. Most are unsellable. You need someone who knows the market, the regions, and your specific needs.",
          ja: "Akiya Japanは6万件以上掲載していますが、ほとんどは扱いが難しい物件です。市場・地域・あなたのニーズを理解した人が必要です。",
        } as T,
      },
    ],
  },
  solution: {
    eyebrow: { en: "How I Help", ja: "私の解決方法" } as T,
    title: {
      en: "Insider Knowledge, Engineered Process",
      ja: "内側の知見と、エンジニアの体系的アプローチ",
    } as T,
    body: {
      en: "I combine 15 years of software engineering with deep local relationships. Every property is personally inspected, scored against 5 criteria, and matched to your goals — whether that's a digital nomad base, a family vacation home, or an Airbnb investment.",
      ja: "15年のソフトウェア開発経験と、地元との深い人間関係を組み合わせます。全物件を私自身が視察し、5軸で評価、お客様の目的(ノマド拠点・家族の別荘・Airbnb投資など)とマッチングします。",
    } as T,
    pillars: [
      {
        title: { en: "AI-Powered Property Search", ja: "AI物件サーチ" } as T,
        body: {
          en: "I built a custom system that scans 100+ sources daily, evaluating each property on content value, sales potential, renovation fit, pricing fairness, and foreign appeal.",
          ja: "100以上のソースを毎日スキャンする自社システムを構築。各物件をコンテンツ価値・売却見込み・リノベ適性・価格妥当性・外国人受けで評価しています。",
        } as T,
      },
      {
        title: { en: "On-the-Ground Inspection", ja: "現地視察を私自身が実行" } as T,
        body: {
          en: "I personally drive to every shortlisted property — checking foundations, water access, neighborhood feel, and the things photos never show.",
          ja: "私自身が全候補物件を現地視察。基礎・水道・近隣の雰囲気など、写真では絶対わからないことを確認します。",
        } as T,
      },
      {
        title: { en: "Licensed Broker Network", ja: "提携宅建業者ネットワーク" } as T,
        body: {
          en: "I work with vetted local real estate licensees for actual transactions. You get the deep insight of a Japanese insider plus the legal certainty of a licensed broker.",
          ja: "実際の媒介・契約は、信頼できる地元宅建業者と提携。日本人の深い知見と、宅建業者の法的安心感の両方を得られます。",
        } as T,
      },
    ],
  },
  packages: {
    eyebrow: { en: "Service Packages", ja: "サービスパッケージ" } as T,
    title: {
      en: "Choose How Much Support You Need",
      ja: "必要なサポートのレベルをお選びください",
    } as T,
    items: [
      {
        name: { en: "Discovery Call", ja: "初回相談" } as T,
        price: { en: "$150", ja: "$150" } as T,
        priceNote: { en: "30 min · No commitment", ja: "30分 · お試し" } as T,
        description: {
          en: "A focused 30-minute video call to understand your goals, budget, and constraints. You leave with a personalized 1-page summary.",
          ja: "30分のビデオ通話で、ご希望・予算・制約を整理します。あなた専用の1ページサマリーをお渡しします。",
        } as T,
        features: {
          en: [
            "Goals & budget alignment",
            "Region recommendations",
            "Realistic price range",
            "Next-step roadmap",
            "1-page summary PDF",
          ],
          ja: [
            "目的・予算の整理",
            "推奨エリアのご提案",
            "現実的な価格帯のすり合わせ",
            "次のステップのロードマップ",
            "1ページサマリーPDF",
          ],
        } as TList,
        cta: { en: "Book Now", ja: "今すぐ予約" } as T,
      },
      {
        name: { en: "Investor Package", ja: "Investorパッケージ" } as T,
        price: { en: "$5,000", ja: "$5,000" } as T,
        priceNote: { en: "Per project · ~60 days", ja: "1プロジェクト · 約60日" } as T,
        description: {
          en: "Curated 10-property shortlist with full reports, 2 in-person inspections, and broker introductions. Best for serious buyers.",
          ja: "厳選10物件のショートリスト+詳細レポート、2回の現地視察、業者紹介。本気の方向け。",
        } as T,
        features: {
          en: [
            "Custom property search (10 matches)",
            "Detailed English property reports",
            "2 days of on-site inspections (Tesla pickup at local station)",
            "Licensed broker introductions",
            "Document review & translation",
          ],
          ja: [
            "ご希望に合わせた物件サーチ(10件マッチング)",
            "英語の詳細物件レポート",
            "現地視察2日(現地駅でテスラピックアップ)",
            "提携宅建業者のご紹介",
            "書類レビュー&翻訳サポート",
          ],
        } as TList,
        highlighted: true,
        cta: { en: "Get Started", ja: "申し込む" } as T,
      },
      {
        name: { en: "Premium Package", ja: "Premiumパッケージ" } as T,
        price: { en: "$15,000", ja: "$15,000" } as T,
        priceNote: { en: "Per acquisition · ~6 months", ja: "1案件 · 約6ヶ月" } as T,
        description: {
          en: "End-to-end purchase support including contract negotiation, renovation planning, and minpaku (vacation rental) license consulting.",
          ja: "契約交渉・リノベ計画・簡易宿所申請まで含む、購入完了までのフルサポート。",
        } as T,
        features: {
          en: [
            "Everything in Investor",
            "3 days of inspections (any region)",
            "Contract review with bilingual lawyer",
            "Renovation contractor introductions",
            "Minpaku/Shukuhakugyo license consulting",
            "3 months post-purchase support",
          ],
          ja: [
            "Investorパッケージの内容すべて",
            "視察3日(任意のエリア)",
            "バイリンガル弁護士による契約レビュー",
            "リノベ工務店のご紹介",
            "簡易宿所(民泊)許可コンサルティング",
            "購入後3ヶ月間のサポート",
          ],
        } as TList,
        cta: { en: "Get Started", ja: "申し込む" } as T,
      },
      {
        name: { en: "Concierge", ja: "Conciergeパッケージ" } as T,
        price: { en: "$30,000+", ja: "$30,000+" } as T,
        priceNote: { en: "By application", ja: "ご相談" } as T,
        description: {
          en: "White-glove service for ultra-high-end properties (¥30M+). Full project management including renovation execution and Airbnb operation setup.",
          ja: "3,000万円超の高級物件向け。リノベ実行管理・Airbnb運用立ち上げを含む完全プロジェクトマネジメント。",
        } as T,
        features: {
          en: [
            "Everything in Premium",
            "Unlimited inspections during search",
            "Renovation project management",
            "Airbnb listing setup & first-3-month operation",
            "Tax & visa advisory introductions",
            "12 months post-purchase support",
          ],
          ja: [
            "Premiumパッケージの内容すべて",
            "サーチ期間中の視察無制限",
            "リノベプロジェクトマネジメント",
            "Airbnb掲載立ち上げ&運用最初3ヶ月",
            "税理士・ビザコンサルのご紹介",
            "購入後12ヶ月間のサポート",
          ],
        } as TList,
        cta: { en: "Apply", ja: "ご相談" } as T,
      },
    ],
  },
  process: {
    eyebrow: { en: "How It Works", ja: "ご利用の流れ" } as T,
    title: { en: "From First Call to Keys in Hand", ja: "初回相談から鍵の受け取りまで" } as T,
    steps: [
      {
        number: "01",
        title: { en: "Discovery Call", ja: "初回相談" } as T,
        body: {
          en: "30-minute video call to understand your goals, budget, and timeline.",
          ja: "30分のビデオ通話で、目的・予算・スケジュールを整理。",
        } as T,
      },
      {
        number: "02",
        title: { en: "Brief & Match", ja: "ブリーフィングとマッチング" } as T,
        body: {
          en: "I run my AI search across 100+ sources and curate a 10-property shortlist for your review.",
          ja: "100以上のソースで自社AI物件サーチを実行、10物件のショートリストを作成しレビューいただきます。",
        } as T,
      },
      {
        number: "03",
        title: { en: "Site Inspection", ja: "現地視察" } as T,
        body: {
          en: "We meet at the local station. I drive you (Tesla Model Y) to 3-5 properties for hands-on evaluation.",
          ja: "現地駅で集合。テスラ Model Y で物件3-5件をご案内し、実際の状態をご確認いただきます。",
        } as T,
      },
      {
        number: "04",
        title: { en: "Decision Support", ja: "意思決定サポート" } as T,
        body: {
          en: "Side-by-side comparison, cost projections (renovation + Airbnb scenarios), and risk assessment.",
          ja: "物件の比較、コスト試算(リノベ+Airbnb想定)、リスク評価をご提供。",
        } as T,
      },
      {
        number: "05",
        title: { en: "Purchase Support", ja: "購入サポート" } as T,
        body: {
          en: "I introduce you to a vetted local broker who handles the actual transaction. I support translation and document review.",
          ja: "信頼できる地元宅建業者をご紹介。実際の媒介はその業者が担当。私は翻訳・書類レビューでサポート。",
        } as T,
      },
      {
        number: "06",
        title: { en: "Aftercare", ja: "購入後サポート" } as T,
        body: {
          en: "Renovation oversight, minpaku license, Airbnb setup, and ongoing property management as needed.",
          ja: "リノベ進行管理、簡易宿所申請、Airbnb立ち上げ、物件管理代行(必要に応じて)。",
        } as T,
      },
    ],
  },
  whyUs: {
    eyebrow: { en: "Why Tsubata's Japan", ja: "なぜTsubata's Japanか" } as T,
    title: {
      en: "The Only Japanese Insider Who Speaks Your Language",
      ja: "あなたの言語で話す、唯一の日本人インサイダー",
    } as T,
    points: [
      {
        title: { en: "Native Japanese", ja: "日本人ネイティブ" } as T,
        body: {
          en: "Existing English-language akiya sites are run by foreigners. I'm the only Japanese-native curator with deep cultural fluency.",
          ja: "既存の英語空き家サイトは全て外国人運営。私は深い文化理解を持つ唯一の日本人キュレーターです。",
        } as T,
      },
      {
        title: { en: "Software Engineer", ja: "ソフトウェアエンジニア" } as T,
        body: {
          en: "15+ years building software. I bring analytical rigor and AI tools that no traditional broker can match.",
          ja: "15年以上のソフトウェア開発経験。伝統的な業者にはない分析的な視点とAIツールをお届けします。",
        } as T,
      },
      {
        title: { en: "Vetted Network", ja: "厳選ネットワーク" } as T,
        body: {
          en: "Licensed brokers, traditional renovation craftsmen, bilingual lawyers, tax advisors — built for international buyers.",
          ja: "宅建業者・伝統的なリノベ職人・バイリンガル弁護士・税理士など、海外バイヤー向けのネットワーク。",
        } as T,
      },
      {
        title: { en: "No Conflict of Interest", ja: "利益相反なし" } as T,
        body: {
          en: "I don't take secret kickbacks from brokers. You pay me directly for advice, and I work entirely in your interest.",
          ja: "業者からの裏マージンは取りません。私への報酬はお客様から直接お支払いいただき、お客様の利益のみを優先します。",
        } as T,
      },
    ],
  },
  about: {
    eyebrow: { en: "About Kosaku", ja: "プロフィール" } as T,
    title: { en: "Tokyo Engineer. Akiya Curator.", ja: "東京のエンジニア、空き家キュレーター。" } as T,
    body: {
      en: "I'm Kosaku Tsubata, founder of miitaso, a Tokyo-based AI consultancy. After 15+ years building software for startups and enterprises, I started using AI to scan and analyze Japanese property listings — and realized international buyers were missing out on the best deals because no one was bridging the gap.\n\nNow I split my time between building AI tools, running an animal-themed orchestra IP business (ATTO), and helping international buyers find their dream Japanese homes. I drive a Tesla Model Y, live in Chuo-ku Tokyo, and speak fluent English.",
      ja: "津端晃作です。株式会社miitaso代表(東京のAIコンサルティング会社)。15年以上ソフトウェア開発に従事した後、AIを使って日本の物件をスキャン・分析するようになり、海外のバイヤーが最良の物件を見逃していることに気づきました。誰もそのギャップを埋めていなかったのです。\n\n現在は、AIツール開発・動物オーケストラIP事業(ATTO)・海外のお客様への日本物件サポートを並行して行っています。テスラ Model Y を運転し、東京・中央区在住、英語ネイティブレベル。",
    } as T,
  },
  faq: {
    eyebrow: { en: "FAQ", ja: "よくある質問" } as T,
    title: { en: "Frequently Asked Questions", ja: "よくある質問" } as T,
    items: [
      {
        q: {
          en: "Do you have a real estate license?",
          ja: "宅建業免許はお持ちですか?",
        } as T,
        a: {
          en: "Not personally — yet. For all actual transactions, I work with vetted, licensed local brokers who handle contracts, negotiations, and registrations. My role is curation, advisory, and translation. This is the same model used by international relocation specialists worldwide.",
          ja: "私個人としては未取得ですが、実際の取引は信頼できる地元の宅建業者と提携して行います。私の役割はキュレーション・アドバイザリー・翻訳。世界中の海外不動産仲介スペシャリストと同じモデルです。",
        } as T,
      },
      {
        q: {
          en: "Can foreigners buy property in Japan?",
          ja: "外国人でも日本の物件を購入できますか?",
        } as T,
        a: {
          en: "Yes, fully. There are no restrictions on foreign ownership of land or buildings in Japan, regardless of visa status. Bank financing for non-residents is harder, so most clients pay cash. We help navigate the process.",
          ja: "はい、完全に可能です。ビザの有無に関わらず、外国人の土地・建物所有に制限はありません。非居住者の銀行融資は難しいため、多くのお客様は現金購入されます。手続きはサポートします。",
        } as T,
      },
      {
        q: {
          en: "How do site inspections work?",
          ja: "現地視察はどのように進みますか?",
        } as T,
        a: {
          en: "You travel to a local station (e.g., Atami, Kamogawa, Karuizawa) by Shinkansen or train. I meet you there in my Tesla Model Y and drive us to 3-5 shortlisted properties in one day. We inspect each property thoroughly — foundations, water access, neighborhood feel, sun exposure, etc.",
          ja: "新幹線・特急で現地駅(熱海・鴨川・軽井沢など)までお越しください。私がテスラ Model Y で駅にお迎えし、1日でショートリスト3-5件をご案内します。基礎・水道・近隣の雰囲気・日当たりなど徹底的に確認します。",
        } as T,
      },
      {
        q: {
          en: "What about renovation costs?",
          ja: "リノベ費用はどのくらいかかりますか?",
        } as T,
        a: {
          en: "It varies dramatically. A 50-year-old wooden house with 80m² typically needs ¥4-9M (¥50-110K per m²) for habitability. Add ¥1.5M for minpaku (Airbnb) compliance. We provide cost estimates as part of every property report.",
          ja: "物件によります。築50年の木造80㎡なら居住可能化に400-900万(5-11万円/㎡)が標準。簡易宿所(民泊)対応なら追加150万。物件レポートに概算をお付けします。",
        } as T,
      },
      {
        q: {
          en: "Can I run my property as a vacation rental (Airbnb)?",
          ja: "Airbnbとして運用できますか?",
        } as T,
        a: {
          en: "Yes, but you need a license. The most common route is shukuhakugyo-ho (旅館業法 / inn business law) for unrestricted year-round operation. Some areas allow minpaku-shinpou (民泊新法, max 180 nights/year). We consult on which is right for your property and help with the application.",
          ja: "可能ですが許可が必要です。365日運営なら旅館業法(簡易宿所)、年間180日以内なら民泊新法(住宅宿泊事業法)が一般的です。物件に合った選択と申請をサポートします。",
        } as T,
      },
      {
        q: {
          en: "What regions do you cover?",
          ja: "対応エリアはどこですか?",
        } as T,
        a: {
          en: "Currently 109 municipalities across Kanto and surrounding regions: Chiba (Boso peninsula), Kanagawa (Hakone, Yugawara), Shizuoka (Atami, Izu), Yamanashi (Hokuto, Kawaguchiko), Tochigi (Nasu), Niigata (snow country), and more. Tokyo metro coverage is limited but growing.",
          ja: "現在、関東+周辺で109自治体: 千葉(房総半島)、神奈川(箱根・湯河原)、静岡(熱海・伊豆)、山梨(北杜・河口湖)、栃木(那須)、新潟(雪国)など。東京都内は限定的ですが拡大中です。",
        } as T,
      },
    ],
  },
  cta: {
    eyebrow: { en: "Ready to Start?", ja: "始めましょう" } as T,
    title: {
      en: "Let's Find Your Japanese Home Together",
      ja: "あなたの日本の家を、一緒に見つけましょう",
    } as T,
    body: {
      en: "Book a free 15-minute discovery call. No pressure, no commitment — just a conversation about what you're looking for.",
      ja: "無料15分の相談を予約しましょう。お気軽に、希望を聞かせてください。",
    } as T,
    buttonPrimary: { en: "Book Free Call", ja: "無料相談を予約" } as T,
    buttonSecondary: { en: "Email Me", ja: "メールで問い合わせ" } as T,
  },
  footer: {
    rights: {
      en: "© 2026 miitaso Inc. / Tsubata's Japan. All rights reserved.",
      ja: "© 2026 株式会社miitaso / Tsubata's Japan. All rights reserved.",
    } as T,
    legal: {
      en: "Tsubata's Japan is an advisory service. All real estate transactions are conducted through licensed Japanese real estate brokers (宅地建物取引業者).",
      ja: "Tsubata's Japan はアドバイザリーサービスです。実際の不動産取引は、すべて許可を持つ日本の宅地建物取引業者を通じて行われます。",
    } as T,
  },
} as const;

export function t<K extends keyof typeof content>(
  section: K,
  locale: Locale
): typeof content[K] {
  return content[section];
}

export function pick(text: { en: string; ja: string }, locale: Locale): string {
  return text[locale];
}

export function pickList(list: { en: string[]; ja: string[] }, locale: Locale): string[] {
  return list[locale];
}
