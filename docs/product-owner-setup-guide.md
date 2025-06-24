# ブログ機能セットアップガイド（プロダクトオーナー向け）

## 概要

本プロジェクトにはブログ機能が実装されていますが、データベースの設定と初期データの準備が必要です。このガイドでは、プロダクトオーナーが実施すべき設定手順を詳細に説明します。

## 実装済み機能

### データベーススキーマ
- **User**: ユーザー管理（ADMIN, EDITOR, WRITER の3つのロール）
- **BlogPost**: ブログ記事（下書き、レビュー、公開、アーカイブのステータス管理）
- **Category**: カテゴリ管理（階層構造対応）
- **Tag**: タグ管理
- **Comment**: コメント機能（返信対応、承認制）
- **Like**: いいね機能
- **Bookmark**: ブックマーク機能
- **PostVersion**: 記事のバージョン管理
- **Subscriber**: メール購読者管理

### API エンドポイント
- `/api/blog/posts` - 記事の作成・取得
- `/api/blog/categories` - カテゴリ管理
- `/api/blog/tags` - タグ管理
- `/api/blog/comments` - コメント管理
- `/api/blog/posts/[id]/like` - いいね機能

### フロントエンド画面
- `/blog` - ブログ一覧ページ
- `/blog/[id]` - 記事詳細ページ
- `/blog/editor` - 記事編集ページ
- `/blog/preview` - プレビューページ
- `/admin/blog` - 管理画面（記事管理）

## 必要な設定作業

### 1. データベース環境の準備

#### 開発環境（ローカル）
**オプション1: Supabase（推奨）**
1. [Supabase](https://supabase.com) でアカウント作成
2. 新しいプロジェクトを作成
3. Database → Settings → Database から接続情報を取得
4. `.env.local` に設定:
```env
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

**オプション2: ローカルPostgreSQL**
1. PostgreSQL をインストール（推奨バージョン: 14以上）
2. データベースを作成:
```sql
CREATE DATABASE miitaso_blog;
CREATE USER miitaso_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE miitaso_blog TO miitaso_user;
```
3. `.env.local` に設定:
```env
DATABASE_URL="postgresql://miitaso_user:secure_password@localhost:5432/miitaso_blog"
```

#### 本番環境
**Supabase本番環境**
1. Supabaseで本番用プロジェクトを作成
2. 適切なプランを選択（Pro以上推奨）
3. データベース接続プールを設定
4. バックアップスケジュールを設定
5. Row Level Security (RLS) を有効化

### 2. セキュリティ設定

#### NextAuth シークレットキーの生成
```bash
openssl rand -base64 32
```
生成されたキーを `.env.local` の `NEXTAUTH_SECRET` に設定

#### 本番環境用 URL の設定
本番環境では `NEXTAUTH_URL` を実際のドメインに変更:
```env
NEXTAUTH_URL="https://yourdomain.com"
```

### 3. データベースマイグレーションの実行

```bash
# Prisma クライアントの生成
npx prisma generate

# データベーススキーマの適用
npx prisma db push

# または、マイグレーションファイルを作成して実行
npx prisma migrate dev --name init
```

### 4. 初期データの作成

#### 管理者ユーザーの作成
データベースに直接管理者ユーザーを作成するか、以下のシードスクリプトを作成:

```javascript
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 管理者ユーザーの作成
  const hashedPassword = await bcrypt.hash('admin_password', 12);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@miitaso.com',
      name: '管理者',
      role: 'ADMIN',
      password: hashedPassword,
      bio: 'システム管理者'
    }
  });

  // 基本カテゴリの作成
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'お知らせ',
        slug: 'news',
        description: '重要なお知らせや更新情報'
      }
    }),
    prisma.category.create({
      data: {
        name: 'ブログ',
        slug: 'blog',
        description: '一般的なブログ記事'
      }
    }),
    prisma.category.create({
      data: {
        name: '技術情報',
        slug: 'tech',
        description: '技術的な情報や解説'
      }
    })
  ]);

  // 基本タグの作成
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: '重要',
        slug: 'important'
      }
    }),
    prisma.tag.create({
      data: {
        name: '新機能',
        slug: 'new-feature'
      }
    })
  ]);

  console.log('初期データの作成が完了しました');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

実行:
```bash
node prisma/seed.js
```

### 5. メール設定（オプション）

コメント通知やニュースレター機能を使用する場合、SMTP 設定を確認:
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=no-reply@yourdomain.com
SMTP_TO=admin@yourdomain.com
```

### 6. 本番環境への展開

#### 環境変数の設定確認項目
- [ ] `DATABASE_URL`: Supabase本番データベースの接続文字列
- [ ] `NEXTAUTH_URL`: 本番ドメイン
- [ ] `NEXTAUTH_SECRET`: セキュアなランダム文字列
- [ ] `OPENAI_API_KEY`: AI機能を使用する場合
- [ ] SMTP設定: メール機能を使用する場合
- [ ] `SUPABASE_URL`: Supabaseプロジェクト URL（フロントエンド機能で使用）
- [ ] `SUPABASE_ANON_KEY`: Supabaseの匿名キー

#### Supabase本番設定
1. **プラン選択**: 
   - Starter（$0/月）: 開発・小規模サイト
   - Pro（$25/月）: 本格運用、バックアップ付き
   - Team/Enterprise: 大規模サイト

2. **セキュリティ設定**:
   - Row Level Security (RLS) の有効化
   - 適切なポリシー設定
   - API制限の設定

3. **パフォーマンス設定**:
   - データベース接続プールの設定
   - インデックスの最適化
   - クエリパフォーマンス監視

4. **バックアップ・監視**:
   - 自動バックアップの設定（Proプラン以上）
   - アラート設定
   - ログ監視

### 7. Supabaseの追加設定

#### Row Level Security (RLS) ポリシー設定例
```sql
-- ブログ投稿の閲覧権限
CREATE POLICY "Public blog posts are viewable by everyone" 
ON BlogPost FOR SELECT 
USING (status = 'PUBLISHED');

-- ブログ投稿の編集権限
CREATE POLICY "Users can edit their own posts" 
ON BlogPost FOR ALL 
USING (auth.uid() = authorId);

-- 管理者は全記事にアクセス可能
CREATE POLICY "Admins can access all posts" 
ON BlogPost FOR ALL 
USING (auth.jwt() ->> 'role' = 'ADMIN');
```

#### Supabase Dashboard設定
1. **Database → Replication**: リアルタイム機能の設定
2. **Storage**: 画像アップロード用バケット作成
3. **Edge Functions**: サーバーレス関数（必要に応じて）
4. **API**: 自動生成APIの設定確認

### 8. 運用開始後の管理タスク

#### 定期メンテナンス
- Supabaseダッシュボードでのメトリクス確認
- 未承認コメントの管理
- ユーザー権限の見直し
- 古い記事のアーカイブ化

#### コンテンツ管理
- 管理画面 (`/admin/blog`) でのコンテンツ管理
- カテゴリとタグの整理
- SEO設定の確認
- 画像最適化の実施

#### セキュリティ対策
- 定期的なパスワード変更
- アクセスログの監視
- 不正アクセスの検知
- セキュリティアップデートの適用

## トラブルシューティング

### よくある問題

1. **データベース接続エラー**
   - `DATABASE_URL` の確認
   - データベースサーバーの起動確認
   - ファイアウォール設定の確認

2. **認証エラー**
   - `NEXTAUTH_SECRET` の設定確認
   - `NEXTAUTH_URL` の設定確認
   - セッションCookieの設定確認

3. **画像アップロードの問題**
   - ファイルサイズ制限の確認
   - ストレージ容量の確認
   - 画像形式のサポート確認

### サポート情報

技術的な問題が発生した場合は、開発チームまでお問い合わせください。

---

**重要**: このガイドに記載された手順を実行する前に、必ずテスト環境で動作確認を行ってください。