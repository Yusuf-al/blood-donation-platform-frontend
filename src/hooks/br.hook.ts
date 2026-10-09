import { allBloodRequestApi, newBloodRequestApi } from "@/api/br.api";
import { IRequestQuery } from "@/types/donor.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBloodRequest() {
  return useMutation({
    mutationFn: newBloodRequestApi,
  });
}

export function useGetBloodRequest(query: IRequestQuery | null) {
  return useQuery({
    queryKey: ["blood-requests", query],
    queryFn: () => allBloodRequestApi(query),
    placeholderData: (previousData) => previousData,
    retry: false,
  });
}
