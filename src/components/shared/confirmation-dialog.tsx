
"use client";

import {
    AlertTriangle,
    Loader2,
} from "lucide-react";



import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title?: string;
    description?: string;

    confirmText?: string;
    cancelText?: string;

    onConfirm: () => void | Promise<void>;

    loading?: boolean;

    variant?: "default" | "destructive";
}

export default function ConfirmationDialog({
    open,
    onOpenChange,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    loading = false,
    variant = "default",
}: ConfirmationDialogProps) {
    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                if (!loading) {
                    onOpenChange(value);
                }
            }}
        >
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-start gap-4">
                        <div
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                variant === "destructive"
                                    ? "bg-red-50"
                                    : "bg-amber-50"
                            )}
                        >
                            <AlertTriangle
                                className={cn(
                                    "h-5 w-5",
                                    variant === "destructive"
                                        ? "text-red-600"
                                        : "text-amber-600"
                                )}
                            />
                        </div>

                        <div className="space-y-1">
                            <AlertDialogTitle className="text-base font-semibold text-slate-900">
                                {title}
                            </AlertDialogTitle>

                            <AlertDialogDescription className="text-sm leading-5 text-slate-500">
                                {description}
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel disabled={loading}>
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={handleConfirm}
                        className={cn(
                            variant === "destructive"
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {loading ? "Processing..." : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

