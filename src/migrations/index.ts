import * as migration_20250724_193709_migration from './20250724_193709_migration';

export const migrations = [
  {
    up: migration_20250724_193709_migration.up,
    down: migration_20250724_193709_migration.down,
    name: '20250724_193709_migration'
  },
];
