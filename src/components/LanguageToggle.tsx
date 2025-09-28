import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'ar' | 'fr';
  onLanguageChange: (language: 'ar' | 'fr') => void;
}

export default function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4" />
      <div className="flex rounded-lg border overflow-hidden">
        <Button
          variant={currentLanguage === 'ar' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('ar')}
          className="rounded-none px-3 py-1 text-xs"
        >
          العربية
        </Button>
        <Button
          variant={currentLanguage === 'fr' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('fr')}
          className="rounded-none px-3 py-1 text-xs"
        >
          Français
        </Button>
      </div>
    </div>
  );
}
