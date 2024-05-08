import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  // Buscar as sete categorias exclusivas do banco de dados
  const categories = await db.category.findMany({
    distinct: ["name"], // Garantir que as categorias sejam exclusivas
    take: 7 // Limitar a consulta para retornar apenas 7 categorias
  });

  return (
    <div className="flex gap-4 md:justify-center">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
