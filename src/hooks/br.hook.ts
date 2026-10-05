import { newBloodRequestApi } from "@/api/br.api";
import { useMutation } from "@tanstack/react-query";

export function useBloodRequest() {
  return useMutation({
    mutationFn: newBloodRequestApi,
  });
}
