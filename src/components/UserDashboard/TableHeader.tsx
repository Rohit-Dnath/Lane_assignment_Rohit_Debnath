
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (key: string) => void;
}

export const TableHeader = ({
  label,
  sortKey,
  currentSort,
  sortDirection,
  onSort,
}: TableHeaderProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => onSort(sortKey)}
      className="hover:bg-secondary/50 flex items-center gap-2"
    >
      {label}
      <ArrowUpDown className={`h-4 w-4 text-muted-foreground ${
        currentSort === sortKey ? 'opacity-100' : 'opacity-50'
      } ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
    </Button>
  );
};
