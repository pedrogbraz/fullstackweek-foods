import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  // Pegar categorias do banco de dados
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        // Renderizar um item para cada categoria
        <CategoryItem key={category.id} category={category}/>
      ))}
    </div>
  );
};

export default CategoryList;
