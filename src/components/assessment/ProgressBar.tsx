import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  sectionName: string;
}

export function ProgressBar({ current, total, sectionName }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-muted-foreground">
          {sectionName}
        </span>
        <span className="text-muted-foreground">
          {current} of {total}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}