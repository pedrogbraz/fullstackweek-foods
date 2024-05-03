import Image from "next/image";

import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";

import { ChevronRightIcon } from "lucide-react";

import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        }
      },
    }
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner src="/banner-pizza.png" alt="Até 30% de desconto em pizzas." height={0} />
      </div>

      <div className="pt-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit duration-300">
            Ver Todos <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products}/>
      </div>

      <div className="px-5 pt-6">
      <PromoBanner src="/banner-burguer.png" alt="Lanches a partir de R$17,90." height={100} />
      </div>
    </>
  );
};

export default Home;
