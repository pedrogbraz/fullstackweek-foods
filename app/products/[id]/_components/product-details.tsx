"use client";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helper/price";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import {
  AlarmCheck,
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState > 1) {
        return currentState - 1;
      }
      return currentState;
    });

  return (
    <div className="z-50 relative mt-[-1.5rem] rounded-tl-3xl py-5 rounded-tr-3xl bg-white">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 text-xl font-semibold px-5">{product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBadge product={product} />}
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </p>
        </div>
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 border border-solid border-muted-foreground/40"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button
            size="icon"
            className="h-10 w-10"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="px-5">
        <Card className="flex justify-around py-3 bg-transparent mt-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <AlarmCheck size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {Number(product.restaurant.deliveryTimeMinutes)} min
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
