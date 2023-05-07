/*
  Warnings:

  - A unique constraint covering the columns `[item_id,user_id]` on the table `item_permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[list_id,user_id]` on the table `list_permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "item_permission_item_id_user_id_key" ON "item_permission"("item_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_permission_list_id_user_id_key" ON "list_permission"("list_id", "user_id");
