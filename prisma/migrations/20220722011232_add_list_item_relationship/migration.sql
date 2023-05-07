-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
