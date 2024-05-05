-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
