import { getPayload } from "payload";
import config from "@/payload.config";
import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "Todos",
    slug: "todos",
  },
  {
    name: "E-books",
    color: "#FFB347",
    slug: "ebooks",
    subcategories: [],
  },
  {
    name: "Cursos",
    color: "#7EC8E3",
    slug: "cursos",
    subcategories: [],
  },
  {
    name: "Produtos digitais",
    color: "#FF9AA2",
    slug: "produtos-digitais",
    subcategories: [],
  },
  // {
  //   name: "Outros",
  //   slug: "outros",
  // },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const adminAccount = await stripe.accounts.create({});

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    },
  });

  await payload.create({
    collection: "users",
    data: {
      email: "oi@formara.com.br",
      password: "Formara123!",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    // for (const subCategory of category.subcategories || []) {
    //     await payload.create({
    //         collection: 'categories',
    //         data: {
    //             name: subCategory.name,
    //             slug: subCategory.slug,
    //             parent: parentCategory.id
    //         }
    //     })
    // }
  }
};

try {
  await seed();
  console.log("Seeding completed successfully.");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding:", error);
  process.exit(1);
}
