// import * as React from "react"
// import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
// import { CircleIcon } from "lucide-react"

// import { cn } from "@/lib/utils"

// function RadioGroup({
//   className,
//   ...props
// }) {
//   return (
//     <RadioGroupPrimitive.Root
//       data-slot="radio-group"
//       className={cn("grid gap-3", className)}
//       {...props} />
//   );
// }

// function RadioGroupItem({
//   className,
//   ...props
// }) {
//   return (
//     <RadioGroupPrimitive.Item
//       data-slot="radio-group-item"
//       className={cn(
//         "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}>
//       <RadioGroupPrimitive.Indicator
//         data-slot="radio-group-indicator"
//         className="relative flex items-center justify-center">
//         <CircleIcon
//           className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
//       </RadioGroupPrimitive.Indicator>
//     </RadioGroupPrimitive.Item>
//   );
// }

// export { RadioGroup, RadioGroupItem }


import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // 👇 Blue theme added here
        "border-2 border-blue-500 text-blue-600 focus-visible:border-blue-600 focus-visible:ring-blue-400/50 " +
        "aria-checked:border-blue-600 aria-checked:bg-blue-100 " +
        "dark:aria-checked:bg-blue-900 dark:aria-checked:border-blue-400 " +
        "aspect-square size-4 shrink-0 rounded-full shadow-xs " +
        "transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        {/* 👇 Blue fill for checked icon */}
        <CircleIcon className="fill-blue-600 text-blue-600 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
