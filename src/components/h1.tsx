import { cn } from '@/lib/utils';

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  return (
    <div className={cn('font-medium text-2xl leading-6', className)}>
      {children}
    </div>
  );
}
