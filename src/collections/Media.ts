import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    // Only allow the uploader (or superadmin) to read their own media
    read: ({ req }) => {
      const user = req.user;

      if (!user) return false;
      if (isSuperAdmin(user)) return true;

      // Return filter: user can only see their own uploads
      return {
        createdBy: {
          equals: user.id,
        },
      };
    },

    // Everyone can upload (create)
    create: ({ req }) => !!req.user,

    // Only uploader or superadmin can delete
    delete: ({ req }) => {
      const user = req.user;
      if (!user) return false;
      if (isSuperAdmin(user)) return true;

      return {
        createdBy: {
          equals: user.id,
        },
      };
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        readOnly: true,
      },
      defaultValue: ({ user }) => user?.id,
    },
  ],
  upload: true,
};