import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/db';
import { Toaster } from '@/components/ui/sonner';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();

  // const response = await fetch(
  //   'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  // );
  // if (!response.ok) {
  //   throw new Error('Could not fetch pets');
  // }
  // const data: Pet[] = await response.json();

  return (
    <>
      <BackgroundPattern>
        <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
          <AppHeader />

          <SearchContextProvider>
            <PetContextProvider data={pets}>{children}</PetContextProvider>
          </SearchContextProvider>

          <AppFooter />
        </div>
      </BackgroundPattern>

      <Toaster position="top-right" />
    </>
  );
}
