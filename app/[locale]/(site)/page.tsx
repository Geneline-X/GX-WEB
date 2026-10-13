import { Hero } from "@/components/home/hero"
import { Logos } from "@/components/home/logos"
import { Problem } from "@/components/home/problem"
import { Pipeline } from "@/components/home/pipeline"
import { Stack } from "@/components/home/stack"
import { Research } from "@/components/home/research"
import { Closing } from "@/components/home/closing"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Problem />
      <Pipeline />
      <Stack />
      <Research />
      <Closing />
    </>
  )
}
