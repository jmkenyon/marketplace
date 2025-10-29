import { getPayload } from "payload"
import config from "@/payload.config"

const categories = [
    {
      name: "Todos",
      slug: "todos",
    },
    {
      name: "E-books & Guias",
      color: "#FFB347",
      slug: "ebooks-guias",
      subcategories: [
        { name: "E-books", slug: "ebooks" },
        { name: "Guias Práticos", slug: "guias-praticos" },
        { name: "Templates de E-book", slug: "templates-ebook" },
        { name: "Publicação Digital", slug: "publicacao-digital" },
      ],
    },
    {
      name: "Desenvolvimento",
      color: "#7EC8E3",
      slug: "desenvolvimento",
      subcategories: [
        { name: "Web", slug: "web" },
        { name: "Mobile", slug: "mobile" },
        { name: "Games", slug: "games" },
        { name: "DevOps", slug: "devops" },
        { name: "Linguagens", slug: "linguagens" },
      ],
    },
    {
      name: "Design & Criatividade",
      color: "#B5B9FF",
      slug: "design-criatividade",
      subcategories: [
        { name: "UI/UX", slug: "ui-ux" },
        { name: "Branding", slug: "branding" },
        { name: "Templates", slug: "templates" },
        { name: "Ilustração Digital", slug: "ilustracao-digital" },
      ],
    },
    {
      name: "Marketing & Vendas",
      color: "#FF9AA2",
      slug: "marketing-vendas",
      subcategories: [
        { name: "Copywriting", slug: "copywriting" },
        { name: "Tráfego Pago", slug: "trafego-pago" },
        { name: "Branding Digital", slug: "branding-digital" },
        { name: "Funis de Venda", slug: "funis-venda" },
      ],
    },
    {
      name: "Produtividade & Carreira",
      color: "#96E6B3",
      slug: "produtividade-carreira",
      subcategories: [
        { name: "Freelancers", slug: "freelancers" },
        { name: "Organização", slug: "organizacao" },
        { name: "Portfólios", slug: "portfolios" },
        { name: "Gestão de Tempo", slug: "gestao-tempo" },
      ],
    },
    {
      name: "Negócios & Empreendedorismo",
      color: "#FFE066",
      slug: "negocios",
      subcategories: [
        { name: "Finanças", slug: "financas" },
        { name: "Produtos Digitais", slug: "produtos-digitais" },
        { name: "Precificação", slug: "precificacao" },
        { name: "Monetização", slug: "monetizacao" },
      ],
    },
    {
      name: "Educação & Idiomas",
      color: "#D8B5FF",
      slug: "educacao",
      subcategories: [
        { name: "Idiomas", slug: "idiomas" },
        { name: "Inglês", slug: "ingles" },
        { name: "Aprendizado Rápido", slug: "aprendizado-rapido" },
      ],
    },
    {
      name: "Bem-estar Digital",
      color: "#FFCAB0",
      slug: "bem-estar",
      subcategories: [
        { name: "Mindfulness", slug: "mindfulness" },
        { name: "Rotina Saudável", slug: "rotina-saudavel" },
        { name: "Produtividade Mental", slug: "produtividade-mental" },
      ],
    },
    {
      name: "Outros",
      slug: "outros",
    },
  ]

const seed = async () => {
    const payload = await getPayload({ config })

    const adminTenant = await payload.create({
        collection: 'tenants',
        data: {
            name: 'admin',
            slug: 'admin',
            stripeAccountId: 'test-account-id-admin'
        }
    })

    await payload.create({
      collection: "users",
      data: {
        email: "oi@learnly.com.br",
        password: "Learnly123!",
        roles: ["super-admin"],
        username: "admin",
        tenants: [
          {
            tenant: adminTenant.id,
          },
        ]
      }
    })

    for (const category of categories) {
        const parentCategory = await payload.create({
            collection: 'categories',
            data: {
                name: category.name,
                slug: category.slug,
                color: category.color,
                parent: null
            }
        })

        for (const subCategory of category.subcategories || []) {
            await payload.create({
                collection: 'categories',
                data: {
                    name: subCategory.name,
                    slug: subCategory.slug,
                    parent: parentCategory.id
                }
            })
        }
    }
}

try {
    await seed();
    console.log('Seeding completed successfully.');
    process.exit(0)
} catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1)
}