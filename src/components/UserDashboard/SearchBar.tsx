
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-white/80 backdrop-blur-sm border-jungle-primary/20 focus:border-jungle-primary/40 transition-all duration-300"
      />
    </div>
  );
};
