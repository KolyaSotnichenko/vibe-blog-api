import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPosts001 implements MigrationInterface {
  name = 'InitPosts001';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE posts (id integer PRIMARY KEY AUTOINCREMENT, title varchar NOT NULL, content text NOT NULL)`
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE posts');
  }
}
