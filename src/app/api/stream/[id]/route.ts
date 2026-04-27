import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const trackId = parseInt(idParam, 10);

    if (isNaN(trackId)) {
       return new NextResponse('Invalid Track ID format', { status: 400 });
    }
    
    // 1. Ищем трек в БД
    const track = await prisma.track.findUnique({
      where: { id: trackId }
    });

    if (!track) {
      return new NextResponse('Track not found', { status: 404 });
    }

    // 2. Определяем путь к файлу
    const relativePath = track.src.startsWith('/') ? track.src.slice(1) : track.src;
    const filePath = path.join(process.cwd(), 'public', relativePath);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Audio file not found on server', { status: 404 });
    }

    // 3. Stat файла + ETag
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const etag = `"${stat.mtimeMs.toString(36)}-${fileSize.toString(36)}"`;

    // 4. Conditional request — если ETag совпадает, 304
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }

    // Общие кэширующие заголовки — аудио файлы не меняются
    const cacheHeaders = {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': etag,
      'Accept-Ranges': 'bytes',
      'Content-Type': 'audio/mpeg',
    };

    // 5. Range request
    const range = request.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      
      const iterator = file[Symbol.asyncIterator]();
      const webStream = new ReadableStream({
        async pull(controller) {
          try {
            const { value, done } = await iterator.next();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(new Uint8Array(value));
            }
          } catch (error) {
            controller.error(error);
          }
        },
        cancel() {
          file.destroy();
        }
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          ...cacheHeaders,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Content-Length': chunksize.toString(),
        }
      });
    } else {
      const file = fs.createReadStream(filePath);
      
      const iterator = file[Symbol.asyncIterator]();
      const webStream = new ReadableStream({
        async pull(controller) {
          try {
            const { value, done } = await iterator.next();
            if (done) {
              controller.close();
            } else {
              controller.enqueue(new Uint8Array(value));
            }
          } catch (error) {
            controller.error(error);
          }
        },
        cancel() {
          file.destroy();
        }
      });

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          ...cacheHeaders,
          'Content-Length': fileSize.toString(),
        }
      });
    }

  } catch (error) {
    console.error('Streaming error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
