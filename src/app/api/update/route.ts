import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { syncTracks, showMissingTracks } from '@/data/update';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const apiKey = url.searchParams.get('key');
  
  // Проверка API ключа
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { message: 'Неверный или отсутствующий API ключ' },
      { status: 401 }
    );
  }

  const flags: { [key: string]: string | boolean } = {};
  
  // Обработка флагов из параметров URL
  url.searchParams.forEach((value, key) => {
    if (key === 'key') return; // Пропускаем сам ключ
    flags[key] = value === 'true' ? true : value === 'false' ? false : value;
  });

  try {
    if (flags.diffOnly) {
      showMissingTracks();
      return NextResponse.json({
        message: 'Проверка пропущенных треков выполнена',
        logs: 'См. логи сервера для деталей'
      });
    } else {
      const result = await syncTracks(flags);
      return NextResponse.json({
        message: 'Синхронизация треков завершена',
        result,
        logs: 'См. логи сервера для деталей'
      });
    }
  } catch (error) {
    console.error('Ошибка обработки:', error);
    return NextResponse.json(
      { 
        message: 'Ошибка обработки запроса',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}