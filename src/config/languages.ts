import type { Language } from '@/types/country';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

export function getLanguageConfig(code: Language): LanguageConfig | undefined {
  return LANGUAGES.find((lang) => lang.code === code);
}

export function isRTL(code: Language): boolean {
  const config = getLanguageConfig(code);
  return config?.dir === 'rtl';
}

export const UI_STRINGS: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'Flaggr',
    description: 'Learn world flags by colors and symbols with an interactive map',
    search: 'Search countries...',
    colors: 'Colors',
    symbols: 'Symbols',
    results: 'Results',
    noResults: 'No countries found',
    filterPrompt: 'Enter a search term or select filters',
    allCountries: 'All Countries',
    clearFilters: 'Clear Filters',
    tapToFilter: 'Tap to filter',
  },
  ja: {
    appTitle: 'Flaggr',
    description: '色とシンボルで世界の国旗を学べるインタラクティブ地図',
    search: '国を検索...',
    colors: '色',
    symbols: 'シンボル',
    results: '結果',
    noResults: '条件に一致する国が見つかりません',
    filterPrompt: '検索語を入力するか、フィルターを選択してください',
    allCountries: 'すべての国',
    clearFilters: 'フィルターをクリア',
    tapToFilter: 'タップでフィルター',
  },
  zh: {
    appTitle: 'Flaggr',
    description: '通过颜色和符号学习世界国旗的互动地图',
    search: '搜索国家...',
    colors: '颜色',
    symbols: '符号',
    results: '结果',
    noResults: '未找到符合条件的国家',
    filterPrompt: '请输入搜索词或选择筛选条件',
    allCountries: '所有国家',
    clearFilters: '清除筛选',
    tapToFilter: '点击筛选',
  },
  fr: {
    appTitle: 'Flaggr',
    description:
      'Apprenez les drapeaux du monde par couleurs et symboles avec une carte interactive',
    search: 'Rechercher des pays...',
    colors: 'Couleurs',
    symbols: 'Symboles',
    results: 'Résultats',
    noResults: 'Aucun pays correspondant',
    filterPrompt: 'Entrez un terme ou sélectionnez des filtres',
    allCountries: 'Tous les pays',
    clearFilters: 'Effacer les filtres',
    tapToFilter: 'Appuyez pour filtrer',
  },
  es: {
    appTitle: 'Flaggr',
    description: 'Aprende las banderas del mundo por colores y símbolos con un mapa interactivo',
    search: 'Buscar países...',
    colors: 'Colores',
    symbols: 'Símbolos',
    results: 'Resultados',
    noResults: 'No se encontraron países con estos criterios',
    filterPrompt: 'Ingrese un término o seleccione filtros',
    allCountries: 'Todos los países',
    clearFilters: 'Borrar filtros',
    tapToFilter: 'Toca para filtrar',
  },
  pt: {
    appTitle: 'Flaggr',
    description: 'Aprenda as bandeiras do mundo por cores e símbolos com um mapa interativo',
    search: 'Pesquisar países...',
    colors: 'Cores',
    symbols: 'Símbolos',
    results: 'Resultados',
    noResults: 'Nenhum país encontrado com esses critérios',
    filterPrompt: 'Digite um termo ou selecione filtros',
    allCountries: 'Todos os países',
    clearFilters: 'Limpar filtros',
    tapToFilter: 'Toque para filtrar',
  },
  ar: {
    appTitle: 'Flaggr',
    description: 'تعلم أعلام العالم من خلال الألوان والرموز مع خريطة تفاعلية',
    search: 'البحث عن الدول...',
    colors: 'الألوان',
    symbols: 'الرموز',
    results: 'النتائج',
    noResults: 'لم يتم العثور على دول مطابقة',
    filterPrompt: 'أدخل كلمة بحث أو اختر الفلاتر',
    allCountries: 'جميع الدول',
    clearFilters: 'مسح الفلاتر',
    tapToFilter: 'انقر للتصفية',
  },
  th: {
    appTitle: 'Flaggr',
    description: 'เรียนรู้ธงชาติโลกด้วยสีและสัญลักษณ์ผ่านแผนที่แบบโต้ตอบ',
    search: 'ค้นหาประเทศ...',
    colors: 'สี',
    symbols: 'สัญลักษณ์',
    results: 'ผลลัพธ์',
    noResults: 'ไม่พบประเทศที่ตรงกับเงื่อนไข',
    filterPrompt: 'ป้อนคำค้นหาหรือเลือกตัวกรอง',
    allCountries: 'ทุกประเทศ',
    clearFilters: 'ล้างตัวกรอง',
    tapToFilter: 'แตะเพื่อกรอง',
  },
  vi: {
    appTitle: 'Flaggr',
    description: 'Học cờ các nước qua màu sắc và biểu tượng với bản đồ tương tác',
    search: 'Tìm kiếm quốc gia...',
    colors: 'Màu sắc',
    symbols: 'Biểu tượng',
    results: 'Kết quả',
    noResults: 'Không tìm thấy quốc gia phù hợp',
    filterPrompt: 'Nhập từ khóa hoặc chọn bộ lọc',
    allCountries: 'Tất cả quốc gia',
    clearFilters: 'Xóa bộ lọc',
    tapToFilter: 'Nhấn để lọc',
  },
  id: {
    appTitle: 'Flaggr',
    description: 'Pelajari bendera dunia berdasarkan warna dan simbol dengan peta interaktif',
    search: 'Cari negara...',
    colors: 'Warna',
    symbols: 'Simbol',
    results: 'Hasil',
    noResults: 'Tidak ada negara yang cocok',
    filterPrompt: 'Masukkan kata kunci atau pilih filter',
    allCountries: 'Semua Negara',
    clearFilters: 'Hapus Filter',
    tapToFilter: 'Ketuk untuk filter',
  },
  ru: {
    appTitle: 'Flaggr',
    description: 'Изучайте флаги мира по цветам и символам с интерактивной картой',
    search: 'Поиск стран...',
    colors: 'Цвета',
    symbols: 'Символы',
    results: 'Результаты',
    noResults: 'Страны по этим критериям не найдены',
    filterPrompt: 'Введите запрос или выберите фильтры',
    allCountries: 'Все страны',
    clearFilters: 'Очистить фильтры',
    tapToFilter: 'Нажмите для фильтра',
  },
};
