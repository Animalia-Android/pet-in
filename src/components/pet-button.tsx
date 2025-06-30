import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: 'add' | 'edit' | 'checkout';
};

export default function PetButton({ children, actionType }: PetButtonProps) {
  if (actionType === 'add') {
    return (
      <Button size="icon">
        <PlusIcon />
      </Button>
    );
  }

  if (actionType === 'edit') {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === 'checkout') {
    return <Button variant="secondary">{children}</Button>;
  }
}
