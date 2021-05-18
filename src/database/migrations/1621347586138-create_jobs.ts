import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createJobs1621347586138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
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
                        name: 'name',
                        type: "varchar(200)"
                    },
                    {
                        name: 'description',
                        type: "varchar"
                    },
                    {
                        name: 'category',
                        type: "varchar(45)"
                    },
                    {
                        name: 'aprox_val',
                        type: "varchar(20)"
                    },
                ],
                foreignKeys: [
                    {
                        name: "userOwnerId",
                        referencedTableName: "users",
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}
