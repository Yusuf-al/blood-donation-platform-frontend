"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface QueryValues {
  [key: string]: string | null | undefined;
}

export function useQueryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || !value.trim()) {
      params.delete(key);
    } else {
      params.set(key, value.trim());
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const updateQueries = (values: QueryValues) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === undefined || !value.trim()) {
        params.delete(key);
      } else {
        params.set(key, value.trim());
      }
    });

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const getQuery = (key: string) => {
    return searchParams.get(key) || "";
  };

  return {
    updateQuery,
    updateQueries,
    getQuery,
  };
}
