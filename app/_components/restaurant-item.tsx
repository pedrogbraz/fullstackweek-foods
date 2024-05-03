import Image from "next/image";

import { Restaurant } from "@prisma/client";

import { formatCurrency } from "./_helper/price";
import {
  AlarmCheck,
  BikeIcon,
  HeartIcon,
  StarIcon,
} from "lucide-react";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        <div className="flex">
          <div className="text-gray absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-3 py-1.5">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 duration-300"
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex items-center gap-3 pt-1">
          <div className="flex gap-2">
            <span className="flex items-center text-[14px] text-muted-foreground">
              <BikeIcon size={14} className="text-primary" />
            </span>
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega Grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlarmCheck size={14} className="text-primary" />
              {Number(restaurant.deliveryTimeMinutes)} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
