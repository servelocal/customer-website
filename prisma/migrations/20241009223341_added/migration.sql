/*
  Warnings:

  - You are about to drop the column `type` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "type",
ADD COLUMN     "category" VARCHAR(40),
ADD COLUMN     "community_id" INTEGER;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "community_id" INTEGER;

-- CreateTable
CREATE TABLE "communities" (
    "community_id" SERIAL NOT NULL,
    "community_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("community_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "communities_community_name_key" ON "communities"("community_name");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("community_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "community_id" FOREIGN KEY ("community_id") REFERENCES "communities"("community_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
