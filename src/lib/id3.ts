import NodeID3 from 'node-id3';
import path from 'path';
import fs from 'fs';

interface AudioTags {
  title?: string;
  artist?: string;
  album?: string;
  coverPath?: string; // Абсолютный путь к обложке или относительный внутри public
}

function getAbsolutePath(relativePath: string) {
    const cleanedPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    return path.join(process.cwd(), 'public', cleanedPath);
}

export async function updateAudioMetadata(filepath: string, tags: AudioTags): Promise<boolean> {
   return new Promise((resolve, reject) => {
       try {
           const tagsObj: any = {
               title: tags.title,
               artist: tags.artist,
               album: tags.album
           };
           
           if (tags.coverPath) {
               const absoluteCover = getAbsolutePath(tags.coverPath);
               if (fs.existsSync(absoluteCover)) {
                   tagsObj.image = absoluteCover;
               }
           }
           
           const absolutePath = getAbsolutePath(filepath);
           
           if (!fs.existsSync(absolutePath)) {
               return resolve(false);
           }
            
           const result = NodeID3.update(tagsObj, absolutePath);
           if (result === true) {
               resolve(true);
           } else {
               reject(result);
           }
       } catch(err) {
           console.error("ID3 Metatags update error:", err);
           reject(err);
       }
   });
}

export async function readAudioMetadata(filepath: string): Promise<NodeID3.Tags | null> {
    return new Promise((resolve) => {
        try {
            const absolutePath = getAbsolutePath(filepath);
            if (!fs.existsSync(absolutePath)) {
                return resolve(null);
            }
            
            const tags = NodeID3.read(absolutePath);
            resolve(tags);
        } catch (err) {
             console.error("Read ID3 error:", err);
             resolve(null);
        }
    })
}
