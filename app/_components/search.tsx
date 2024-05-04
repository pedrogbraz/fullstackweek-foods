import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { SearchIcon } from "lucide-react";

const Search = () => {
  return ( 
    <div className="flex gap-2">
      <Input placeholder="Buscar restaurantes" className="border-none bg-[#F4F4F5]"/>
      <Button size="icon">
        <SearchIcon size={18}/>
      </Button>
    </div>
   );
}
 
export default Search;