import type { Country, Language } from '@/types/country';

interface CountryListItemProps {
  country: Country;
  currentLang: Language;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export default function CountryListItem({
  country,
  currentLang,
  onHover,
  onLeave,
  onClick,
}: CountryListItemProps) {
  return (
    <li
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30"
    >
      {/* Flag */}
      <img
        src={`/flags/3x2/${country.code2}.svg`}
        alt={`Flag of ${country.names.en}`}
        className="h-5 w-8 rounded object-cover shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Name */}
      <span className="flex-1 truncate text-sm font-medium text-gray-800 dark:text-gray-200">
        {country.names[currentLang]}
      </span>
    </li>
  );
}
