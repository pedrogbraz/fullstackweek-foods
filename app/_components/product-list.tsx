import { db } from "../_lib/prisma";
import ProductItem  from "./products-item";

const ProductList = async () => {
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
   <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
   </div>
  );
};

export default ProductList;
