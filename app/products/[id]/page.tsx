import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import Header from "@/app/_components/header";
import Juices from "./_components/juices";

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="flex flex-col">
        <div id="headerProducts">
          <Header />
        </div>
        <div className="md:flex md:items-center md:gap-4 md:px-12 mt-10">
          <ProductImage product={product} />
          <ProductDetails product={product} complementaryProducts={juices} />
        </div>
      </div>
      <div id="JuicesDesktop">
        <Juices product={product} complementaryProducts={juices} />
      </div>
    </>
  );
};

export default ProductsPage;
