'use server';
import prisma from '@/lib/db';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(pet: any) {
  console.log('Adding pet:', pet);
  await sleep(2000);

  try {
    await prisma?.pet.create({
      data: pet,
      // data: {
      //   name: formData.get('name') as string,
      //   ownerName: formData.get('ownerName') as string,
      //   imageUrl:
      //     formData.get('imageUrl') ||
      //     ('https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png' as string),
      //   age: parseInt(formData.get('age') as string),
      //   notes: formData.get('notes') as string,
      // },
    });
  } catch (error) {
    return {
      message: 'Failed to add pet. Please try again.',
    };
  }
  revalidatePath('/app', 'layout'); // Revalidate the home page to reflect the new pet
}

export async function editPet(petId: any, newPetData: any) {
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: newPetData,
      // data: {
      //   name: formData.get('name'),
      //   ownerName: formData.get('ownerName'),
      //   imageUrl:
      //     formData.get('imageUrl') ||
      //     'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
      //   age: formData.get('age'),
      //   notes: formData.get('notes'),
      // },
    });
  } catch (error) {
    return {
      message: 'Failed to update pet. Please try again.',
    };
  }
  revalidatePath('/app', 'layout'); // Revalidate the home page to reflect the updated pet
}

export async function deletePet(petId: any) {
  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
  } catch (error) {
    return {
      message: 'Failed to delete pet. Please try again.',
    };
  }
  revalidatePath('/app', 'layout'); // Revalidate the home page to reflect the deleted pet
}
