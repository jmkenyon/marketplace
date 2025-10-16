export type CleanCategory = {
    name: string;
    slug: string;
    color?: string | null;
    subcategories?: CleanCategory[];
  };