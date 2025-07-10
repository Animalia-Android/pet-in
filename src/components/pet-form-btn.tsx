import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function PetFormBtn({ actionType }) {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-5 self-end" type="submit" disabled={pending}>
      {actionType === 'add' ? 'Add a new pet' : 'Save'}
    </Button>
  );
}
