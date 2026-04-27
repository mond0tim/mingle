-- 1. Отключаем проверку внешних ключей
SET FOREIGN_KEY_CHECKS = 0;

-- 2. Меняем тип ID в основной таблице треков на INT с автоинкрементом
ALTER TABLE `track` MODIFY `id` INT NOT NULL AUTO_INCREMENT;

-- 3. Обновляем все связанные таблицы (внешние ключи)
-- В MariaDB/MySQL это автоматически сконвертирует строки типа "96" в число 96.
ALTER TABLE `playlist_track` MODIFY `trackId` INT NOT NULL;
ALTER TABLE `favorite_track` MODIFY `trackId` INT NOT NULL;
ALTER TABLE `track_history` MODIFY `trackId` INT NOT NULL;

-- 4. Обновляем поле последнего прослушанного трека у пользователя
ALTER TABLE `user` MODIFY `lastPlayedTrackId` INT NULL;

-- 5. Включаем проверку внешних ключей обратно
SET FOREIGN_KEY_CHECKS = 1;
