import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 borber-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
        {session.data?.user ? (
        <div className="border-t">

            <Link 
              href="/admin"
                  className="w-full text-left p-4 bg-black text-white flex items-center text-base font-medium"
              >Painel
            </Link>
      
        </div>
      ) : (
          <div className="border-t">
            <Link
              href="/entrar"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
                Entrar
            </Link>
            <Link
              href="/cadastrar-se"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
                Comece a vender
            </Link>
          </div>
      )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
