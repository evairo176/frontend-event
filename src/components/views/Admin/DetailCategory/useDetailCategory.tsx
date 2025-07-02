import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);

    return data?.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["category", query?.id as string],
    queryFn: () => getCategoryById(query?.id as string),
    enabled: isReady,
  });

  return {
    dataCategory,
  };
};

export default useDetailCategory;
