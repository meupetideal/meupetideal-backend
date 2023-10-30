-- CreateTable
CREATE TABLE "animal_photos" (
    "id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "animal_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animal_photos" ADD CONSTRAINT "animal_photos_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
