import { clear } from "console";
import {
  createLoader,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortValues = ["selecionado", "em alta", "novo"] as const;

const params = {
  search: parseAsString
  .withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  sort: parseAsStringLiteral(sortValues).withDefault("selecionado"),
  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};

export const loadProductFilters = createLoader(params);
