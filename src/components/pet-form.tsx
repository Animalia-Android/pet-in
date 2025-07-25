'use client';

import { usePetContext } from '@/lib/hooks';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import PetFormBtn from './pet-form-btn';
import { toast } from 'sonner';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  // Old way of handling form submission
  // This is commented out to avoid confusion with the new way using FormData
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   // const newPet = Object.fromEntries(formData.entries());
  //   const newPet = {
  //     name: formData.get('name') as string,
  //     ownerName: formData.get('ownerName') as string,
  //     imageUrl:
  //       (formData.get('imageUrl') as string) ||
  //       'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
  //     age: +(formData.get('age') as string),
  //     notes: formData.get('notes') as string,
  //   };

  //   handleAddPet(newPet);
  //   onFormSubmission();
  // };

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        onFormSubmission();
        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png',
          age: +(formData.get('age') as string),
          notes: formData.get('notes') as string,
        };
        if (actionType === 'add') {
          await handleAddPet(petData);
          // const error = await addPet(formData);
          // if (error) {
          //   console.error('Error adding pet:', error);
          //   toast.warning(
          //     error.message || 'Failed to add pet. Please try again.'
          //   );
          //   return;
          // }
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData);
          // const error = await editPet(selectedPet?.id, formData);
          // if (error) {
          //   toast.warning(error.message);
          //   return;
          // }
        }
        console.log('Pet added successfully');
        // If the action is successful, we can call the onFormSubmission callback
        // This will trigger a re-render or any other side effects needed
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Pet Image</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
