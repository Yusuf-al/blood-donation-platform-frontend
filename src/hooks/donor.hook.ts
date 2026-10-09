import { becomeDonorApi, getAllDonorApi } from "@/api/donor.api";
import { IDonorQuery } from "@/types/donor.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBecomeDonor() {
  return useMutation({
    mutationFn: becomeDonorApi,
  });
}

export function useDonors(query: IDonorQuery | null) {
  return useQuery({
    queryKey: ["all-donors", query],
    queryFn: () => getAllDonorApi(query),
    placeholderData: (previousData) => previousData,
  });
}
