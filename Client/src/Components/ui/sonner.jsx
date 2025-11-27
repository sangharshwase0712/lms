// import {
//   CircleCheckIcon,
//   InfoIcon,
//   Loader2Icon,
//   OctagonXIcon,
//   TriangleAlertIcon,
// } from "lucide-react"
// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner";

// const Toaster = ({
//   ...props
// }) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme}
//       className="toaster group"
//       icons={{
//         success: <CircleCheckIcon className="size-4" />,
//         info: <InfoIcon className="size-4" />,
//         warning: <TriangleAlertIcon className="size-4" />,
//         error: <OctagonXIcon className="size-4" />,
//         loading: <Loader2Icon className="size-4 animate-spin" />,
//       }}
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)",
//           "--border-radius": "var(--radius)"
//         }
//       }
//       {...props} />
//   );
// }

// export { Toaster }
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light" // ✅ force white theme
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-600" />,
        info: <InfoIcon className="size-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: <Loader2Icon className="size-4 animate-spin text-gray-600" />,
      }}
      style={{
        "--normal-bg": "white", // ✅ white background
        "--normal-text": "black", // ✅ black text
        "--normal-border": "#e5e7eb", // light gray border
        "--border-radius": "0.5rem", // smooth rounded corners
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
      {...props}
    />
  );
};

export { Toaster };
