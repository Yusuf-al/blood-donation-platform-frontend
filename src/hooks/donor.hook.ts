import { becomeDonorApi } from "@/api/donor.api";
import { useMutation } from "@tanstack/react-query";

export function useBecomeDonor() {
  return useMutation({
    mutationFn: becomeDonorApi,
  });
}
