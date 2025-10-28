"use client";

import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
// import { CartButton } from "../components/cart-button";
import dynamic from "next/dynamic";

const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  { 
    ssr: false,
    loading: () => <Button className="flex-1 bg-green-400" disabled>Carregando...</Button>,
  }
)

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url || "/placeholder-image.png"} // change to data.cover?.url if want two images, one cover + one product
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{data.name}</h1>
            </div>
            <div className="border-y flex ">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="px-2 py-1 border bg-emerald-400 w-fit">
                  <p className="text-base font-medium">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2"
                >
                  {data.tenant.image?.url && (
                    <Image
                      alt={data.tenant.name}
                      src={data.tenant.image.url}
                      width={20}
                      height={20}
                      className="border shrink-0 rounded-full size-[20px]"
                    />
                  )}
                  <p className="text-base underline font-medium">
                    {data.tenant.name}
                  </p>
                </Link>
              </div>
              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-1"></div>
                <StarRating rating={4} iconClassName="size-4" />
              </div>
            </div>

            <div className="block lg:hidden px-6 py-4 items-center justify-center border-b">
              <div className="flex items-center gap-1">
                <StarRating rating={4} iconClassName="size-4" />
                <p className="text-base font-medium">{5} avaliações</p>
              </div>
            </div>

            <div className="p-6">
              {data.description ? (
                <p className="text-base">{data.description}</p>
              ) : (
                <p className="text-medium text-muted-foreground italic">
                  Sem descrição
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l h-full">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex flex-row items-center gap-2">
                  <CartButton
                      productId={data.id}
                      tenantSlug={tenantSlug}
                    />
                  <Button
                    className="size-12"
                    variant="elevated"
                    onClick={() => {}}
                    disabled={false}
                  >
                    <LinkIcon />
                  </Button>
                </div>
                <p className="text-center font-medium">
                  {data.refundPolicy === "No Refunds"
                    ? "Sem reembolso"
                    : `Garantia de reembolso em ${data.refundPolicy}`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Avaliações</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base">{5} avaliações</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-3">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <Fragment key={star}>
                      <div className="font-medium">
                        {star} {star === 1 ? "strela" : "estrelas"}
                      </div>
                      <Progress 
                        value={5}
                        className="h-[1lh]"
                      />
                      <div className="font-medium">
                        {5}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
