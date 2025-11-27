import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // ⬇️ Main container styling
        "peer inline-flex h-6 w-11 cursor-pointer items-center rounded-full border border-transparent transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "bg-input data-[state=checked]:bg-primary dark:bg-input dark:data-[state=checked]:bg-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // ⬇️ Switch knob styling (fixed alignment + size)
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-md ring-0 transition-transform duration-300 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1",
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
