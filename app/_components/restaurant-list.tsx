import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurant = await db.restaurant.findMany({});
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 ">
      {restaurant.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
