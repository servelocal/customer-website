-- CreateEnum
CREATE TYPE "DayOfWeekEnum" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- CreateTable
CREATE TABLE "activity" (
    "activity_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(255),
    "sub_category" VARCHAR(255),
    "rating" DECIMAL(3,1),
    "price" DECIMAL(7,2),
    "location_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" SERIAL NOT NULL,
    "city_name" VARCHAR(255) NOT NULL,
    "county_id" INTEGER NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" SERIAL NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "website" VARCHAR(255),
    "email_address" VARCHAR(255),

    CONSTRAINT "contact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "county" (
    "county_id" SERIAL NOT NULL,
    "county_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "county_pkey" PRIMARY KEY ("county_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "street_address" VARCHAR(255) NOT NULL,
    "post_code" VARCHAR(255),
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "timeslot" (
    "timeslot_id" SERIAL NOT NULL,
    "day_of_week" "DayOfWeekEnum" NOT NULL,
    "opening_time" TIME(6) NOT NULL,
    "closing_time" TIME(6) NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "timeslot_pkey" PRIMARY KEY ("timeslot_id")
);

-- CreateIndex
CREATE INDEX "idx_activity_category" ON "activity"("category");

-- CreateIndex
CREATE INDEX "idx_activity_contact_id" ON "activity"("contact_id");

-- CreateIndex
CREATE INDEX "idx_activity_location_id" ON "activity"("location_id");

-- CreateIndex
CREATE INDEX "idx_activity_name" ON "activity"("name");

-- CreateIndex
CREATE INDEX "idx_city_county_id" ON "city"("county_id");

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
ALTER TABLE "timeslot" ADD CONSTRAINT "fk_activity" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE CASCADE ON UPDATE NO ACTION;

