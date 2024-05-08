"use client";

import ProductList from "@/app/_components/product-list";
import { Prisma } from "@prisma/client";

interface JuicesProps {
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

const Juices = ({
  complementaryProducts,
}: JuicesProps) => {

  return (
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold md:px-12">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
  );
};

export default Juices;
