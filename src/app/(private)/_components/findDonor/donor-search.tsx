"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryFilter } from "@/hooks/query.hook";

interface DonorSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function DonorSearch() {

    const { getQuery, updateQuery } = useQueryFilter()

    const searchTerm = getQuery('searchTerm')
    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
                value={searchTerm}
                onChange={(event) => updateQuery("searchTerm", event.target.value)}
                placeholder="Search donors by name or location..."
                className="h-12 rounded-xl border-slate-200 bg-white pl-12 pr-12"
            />

            {searchTerm && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuery("searchTerm", null)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}