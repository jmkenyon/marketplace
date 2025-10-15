import configPromise from "@payload-config";
import { getPayload } from "payload";

import Footer from "./footer";
import Navbar from "./navbar";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate categories
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs
  .map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      ...(sub as Category),
      subcategories: undefined,
    })),
  }))
  .sort((a, b) => {
    if (a.name.toLowerCase() === "todos") return -1;      // "Todos" first
    if (b.name.toLowerCase() === "todos") return 1;
    if (a.name.toLowerCase() === "outros") return 1;      // "Outros" last
    if (b.name.toLowerCase() === "outros") return -1;
    return a.name.localeCompare(b.name);                  // alphabetical in-between
  });



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData}/>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
