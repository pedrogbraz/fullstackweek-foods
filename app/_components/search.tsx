"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { SearchIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none bg-[#F4F4F5]"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={18} />
      </Button>
    </form>
  );
};

export default Search;
