import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../../../react-query/contants";
import queryClient from "../../../react-query/queryClient";
import { Categories, Category } from "../types";

const getCategories = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/category`
  );
  return data.categories;
};

const addCategory = async (category: Category) => {
  const { name } = category;
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/category`,
    { name: name }
  );

  return data;
};

export const useCategories = () => {
  const fallback: Categories = [];

  const { data: categories = fallback, isLoading } = useQuery<Categories>({
    queryKey: [queryKeys.categories],
    queryFn: () => getCategories(),
  });

  return { categories, isLoading };
};

export const useAddCategory = () => {
  return useMutation(
    [queryKeys.categories],
    (category: Category) => addCategory(category),
    { onSuccess: () => queryClient.invalidateQueries([queryKeys.categories]) }
  );
};
