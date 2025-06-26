const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function publishDraftPosts() {
  try {
    const result = await prisma.blogPost.updateMany({
      where: {
        status: 'DRAFT',
      },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
    
    console.log(`${result.count}件の下書き記事を公開しました`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

publishDraftPosts();