"use client"

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, HeartIcon } from "lucide-react";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>;
}

const RestaurantImage = ({restaurant}: RestaurantImageProps) => {

  const router = useRouter();
  const handleBackClick = () => router.back();

  return ( 
    <div className="relative h-[250px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <Button
          size="icon"
          className="absolute left-4 top-4 h-10 w-10 rounded-full bg-white text-foreground duration-300 hover:text-white"
          onClick={handleBackClick}
        >
          <ChevronLeft size={18} />
        </Button>

        <Button
            size="icon"
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-gray-700"
          >
            <HeartIcon size={20} className="fill-white" />
          </Button>
      </div>
   );
}
 
export default RestaurantImage;