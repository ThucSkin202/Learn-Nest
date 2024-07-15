import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1721023356223 implements MigrationInterface {
  name = 'InitialMigration1721023356223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`profileId\` int NULL, UNIQUE INDEX \`REL_9466682df91534dd95e4dbaa61\` (\`profileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_posts_post\` (\`userId\` int NOT NULL, \`postId\` int NOT NULL, INDEX \`IDX_1e37c6ee4e534594d10aeb9932\` (\`userId\`), INDEX \`IDX_0edd32657c4a2a0f8c02f49fde\` (\`postId\`), PRIMARY KEY (\`userId\`, \`postId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_projects_project\` (\`userId\` int NOT NULL, \`projectId\` int NOT NULL, INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` (\`userId\`), INDEX \`IDX_936561888bfd63d01c79fe415c\` (\`projectId\`), PRIMARY KEY (\`userId\`, \`projectId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9466682df91534dd95e4dbaa616\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_posts_post\` ADD CONSTRAINT \`FK_1e37c6ee4e534594d10aeb9932f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_posts_post\` ADD CONSTRAINT \`FK_0edd32657c4a2a0f8c02f49fde9\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` ADD CONSTRAINT \`FK_79daf0d2be103f4c30c77ddd6be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` ADD CONSTRAINT \`FK_936561888bfd63d01c79fe415c3\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_936561888bfd63d01c79fe415c3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_projects_project\` DROP FOREIGN KEY \`FK_79daf0d2be103f4c30c77ddd6be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_posts_post\` DROP FOREIGN KEY \`FK_0edd32657c4a2a0f8c02f49fde9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_posts_post\` DROP FOREIGN KEY \`FK_1e37c6ee4e534594d10aeb9932f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9466682df91534dd95e4dbaa616\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_936561888bfd63d01c79fe415c\` ON \`user_projects_project\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_79daf0d2be103f4c30c77ddd6b\` ON \`user_projects_project\``,
    );
    await queryRunner.query(`DROP TABLE \`user_projects_project\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_0edd32657c4a2a0f8c02f49fde\` ON \`user_posts_post\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1e37c6ee4e534594d10aeb9932\` ON \`user_posts_post\``,
    );
    await queryRunner.query(`DROP TABLE \`user_posts_post\``);
    await queryRunner.query(`DROP TABLE \`post\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9466682df91534dd95e4dbaa61\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`profile\``);
    await queryRunner.query(`DROP TABLE \`project\``);
  }
}
