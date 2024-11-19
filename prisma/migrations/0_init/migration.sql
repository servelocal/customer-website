-- Enable the uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "DayOfWeekEnum" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "activity" (
    "activity_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "sub_category" TEXT,
    "rating" DECIMAL(3,1),
    "tags" TEXT[],
    "price" DECIMAL(7,2),
    "location_id" UUID NOT NULL,
    "contact_id" UUID NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "city_name" TEXT NOT NULL,
    "county_id" UUID NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "phone_number" VARCHAR(15) NOT NULL,
    "website" TEXT,
    "email_address" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "county" (
    "county_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "county_name" TEXT NOT NULL,

    CONSTRAINT "county_pkey" PRIMARY KEY ("county_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "street_address" TEXT NOT NULL,
    "post_code" VARCHAR(20),
    "city_id" UUID NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "special_days" (
    "special_day_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "special_date" DATE NOT NULL,
    "opening_time" TIME(6) NOT NULL,
    "closing_time" TIME(6) NOT NULL,
    "activity_id" UUID NOT NULL,

    CONSTRAINT "special_days_pkey" PRIMARY KEY ("special_day_id")
);

-- CreateTable
CREATE TABLE "timeslot" (
    "timeslot_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "day_of_week" INTEGER NOT NULL,
    "opening_time" TIME(6) NOT NULL,
    "closing_time" TIME(6) NOT NULL,
    "activity_id" UUID NOT NULL,

    CONSTRAINT "timeslot_pkey" PRIMARY KEY ("timeslot_id")
);

-- CreateIndex
CREATE INDEX "idx_activity_category" ON "activity"("category");

-- CreateIndex
CREATE INDEX "idx_activity_name" ON "activity"("name");

-- CreateIndex
CREATE INDEX "idx_activity_tags" ON "activity" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "idx_city_county_id" ON "city"("county_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_city_county" ON "city"("city_name", "county_id");

-- CreateIndex
CREATE UNIQUE INDEX "county_county_name_key" ON "county"("county_name");

-- CreateIndex
CREATE INDEX "idx_location_city_id" ON "location"("city_id");

-- CreateIndex
CREATE INDEX "idx_timeslot_activity_id" ON "timeslot"("activity_id");

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "fk_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("contact_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "fk_location" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "fk_county" FOREIGN KEY ("county_id") REFERENCES "county"("county_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "fk_city" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "special_days" ADD CONSTRAINT "fk_activity_special_days" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "timeslot" ADD CONSTRAINT "fk_activity" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE CASCADE ON UPDATE NO ACTION;

