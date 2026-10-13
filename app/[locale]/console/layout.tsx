import type { ReactNode } from "react"
import type { Metadata } from "next"
import { ConsoleShell } from "@/components/console/shell"

export const metadata: Metadata = { title: "Console" }

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return <ConsoleShell>{children}</ConsoleShell>
}
