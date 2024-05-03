import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./_helper/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductsItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductsItem = ({ product }: ProductsItemProps) => {
  return (
    <div className="w-[150px] max-w-[150px] space-y-2">
      <div className="relative w-full h-[150px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-md"
        />

        {product.discountPercentage && (
          <div className="absolute gap-[2px] left-2 top-2 bg-primary py-[2px] px-2 rounded-full text-white flex items-center">
            <ArrowDownIcon size={12}/>
            <span className="font-semibold text-xs">{product.discountPercentage}%</span>
          </div>
        )}
      </div>

      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="text-muted-foreground text-xs block">{product.restaurant.name}</span>
      </div>
    </div>
  );
};

export default ProductsItem;
