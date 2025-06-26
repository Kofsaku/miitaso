# ブログ機能データベーススキーマ

## テーブル設計

### 1. blog_posts (ブログ記事)
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  author_id UUID NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
```

### 2. authors (著者)
```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  bio TEXT,
  avatar VARCHAR(500),
  role VARCHAR(20) NOT NULL DEFAULT 'writer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. categories (カテゴリ)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### 4. tags (タグ)
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug ON tags(slug);
```

### 5. blog_post_categories (記事とカテゴリの中間テーブル)
```sql
CREATE TABLE blog_post_categories (
  blog_post_id UUID NOT NULL,
  category_id UUID NOT NULL,
  PRIMARY KEY (blog_post_id, category_id),
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

### 6. blog_post_tags (記事とタグの中間テーブル)
```sql
CREATE TABLE blog_post_tags (
  blog_post_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  PRIMARY KEY (blog_post_id, tag_id),
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

### 7. comments (コメント)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_blog_post_id ON comments(blog_post_id);
CREATE INDEX idx_comments_status ON comments(status);
```

### 8. blog_post_likes (いいね)
```sql
CREATE TABLE blog_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL,
  user_identifier VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(blog_post_id, user_identifier),
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_post_likes_blog_post_id ON blog_post_likes(blog_post_id);
```

### 9. blog_post_bookmarks (ブックマーク)
```sql
CREATE TABLE blog_post_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL,
  user_identifier VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(blog_post_id, user_identifier),
  FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_blog_post_bookmarks_user ON blog_post_bookmarks(user_identifier);
```

### 10. email_subscribers (メール購読者)
```sql
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  subscribe_token VARCHAR(255) UNIQUE NOT NULL,
  unsubscribe_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_subscribers_status ON email_subscribers(status);
```

## 実装の推奨事項

### 1. データベース選択
- **PostgreSQL + Supabase**: リアルタイム機能、認証、ストレージを統合
- **Vercel Postgres**: Vercelとのシームレスな統合
- **PlanetScale**: スケーラビリティとパフォーマンス重視

### 2. ORM選択
- **Prisma**: 型安全性とマイグレーション管理
- **Drizzle ORM**: 軽量で高パフォーマンス

### 3. キャッシュ戦略
- 記事一覧: Redis/Vercel KVで5分間キャッシュ
- 記事詳細: CDNで1時間キャッシュ
- 人気記事: 日次で再計算

### 4. 検索機能
- PostgreSQLの全文検索機能を使用
- 将来的にはAlgoliaやElasticsearchへの移行を検討