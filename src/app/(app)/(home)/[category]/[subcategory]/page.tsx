interface PageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}
const Page = async ({ params }: PageProps) => {
  const { category, subcategory } = await params;
  return (
  <div>
    Categoria: {category}
    <br />
    Subcategoria: {subcategory}
  </div>
  )
};

export default Page;
