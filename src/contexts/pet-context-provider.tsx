'use client';

import { addPet } from '@/actions/actions';
import { Pet } from '@/lib/types';
import { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
  handleEditPet: (petId: string, newPet: Omit<Pet, 'id'>) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //handlers
  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    // setPets((prev) => [...prev, { ...newPet, id: Date.now().toString() }]);

    // standard way of communicating with the backend
    // fetch('https://petsoft.com/api/pets', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newPet),
    // });
    // await addPet({ ...newPet, id: Date.now().toString() });

    const error = await addPet(formData);

    if (error) {
      console.error('Error adding pet:', error);
      toast.warning(error.message || 'Failed to add pet. Please try again.');
      return;
    }
  };

  const handleEditPet = (petId: string, newPet: Omit<Pet, 'id'>) => {
    setOptimisticPets((prev) =>
      prev.map((pet) => (pet.id === petId ? { ...pet, ...newPet } : pet))
    );
  };

  const handleCheckoutPet = (id: string) => {
    // setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
