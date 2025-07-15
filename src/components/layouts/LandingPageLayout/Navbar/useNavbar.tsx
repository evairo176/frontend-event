import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useNavbar = () => {
  const { isReady } = useRouter();
  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: isReady,
  });
  return {
    dataProfile,
    refetchProfile,
  };
};

export default useNavbar;
