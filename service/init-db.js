const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户（使用固定ID）
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      id: 'test-user-id',  // 使用固定ID
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedpassword123',
    },
  });

  console.log('Created user:', user);

  // 创建测试项目
  const project = await prisma.project.create({
    data: {
      name: '英语学习',
      icon: '📖',
      description: '每日单词 · 短语积累',
      userId: user.id,
    },
  });

  console.log('Created project:', project);

  // 创建测试记录
  const record = await prisma.record.create({
    data: {
      projectId: project.id,
      userId: user.id,
      date: new Date(),
      duration: 2,
      content: '## 📖 今日单词\n\n**eloquent** /ˈeləkwənt/ adj. 雄辩的',
      tags: '单词,短语',
    },
  });

  console.log('Created record:', record);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
