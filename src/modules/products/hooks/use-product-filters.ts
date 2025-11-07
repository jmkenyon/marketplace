import { useQueryStates, parseAsArrayOf, parseAsString, parseAsStringLiteral } from "nuqs";

const sortValues = ["selecionado", "em alta", "novo"] as const;


const params = {
  search: parseAsString
  .withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  sort: parseAsStringLiteral(sortValues).withDefault("selecionado"),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true,
  })
  .withDefault([]),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};

