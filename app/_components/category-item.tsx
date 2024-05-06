import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md md:px-6"
    >
      <div className="relative size-7">
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        className="object-contain"
      />
      </div>

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;