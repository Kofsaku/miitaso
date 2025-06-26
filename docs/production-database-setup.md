# 本番環境データベース設定ガイド

## 概要
本番環境（https://www.miitaso.com）でブログ機能を使用するために、データベースの設定とマイグレーションが必要です。

## 前提条件
- PostgreSQLデータベースが本番環境で利用可能
- 本番環境にDATABASE_URL環境変数が設定済み
- Prismaが本番環境にデプロイ済み

## 必要な手順

### 1. データベースマイグレーション
本番環境でPrismaマイグレーションを実行する必要があります：

```bash
# 本番環境でマイグレーションを実行
npx prisma migrate deploy
```

### 2. Prismaクライアント生成
```bash
# 本番環境でPrismaクライアントを生成
npx prisma generate
```

### 3. 初期データ作成（必要に応じて）
```bash
# シードデータの投入（オプション）
npx prisma db seed
```

## データベーススキーマ確認

### 主要なテーブル
- `User` - ユーザー情報
- `BlogPost` - ブログ記事
- `Category` - カテゴリ
- `Tag` - タグ
- `BlogPostCategory` - 記事とカテゴリの関連
- `Comment` - コメント
- `Like`, `Bookmark` - いいね・ブックマーク

### 必須の環境変数
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

## 本番環境で発生している問題

### 現在のエラー
- `/api/blog/posts` - 500エラー
- `/api/blog/categories` - 500エラー
- カテゴリ保存失敗

### 考えられる原因
1. **データベースマイグレーション未実行**
   - Prismaスキーマがデータベースに反映されていない
   
2. **Prismaクライアント未生成**
   - `@prisma/client`が本番環境で正しく生成されていない
   
3. **環境変数の問題**
   - `DATABASE_URL`が正しく設定されていない
   
4. **データベース接続権限**
   - 本番環境からデータベースに接続できない

## 解決手順

### ステップ1: データベース接続確認
```bash
# データベースに接続できるか確認
npx prisma db pull
```

### ステップ2: マイグレーション実行
```bash
# 本番環境でマイグレーション実行
npx prisma migrate deploy
```

### ステップ3: 初期ユーザー作成
```sql
-- 管理者ユーザーを作成
INSERT INTO "User" (id, email, name, role, password, "createdAt", "updatedAt")
VALUES (
  'admin-user-id',
  'admin@miitaso.com',
  'Admin User',
  'ADMIN',
  '$2a$10$...',  -- ハッシュ化されたパスワード
  NOW(),
  NOW()
);
```

### ステップ4: デフォルトカテゴリ作成
```sql
-- デフォルトカテゴリを作成
INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt")
VALUES (
  'default-category-id',
  '技術',
  'tech',
  '技術に関する記事',
  NOW(),
  NOW()
);
```

## Vercel環境での設定

### build コマンドの確認
```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### Vercel環境変数設定
1. Vercelダッシュボードの環境変数で`DATABASE_URL`を設定
2. ビルド時にPrismaが自動実行されるよう設定

## トラブルシューティング

### よくある問題と解決策

1. **"Table doesn't exist" エラー**
   ```bash
   npx prisma migrate deploy
   ```

2. **"PrismaClient initialization failed" エラー**
   ```bash
   npx prisma generate
   ```

3. **環境変数読み込み失敗**
   - Vercelの環境変数設定を確認
   - `.env`ファイルが本番環境にアップロードされていないか確認

## 次のステップ
1. 本番環境でマイグレーション実行
2. APIエンドポイントの動作確認
3. 管理画面での記事作成テスト
4. カテゴリ機能の動作確認