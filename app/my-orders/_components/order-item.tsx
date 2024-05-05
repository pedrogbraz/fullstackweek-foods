"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "CONFIRMED":
      return "Confirmado";
    case "PREPARING":
      return "Preparando";
    case "DELIVERING":
      return "Em Trasporte";
    case "COMPLETED":
      return "Entregue";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        {order.status === "CANCELED" && (
          <div className="foregound w-fit rounded-full bg-[#B22222] px-2 py-1 text-white">
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}

        {order.status === "CONFIRMED" && (
          <div className="foregound w-fit rounded-full bg-[#008000] px-2 py-1 text-white">
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}
        
        {order.status === "PREPARING" && (
          <div className="foregound w-fit rounded-full bg-[#FFD700] px-2 py-1 text-white">
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}

        {order.status === "DELIVERING" && (
          <div className="foregound w-fit rounded-full bg-[#4169E1] px-2 py-1 text-white">
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}

        {order.status === "COMPLETED" && (
          <div className="foregound w-fit rounded-full bg-[#32CD32] px-2 py-1 text-white">
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="font-semibold">{order.restaurant.name}</span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5">
            <ChevronRightIcon />
          </Button>
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center space-x-[6px]">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-2">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs">{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant="ghost"
            className="text-xs text-primary hover:bg-primary hover:text-white"
            disabled={order.status !== "COMPLETED"}
          >
            Refazer Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
