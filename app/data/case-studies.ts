import { ServiceType } from "@/types"

export const caseStudies = [
  {
    id: 1,
    title: "AIを活用した医療診断支援システム",
    description: "医師の診断をサポートするAIシステムの開発。診断精度の向上と診断時間の短縮を実現。",
    image: "/medi.png?height=400&width=800",
    category: "ヘルスケア",
    serviceType: "consulting" as ServiceType,
    date: "2023年12月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>大手医療機関からの依頼により、医師の診断をサポートするAIシステムの開発を行いました。このシステムは、医療画像の解析と患者データの分析を通じて、より正確な診断を支援します。</p>

      <h2>課題</h2>
      <ul>
        <li>診断時間の短縮が必要</li>
        <li>診断精度の向上が求められている</li>
        <li>医師の負担軽減が課題</li>
      </ul>

      <h2>ソリューション</h2>
      <p>最新のディープラーニング技術を活用し、以下の機能を実装しました：</p>
      <ul>
        <li>医療画像の自動解析機能</li>
        <li>患者データの統合分析</li>
        <li>診断支援レポートの自動生成</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>診断時間を平均40%短縮</li>
        <li>診断精度を15%向上</li>
        <li>医師の満足度が90%以上</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "クラウド型顧客管理システム",
    description: "企業の顧客管理を効率化するクラウドシステムの開発。顧客満足度の向上と業務効率化を実現。",
    image: "/crm2.png?height=400&width=800",
    category: "CRM",
    serviceType: "product" as ServiceType,
    date: "2023年10月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>中堅企業からの依頼により、クラウド型顧客管理システムの開発を行いました。このシステムは、顧客データの一元管理と分析を通じて、より効果的な顧客対応を実現します。</p>

      <h2>課題</h2>
      <ul>
        <li>顧客データの分散管理</li>
        <li>顧客対応の効率化が必要</li>
        <li>データ分析の自動化が求められている</li>
      </ul>

      <h2>ソリューション</h2>
      <p>クラウド技術とAIを活用し、以下の機能を実装しました：</p>
      <ul>
        <li>顧客データの一元管理システム</li>
        <li>AIによる顧客行動分析</li>
        <li>自動化された顧客対応フロー</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>顧客対応時間を50%短縮</li>
        <li>顧客満足度を30%向上</li>
        <li>営業効率を40%改善</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "AI動画編集アプリケーション",
    description: "AIを活用した自動動画編集アプリの開発。編集時間の大幅短縮と高品質な動画制作を実現。",
    image: "/video_edit.png?height=400&width=800",
    category: "クリエイティブ",
    serviceType: "product" as ServiceType,
    date: "2023年8月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>クリエイティブ企業からの依頼により、AIを活用した動画編集アプリケーションの開発を行いました。このアプリは、自動編集機能と高度な分析機能により、効率的な動画制作を可能にします。</p>

      <h2>課題</h2>
      <ul>
        <li>動画編集の効率化が必要</li>
        <li>編集スキルの差による品質のばらつき</li>
        <li>制作コストの削減が求められている</li>
      </ul>

      <h2>ソリューション</h2>
      <p>AIと機械学習を活用し、以下の機能を実装しました：</p>
      <ul>
        <li>AIによる自動編集機能</li>
        <li>シーン分析と最適な編集提案</li>
        <li>カスタマイズ可能な編集テンプレート</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>編集時間を70%短縮</li>
        <li>制作コストを40%削減</li>
        <li>動画品質の均一化を実現</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "AIコールシステム",
    description: "AI技術を活用したインテリジェントな自動応答システムの構築",
    image: "/ai-call.png?height=400&width=800",
    category: "AI",
    serviceType: "mvp" as ServiceType,
    date: "2023年6月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>顧客サポートの効率化を目的とした、AI搭載の自動応答システムのMVP開発を行いました。このシステムは、24時間体制での顧客対応と業務効率化を実現します。</p>

      <h2>課題</h2>
      <ul>
        <li>カスタマーサポートの人員不足</li>
        <li>問い合わせ対応の遅延</li>
        <li>夜間・休日対応の限界</li>
      </ul>

      <h2>ソリューション</h2>
      <p>以下の機能を実装しました：</p>
      <ul>
        <li>自然言語処理による会話理解</li>
        <li>リアルタイム音声認識・応答</li>
        <li>顧客データに基づく個別化対応</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>応答時間を90%短縮</li>
        <li>顧客満足度を40%向上</li>
        <li>サポート処理能力を200%向上</li>
      </ul>
    `
  },
  {
    id: 5,
    title: "予約管理システムのUI/UX改善",
    description: "予約管理システムのユーザー体験向上と業務効率化の実現",
    image: "/reservation.png?height=400&width=800",
    category: "サービス",
    serviceType: "mvp" as ServiceType,
    date: "2023年4月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>予約管理システムのユーザーインターフェースとユーザー体験の改善を行いました。直感的な操作性と効率的な予約管理を実現し、顧客満足度の向上を図りました。</p>

      <h2>課題</h2>
      <ul>
        <li>予約手続きの複雑さによる顧客離脱</li>
        <li>予約状況の確認が非効率</li>
        <li>キャンセル・変更手続きの煩雑さ</li>
      </ul>

      <h2>ソリューション</h2>
      <p>以下の改善を実施しました：</p>
      <ul>
        <li>シンプルで直感的な予約フロー設計</li>
        <li>リアルタイム予約状況の可視化</li>
        <li>ワンクリックでの予約変更機能</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>予約完了率を40%向上</li>
        <li>予約管理業務を60%効率化</li>
        <li>顧客満足度を35%改善</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "教育プラットフォームのUI/UX改善",
    description: "オンライン学習プラットフォームのユーザー体験改善",
    image: "/video.png?height=400&width=800",
    category: "教育",
    serviceType: "design" as ServiceType,
    date: "2023年2月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>オンライン学習プラットフォームのUI/UXデザインを刷新し、ユーザー体験の向上を実現しました。</p>

      <h2>課題</h2>
      <ul>
        <li>ユーザー離脱率の高さ</li>
        <li>学習継続率の低さ</li>
        <li>使いにくいインターフェース</li>
      </ul>

      <h2>ソリューション</h2>
      <p>以下の改善を実施しました：</p>
      <ul>
        <li>ユーザーリサーチの実施</li>
        <li>インターフェースの再設計</li>
        <li>学習体験の最適化</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>学習継続率を50%向上</li>
        <li>ユーザー満足度を40%改善</li>
        <li>離脱率を35%削減</li>
      </ul>
    `
  },
  {
    id: 7,
    title: "ビル入場管理システムのUI/UX改善",
    description: "ビル入場管理システムのユーザー体験向上とセキュリティ強化の実現",
    image: "/build.png?height=400&width=800",
    category: "セキュリティ",
    serviceType: "design" as ServiceType,
    date: "2023年4月",
    content: `
      <h2>プロジェクト概要</h2>
      <p>ビル入場管理システムのユーザーインターフェースとユーザー体験の改善を行いました。セキュリティを維持しながら、スムーズな入場管理と効率的な業務フローを実現しました。</p>

      <h2>課題</h2>
      <ul>
        <li>入場手続きの煩雑さによる待ち時間の発生</li>
        <li>セキュリティチェックの非効率性</li>
        <li>来訪者管理の手間</li>
      </ul>

      <h2>ソリューション</h2>
      <p>以下の改善を実施しました：</p>
      <ul>
        <li>タッチパネル式の直感的なインターフェース設計</li>
        <li>QRコードによるスムーズな入場手続き</li>
        <li>セキュリティチェックの効率化</li>
      </ul>

      <h2>成果</h2>
      <ul>
        <li>入場手続き時間を50%短縮</li>
        <li>セキュリティチェックの精度を30%向上</li>
        <li>来訪者管理の効率を45%改善</li>
      </ul>
    `
  },
]

export const getCaseStudiesByServiceType = (serviceType: ServiceType) => {
  return caseStudies.filter(caseStudy => caseStudy.serviceType === serviceType)
}

export const getCaseStudyById = (id: number) => {
  return caseStudies.find(caseStudy => caseStudy.id === id)
} 