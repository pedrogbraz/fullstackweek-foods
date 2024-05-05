import { Button } from "./ui/button";

interface MenuOptionsProps {
  icon: React.ReactNode,
  text: string,
}
const MenuOptions = ({icon, text}: MenuOptionsProps) => {
  return ( 
    <Button
    variant="ghost"
    className="w-full justify-start space-x-3 rounded-full hover:bg-primary hover:text-white"
  >
    {icon}
    <span className="block text-sm font-medium">{text}</span>
  </Button>
   );
}
 
export default MenuOptions;