const RESTARANT_CATEGORIES = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
] as const;
const FILTER_CATEGORIES = ["전체", ...RESTARANT_CATEGORIES] as const;

export type RestaurantCategory = (typeof RESTARANT_CATEGORIES)[number];

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export interface Restaurant {
  id: string;
  category: RestaurantCategory;
  name: string;
  description: string;
}

export const isRestaurantCategory = (
  category: string,
): category is RestaurantCategory => {
  return (RESTARANT_CATEGORIES as readonly string[]).includes(category);
};
