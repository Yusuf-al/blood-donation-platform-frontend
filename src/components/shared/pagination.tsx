"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQueryFilter } from "@/hooks/query.hook";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    className,
}: PaginationProps) {
    const { updateQuery } = useQueryFilter();

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        updateQuery("page", String(page));
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div
            className={`flex items-center justify-between border-t border-slate-200 pt-4 ${className ?? ""}`}
        >
            <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-700">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                    {totalPages}
                </span>
            </p>

            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={currentPage <= 1}
                    onClick={() =>
                        goToPage(currentPage - 1)
                    }
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                        goToPage(currentPage + 1)
                    }
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}