import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import { CarouselSize } from "./_components/carousel";

const fetch = async () => {
  const getProducts = db.product.findMany({
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
        },
      },
    },
  });

  const getBurguersCategory = db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <>
      <Header />
      <div className="px-5 pt-6 md:hidden">
        <Search />
      </div>
      <div className="h-[500px] w-full justify-around bg-primary" id="content">
        <div className="space-y-8 px-12 py-32">
          <h1 className="text-5xl font-bold text-white">Está com fome?</h1>
          <span className="text-lg text-white">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </span>

          <div className="h-[88px] w-[658px] max-w-[658px] rounded-lg bg-white p-6">
            <Search />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 md:px-12">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 md:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-pizza.png"
            alt="Até 30% de desconto em pizzas!"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 md:px-12">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6 md:hidden">
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-burguer.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="my-5 flex gap-5 px-5 pt-6 md:px-12" id="xs">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-pizza.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/promo-banner-burguer.png"
            alt="A partir de R$17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5 md:px-12">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
