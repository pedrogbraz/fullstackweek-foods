"use client"

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>;
}

const ProductImage = ({product}: ProductImageProps) => {

  const router = useRouter();
  const handleBackClick = () => router.back();

  return ( 
    <div className="relative h-[360px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
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
      </div>
   );
}
 
export default ProductImage;