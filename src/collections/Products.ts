import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Produto",
    plural: "Produtos",
  },
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted);
    },

    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description: "Você precisa verificar sua conta antes de criar um produto.",
  },
  fields: [
    {
      name: "name",
      label: "Nome do Produto",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Descrição do Produto",
      type: "richText",
    },
    {
      name: "price",
      label: "Preço do Produto",
      type: "number",
      required: true,
      admin: {
        description: "Preço em reais (R$)",
      },
    },

    {
      name: "category",
      label: "Categoria do Produto",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      label: "Tags do Produto",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },

    {
      name: "image",
      label: "Imagem do Produto",
      admin: {
        description:
          "Imagem do produto exibida na lista e na página do produto. Recomendado: formato quadrado (1:1), ex: 800x800px ou 1600x1600px",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "cover",
      label: "Imagem de Capa do Produto",
      admin: {
        description:
          "Imagem maior exibida na página do produto. Recomendada dimensão: 1920x480px (proporção 4:1).",
      },
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      label: "Política de Reembolso",
      type: "select",
      options: ["No Refunds", "30 dias", "60 dias"],
      defaultValue: "30 dias",
    },
    {
      name: "content",
      label: "Conteúdo do Produto",
      type: "richText",

      admin: {
        description:
          "Conteúdo exclusivo para clientes que compraram. Adicione documentação do produto, arquivos, guias e materiais bônus. Suporte a Markdown.",
      },
    },
    {
      name: "isArchived",
      label: "Arquivar Produto",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Arquive produtos que não estão mais disponíveis para venda. Produtos arquivados não aparecem na loja, mas permanecem acessíveis para clientes existentes.",
      },
    },
    {
      name: "isPrivate",
      label: "Produto Privado",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "Se marcado, este produto não será exibido na vitrine pública.",
      },
    },
  ],
};
