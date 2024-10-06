-- CreateTable
CREATE TABLE "cities" (
    "city_id" SERIAL NOT NULL,
    "city_name" VARCHAR(255) NOT NULL,
    "county_id" INTEGER,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "counties" (
    "county_id" SERIAL NOT NULL,
    "county_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "counties_pkey" PRIMARY KEY ("county_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2),
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "thumbnail" VARCHAR(255),
    "banner" VARCHAR(255),
    "type" VARCHAR(40),
    "service_id" INTEGER,
    "location_id" INTEGER,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "street_address" VARCHAR(255) NOT NULL,
    "post_code" VARCHAR(255),
    "city_id" INTEGER,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "services" (
    "service_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255),

    CONSTRAINT "services_pkey" PRIMARY KEY ("service_id")
);

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_county_id_fkey" FOREIGN KEY ("county_id") REFERENCES "counties"("county_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

