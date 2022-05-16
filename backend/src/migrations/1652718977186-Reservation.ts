import {MigrationInterface, QueryRunner} from "typeorm";

export class Reservation1652718977186 implements MigrationInterface {
    name = 'Reservation1652718977186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkInDate" TIMESTAMP WITH TIME ZONE NOT NULL, "checkOutDate" TIMESTAMP WITH TIME ZONE NOT NULL, "guestsAmount" integer NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "country" text NOT NULL, "city" text NOT NULL, "address" text NOT NULL, "postalCode" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
