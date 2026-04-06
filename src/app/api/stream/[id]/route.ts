import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Ищем трек в БД
    const track = await prisma.track.findUnique({
      where: { id }
    });

    if (!track) {
      return new NextResponse('Track not found', { status: 404 });
    }

    // 2. Определяем путь к файлу
    // track.src обычно содержит что-то вроде "/audio/track.mp3"
    // Мы убираем начальный слеш, чтобы path.join сработал относительно public
    const relativePath = track.src.startsWith('/') ? track.src.slice(1) : track.src;
    const filePath = path.join(process.cwd(), 'public', relativePath);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Audio file not found on server', { status: 404 });
    }

    // 3. Анализируем Range заголовок
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = request.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': 'audio/mpeg',
      };
      
      // Node Readable Stream to Web ReadableStream
      const stream = new ReadableStream({
        start(controller) {
          file.on('data', (chunk) => controller.enqueue(chunk));
          file.on('end', () => controller.close());
          file.on('error', (err) => controller.error(err));
        },
        cancel() {
          file.destroy();
        }
      });

      return new NextResponse(stream as any, {
        status: 206,
        headers: head
      });
    } else {
      const head = {
        'Content-Length': fileSize.toString(),
        'Content-Type': 'audio/mpeg',
      };
      
      const file = fs.createReadStream(filePath);
      const stream = new ReadableStream({
        start(controller) {
          file.on('data', (chunk) => controller.enqueue(chunk));
          file.on('end', () => controller.close());
          file.on('error', (err) => controller.error(err));
        },
        cancel() {
          file.destroy();
        }
      });

      return new NextResponse(stream as any, {
        status: 200,
        headers: head
      });
    }

  } catch (error) {
    console.error('Streaming error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
