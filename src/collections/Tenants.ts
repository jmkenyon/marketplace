import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  labels: {
    singular: "Loja",
    plural: "Lojas",
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Nome da Loja",
      admin: {
        description: "Nome da loja exibido para os usuários.",
      },
    },
    {
      name: "slug",
      label: "URL da Loja",
      type: "text",
      index: true,
      required: true,
      unique: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "Identificador único para a loja, usado na URL (ex: [minha-loja].learnly.com).",
      },
    },
    {
      name: "image",
      label: "Imagen do produto",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      label: "ID da conta Stripe",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "ID da conta Stripe associada a esta loja.",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      label: "Detalhes do Stripe enviados",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "Você não pode criar produtos até enviar seus dados do Stripe.",
      },
    },
  ],
};
