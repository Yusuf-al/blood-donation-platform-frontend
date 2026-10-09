import { AllAssignmentsApi, donationRecordApi } from "@/api/assign.api";
import { useQuery } from "@tanstack/react-query";

export function useAllAssignment() {
  return useQuery({
    queryKey: ["assigments-data"],
    queryFn: AllAssignmentsApi,
    retry: false,
  });
}

export function useDonationRecords() {
  return useQuery({
    queryKey: ["donation-records"],
    queryFn: donationRecordApi,
    retry: false,
  });
}
