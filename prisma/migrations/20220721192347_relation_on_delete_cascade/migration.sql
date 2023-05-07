-- DropForeignKey
ALTER TABLE "item_permission" DROP CONSTRAINT "item_permission_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item_permission" DROP CONSTRAINT "item_permission_user_id_fkey";

-- DropForeignKey
ALTER TABLE "list_permission" DROP CONSTRAINT "list_permission_list_id_fkey";

-- DropForeignKey
ALTER TABLE "list_permission" DROP CONSTRAINT "list_permission_user_id_fkey";

-- AddForeignKey
ALTER TABLE "list_permission" ADD CONSTRAINT "list_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_permission" ADD CONSTRAINT "list_permission_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_permission" ADD CONSTRAINT "item_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_permission" ADD CONSTRAINT "item_permission_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
