/*
  Warnings:

  - A unique constraint covering the columns `[animal_id,user_id]` on the table `interests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "interests_animal_id_user_id_key" ON "interests"("animal_id", "user_id");
