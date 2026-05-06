import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] border-2 border-[var(--brutal-border)] text-sm font-extrabold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[4px_4px_0_var(--brutal-border)] hover:shadow-[6px_6px_0_var(--brutal-border)]",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-[4px_4px_0_var(--brutal-shadow)] hover:bg-[var(--accent)] hover:shadow-[6px_6px_0_var(--brutal-shadow)]",
        outline:
          "bg-[var(--background)] text-[var(--foreground)] shadow-[4px_4px_0_var(--brutal-shadow)] hover:bg-[var(--surface-subtle)]",
        ghost:
          "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle-hover)]",
        link:
          "text-[var(--secondary)] underline-offset-4 hover:underline",
        destructive:
          "bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
