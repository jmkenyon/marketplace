import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Preço em reais (R$)",
      }
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
        name: "images",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "refundPolicy",
        type: "select",
        options: ["No Refunds", "30 Days", "60 Days"],
        defaultValue: "30 Days",
    },

  ],
};
