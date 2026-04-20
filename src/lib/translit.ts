/**
 * Utility for transliterating Cyrillic characters to Latin
 * and generating safe filenames for the Mingle media engine.
 */

const cyrillicToLatinMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
  'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
  'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
  'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
  'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts',
  'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
  'Я': 'Ya'
};

/**
 * Transliterates Cyrillic text to Latin.
 */
export function transliterate(text: string): string {
  return text.split('').map(char => cyrillicToLatinMap[char] || char).join('');
}

/**
 * Slugifies text: transliterates, converts to lowercase, removes non-alphanumeric chars, 
 * and replaces spaces with hyphens.
 */
export function slugify(text: string): string {
  const latin = transliterate(text);
  return latin
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters (except space and hyphen)
    .replace(/[\s_-]+/g, '-')    // Replace spaces, underscores and hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
}

/**
 * Generates a standard Mingle filename: 
 * track-title--artist-title--id.ext
 */
export function generateMingleFilename(
  title: string, 
  artist: string, 
  id: string | number, 
  extension: string
): string {
  const cleanTitle = slugify(title) || 'unknown-track';
  const cleanArtist = slugify(artist) || 'unknown-artist';
  const ext = extension ? (extension.startsWith('.') ? extension : `.${extension}`) : '';
  
  // Add a small random suffix to avoid file locks and cache issues
  const suffix = Math.random().toString(36).substring(2, 6);
  
  return `${cleanTitle}--${cleanArtist}--${id}--${suffix}${ext}`;
}
