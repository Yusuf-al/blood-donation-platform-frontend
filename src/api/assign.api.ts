import apiClinet from "@/lib/apiClient";

export function newAssignmentApi(payload: {
  requestId: string;
  donorId: string;
}) {
  return apiClinet("/donation/new-assignment", {
    method: "POST",
    credentials: "include",
    body: payload,
  });
}

export function AllAssignmentsApi() {
  return apiClinet("/donation/all", {
    credentials: "include",
  });
}
