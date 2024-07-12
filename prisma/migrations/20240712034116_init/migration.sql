/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
