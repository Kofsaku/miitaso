const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('最近の記事:');
    console.table(posts);
    
    // mvp-completeのスラッグを検索
    const mvpPost = await prisma.blogPost.findFirst({
      where: {
        slug: 'mvp-complete'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
      }
    });
    
    console.log('\nmvp-complete記事:');
    console.log(mvpPost || 'Not found');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPosts();