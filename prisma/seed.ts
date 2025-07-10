import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('Available models:', Object.keys(prisma));

const pets = [
  {
    name: 'Mushu',
    ownerName: 'Doug Sellers',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-4.png',
    age: 2,
    notes: 'Very verbal, loves to bark. Plays well with other dogs.',
  },
  {
    name: 'Oso',
    ownerName: 'Zai Sellers',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-5.png',
    age: 2,
    notes:
      'Very intelligent, loves affection. Will pee on others property when upset',
  },
  {
    name: 'Anna',
    ownerName: 'Frank Doe',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-6.png',
    age: 4,
    notes: 'Allergic to chicken.',
  },
];

async function main() {
  console.log('Pets', pets);
  console.log(`Start seeding ...`);

  for (const pet of pets) {
    const result = await prisma.pet.create({
      data: pet,
    });
    console.log(`Created pet with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
