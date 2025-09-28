import { Button } from '@/components/ui/button';
import { categories } from '@/lib/newsData';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  language: 'ar' | 'fr';
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, language }: CategoryFilterProps) {
  const categoryLabels = categories[language];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(categoryLabels).map(([key, label]) => (
        <Button
          key={key}
          variant={selectedCategory === key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(key)}
          className="text-xs"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
