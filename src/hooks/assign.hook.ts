import { AllAssignmentsApi } from "@/api/assign.api";
import { useQuery } from "@tanstack/react-query";

export function useAllAssignment() {
  return useQuery({
    queryKey: ["assigments-data"],
    queryFn: AllAssignmentsApi,
    retry: false,
  });
}
