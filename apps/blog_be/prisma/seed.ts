import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Function to generate a unique slug
const generateSlug = (title: string): string => {
  return `${title.toLowerCase().replace(/\s+/g, '-')}-${faker.string.alphanumeric(6)}`;
};

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
          password: faker.internet.password(),
        },
      }),
    ),
  );

  // Create tags
  const tags = await Promise.all(
    ['Tech', 'Health', 'Finance', 'Travel', 'Education'].map((tag) =>
      prisma.tag.create({ data: { name: tag } }),
    ),
  );

  // Create posts
  const posts = await Promise.all(
    users.map((user) =>
      prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          slug: generateSlug(faker.lorem.words(3)), // Generate a unique slug
          content: faker.lorem.paragraphs(3),
          thumbnail: faker.image.url(),
          published: faker.datatype.boolean(),
          authorId: user.id,
          tags: {
            connect: [{ id: tags[Math.floor(Math.random() * tags.length)].id }],
          },
        },
      }),
    ),
  );

  // Create comments
  await Promise.all(
    posts.flatMap((post) =>
      users.map((user) =>
        prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            postId: post.id,
            authorId: user.id,
          },
        }),
      ),
    ),
  );

  // Create likes
  await Promise.all(
    users.flatMap((user) =>
      posts.map((post) =>
        prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        }),
      ),
    ),
  );

  console.log('✅ Database seeded successfully!');
}

// Execute seeding with error handling
main()
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('❌ Error seeding database:', error.message);
    } else {
      console.error('❌ An unknown error occurred:', String(error));
    }
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
