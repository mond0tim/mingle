-- Manual migration to switch Track.id to Int. Resolved data loss issue.
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE `track` MODIFY `id` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `playlist_track` MODIFY `trackId` INT NOT NULL;
ALTER TABLE `favorite_track` MODIFY `trackId` INT NOT NULL;
ALTER TABLE `track_history` MODIFY `trackId` INT NOT NULL;
ALTER TABLE `user` MODIFY `lastPlayedTrackId` INT NULL;
SET FOREIGN_KEY_CHECKS = 1;
