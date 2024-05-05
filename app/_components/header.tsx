"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  CupSoda,
  Fish,
  Grape,
  Heart,
  HomeIcon,
  IceCream,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Pizza,
  Sandwich,
  ScrollText,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import MenuOptions from "./menu-options";

const Header = () => {
  const { data, status } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  return (
    <div className="flex justify-between bg-white px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-6">
                <h2 className="font-semibold">Faça seu login</h2>
                <Button
                  size="icon"
                  className="h-10 w-10"
                  onClick={handleSignInClick}
                >
                  <LogInIcon size={18} />
                </Button>
              </div>
            </>
          )}

          <div className="py-4">
            <Separator className="h-[2px] rounded-full bg-muted" />
          </div>

          <div className="space-y-2">
            <MenuOptions icon={<HomeIcon size={16} />} text="Início" />
            {data?.user && (
              <>
                <MenuOptions
                  icon={<ScrollText size={16} />}
                  text="Meus Pedidos"
                />
                <MenuOptions
                  icon={<Heart size={16} />}
                  text="Restaurantes Favoritos"
                />
              </>
            )}
          </div>

          <div className="py-3">
            <Separator className="h-[2px] rounded-full bg-muted" />
          </div>

          <div className="space-y-2">
            <MenuOptions icon={<Utensils size={16} />} text="Pratos" />
            <MenuOptions icon={<Sandwich size={16} />} text="Lanches" />
            <MenuOptions icon={<Pizza size={16} />} text="Pizza" />
            <MenuOptions icon={<Fish size={16} />} text="Japonesa" />
            <MenuOptions icon={<IceCream />} text="Sobremesas" />
            <MenuOptions icon={<Grape size={16} />} text="Sucos" />
            <MenuOptions icon={<CupSoda size={16} />} text="Refrigerantes" />
          </div>

          <div className="py-3">
            <Separator className="h-[2px] rounded-full bg-muted" />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full hover:bg-primary hover:text-white"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={18} />
              <span className="block text-sm font-medium">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
