"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <>
      <div className="md:flex">
        <div className="relative h-[360px] w-full  md:h-[500px] md:w-[600px] md:rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="100%"
            className="object-cover md:rounded-lg"
          />

          <Button
            className="absolute left-4 top-4 h-10 w-10 rounded-full bg-white text-foreground duration-300 hover:text-white md:hidden"
            size="icon"
            onClick={handleBackClick}
          >
            <ChevronLeftIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductImage;
