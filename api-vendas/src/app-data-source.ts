import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: ['src/entity/*.js'],
  logging: true,
  synchronize: true,
});
