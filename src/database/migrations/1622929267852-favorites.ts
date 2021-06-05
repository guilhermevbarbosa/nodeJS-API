import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class favorites1622929267852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorites",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "job_id",
                        type: "varchar",
                    }
                ],
                foreignKeys: [
                    {
                        name: "userOwnerId",
                        referencedTableName: "users",
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "favoritedJobId",
                        referencedTableName: "services",
                        referencedColumnNames: ['id'],
                        columnNames: ['job_id'],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('favorites');
    }

}
