"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import styles from './index.module.css'


const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={styles.Label}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export default Label
