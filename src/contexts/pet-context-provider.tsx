'use client';

import { addPet, deletePet, editPet } from '@/actions/actions';
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
  handleAddPet: (newPet: Omit<Pet, 'id'>) => Promise<void>;
  handleEditPet: (petId: string, newPet: Omit<Pet, 'id'>) => Promise<void>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case 'add':
          return [...state, { ...payload, id: Date.now().toString() }];
        case 'edit':
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload } : pet
          );
        case 'delete':
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //event handlers
  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const error = await addPet(newPet);
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

    if (error) {
      console.error('Error adding pet:', error);
      toast.warning(error.message || 'Failed to add pet. Please try again.');
      return;
    }
  };

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, 'id'>) => {
    setOptimisticPets({
      action: 'edit',
      payload: { id: petId, ...newPetData },
    });
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: string) => {
    // setPets((prev) => prev.filter((pet) => pet.id !== id));
    setOptimisticPets({ action: 'delete', payload: petId });

    const error = await deletePet(petId);

    if (error) {
      toast.warning(error.message);
      return;
    }

    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
