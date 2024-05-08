import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div>
      <Header />

      <div className="md:flex md:px-12">
        <div>
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        </div>

        <div className="w-full space-y-4 pt-1">
          <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5 md:static">
            {/* TITULO */}
            <div className="flex items-center gap-[0.375rem]">
              <div className="relative h-8 w-8">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  className="size-[100%] rounded-full object-cover md:w-[750px]"
                />
              </div>
              <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>

            <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">5.0</span>
            </div>
          </div>

          <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
          </div>
          <div className="mt-3 flex gap-4 overflow-x-scroll px-5 md:pt-1 [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[98px] rounded-lg bg-[#F4F4F4] text-center md:min-w-[105px]"
              >
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6">
            <h1 className="font-semibold pb-2">Sobre</h1>
            <span className="text-sm text-muted-foreground">
              O SushiDojo é uma joia gastronômica que transporta seus clientes
              para o coração do Japão, com sua atmosfera serena, design
              minimalista e um balcão de sushi onde mestres habilidosos preparam
              pratos autênticos com ingredientes frescos e selecionados,
              garantindo uma experiência culinária excepcional e memorável.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 pt-2">
        {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
        <h2 className="px-5 font-semibold md:px-12">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="px-5 font-semibold md:px-12">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
