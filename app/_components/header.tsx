"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  CupSoda,
  Fish,
  Grape,
  HeartIcon,
  HomeIcon,
  IceCream,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Pizza,
  Sandwich,
  ScrollTextIcon,
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
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="w-9 h-9 hover:bg-primary hover:text-white duration-300"
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
              <div className="flex items-center justify-between pt-10">
                <h2 className="px-4 font-semibold">Olá. Faça seu login!</h2>
                <Button
                  className="h-9 w-9"
                  size="icon"
                  onClick={handleSignInClick}
                >
                  <LogInIcon size={18} />
                </Button>
              </div>
            </>
          )}

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
            >
              <HomeIcon size={16} />
              <Link href="/">
                <span className="block">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-3">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-orders">
                <Utensils size={16} />
                <span className="block">Pratos</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <Sandwich size={16} />
                <span className="block">Lanches</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <Pizza size={16} />
                <span className="block">Pizza</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <Fish size={16} />
                <span className="block">Japonesa</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <IceCream size={16} />
                <span className="block">Sobremesas</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <Grape size={16} />
                <span className="block">Sucos</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <CupSoda size={16} />
                <span className="block">Refrigerantes</span>
              </Link>
            </Button>
          </div>

          {data?.user && (
            <div className="py-3">
              <Separator />
            </div>
          )}

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal  duration-150 hover:bg-primary hover:text-white"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
