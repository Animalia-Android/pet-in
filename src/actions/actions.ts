'use server';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(formData) {
  console.log('Adding pet:', formData);
  await sleep(2000);

  try {
    await prisma?.pet.create({
      data: {
        name: formData.get('name') as string,
        ownerName: formData.get('ownerName') as string,
        imageUrl:
          formData.get('imageUrl') ||
          ('https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png' as string),
        age: parseInt(formData.get('age') as string),
        notes: formData.get('notes') as string,
      },
    });
  } catch (error) {
    return {
      message: 'Failed to add pet. Please try again.',
    };
  }
  revalidatePath('/app', 'layout'); // Revalidate the home page to reflect the new pet
}
