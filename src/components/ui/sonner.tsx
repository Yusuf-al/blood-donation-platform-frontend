"use client";

import { Toaster as Sonner } from "sonner";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

function Toaster() {
  return (
    <Sonner
      position="top-right"
      duration={4000}
      closeButton
      icons={{
        success: <CheckCircle2 className="h-5 w-5 shrink-0" />,
        error: <XCircle className="h-5 w-5 shrink-0" />,
        warning: <AlertTriangle className="h-5 w-5 shrink-0" />,
        info: <Info className="h-5 w-5 shrink-0" />,
      }}
      toastOptions={{
        unstyled: true,

        classNames: {
          toast:
            "group relative flex w-[380px] items-center gap-3 px-4 py-3 shadow-lg",

          content:
            "flex min-w-0 flex-1 flex-col gap-0.5",

          title:
            "text-sm font-semibold leading-5",

          description:
            "text-xs leading-4 opacity-80",

          closeButton:
            "relative right-auto top-auto order-last !border-0 !bg-transparent !text-current opacity-60 hover:opacity-100",

          success:
            "bg-green-50 text-green-700",

          error:
            "bg-red-50 text-red-700",

          warning:
            "bg-amber-50 text-amber-700",

          info:
            "bg-blue-50 text-blue-700",
        },
      }}
    />
  );
}

export { Toaster };