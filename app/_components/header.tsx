"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  CupSoda,
  Fish,
  Grape,
  HeartIcon,
  HomeIcon,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

const Header = () => {

  const handleSignInClick = () => signIn();
  const { data } = useSession();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSignOutClick = () => setIsConfirmDialogOpen(true);
  const handleSignOutConfirm = () => {
    signOut();
    setIsConfirmDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-5 py-5 md:px-12">
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
            variant="outline"
            className="h-10 w-10 border-none bg-transparent"
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
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" className="w-9 h-9" onClick={handleSignInClick}>
                  <LogInIcon size={18} />
                </Button>
              </div>
            </>
          )}

          <div className="py-4">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
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

          <div className="py-4">
            <Separator />
          </div>

          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <Utensils size={16} />
              <span className="block">Pratos</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <Sandwich size={16} />
              <span className="block">Lanches</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <Pizza size={16} />
              <span className="block">Pizza</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <Fish size={16} />
              <span className="block">Japonesa</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <Grape size={16} />
              <span className="block">Sucos</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            >
              <CupSoda size={16} />
              <span className="block">Refrigerantes</span>
            </Button>
          </div>

          {data?.user && (
            <div className="py-4">
              <Separator />
            </div>
          )}

{data?.user && (
        <>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 rounded-full text-sm font-normal hover:bg-primary hover:text-white"
            onClick={handleSignOutClick}
          >
            <LogOutIcon size={16} />
            <span className="block">Sair da conta</span>
          </Button>
          <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja sair da conta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ao sair da conta, você será desconectado e não poderá acessar recursos exclusivos de usuários logados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleSignOutConfirm}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
