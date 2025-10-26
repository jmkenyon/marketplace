import type { CollectionConfig } from 'payload'
import { tenantsArrayField} from '@payloadcms/plugin-multi-tenant/fields'

const defaultTenantField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    create: () => false,
    read: () => false,
    update: () => false,
  },
  tenantFieldAccess: {
    create: () => false,
    read: () => false,
    update: () => false,
  },
})  

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
     {
      name: "username",
      required: true,
      unique: true,
      type: "text",
     },
     {
      admin: {
        position: "sidebar"
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"]
     },
     {
      ...defaultTenantField,
      admin: {
        ...(defaultTenantField.admin || {}),
        position: "sidebar",
     }
    }
  ],
}
