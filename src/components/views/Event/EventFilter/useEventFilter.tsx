import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
  categoryId: yup.string().required("Please select category"),

  isFeatured: yup.string().required("Please select featured"),
  isOnline: yup.string().required("Please select online or offline"),
});
const useEventFilter = () => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  return {
    control,
    dataCategory,
    isLoadingCategory,
    isSuccessCategory,
    setValue,
    reset,
  };
};

export default useEventFilter;
