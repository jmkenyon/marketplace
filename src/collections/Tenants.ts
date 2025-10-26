import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
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
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description:
          "Identificador único para a loja, usado na URL (ex: [minha-loja].learnly.com).",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "stripeDetailsSubmiited",
      type: "checkbox",
      admin: {
        description:
          "Você não pode criar produtos até enviar seus dados do Stripe.",
        readOnly: true,
      },
    },
  ],
};
