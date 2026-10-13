import { useTranslations } from "next-intl"
import { PageHeader } from "@/components/console/ui"
import { Playground } from "@/components/console/playground"

export default function PlaygroundPage() {
  const t = useTranslations("Console.playground")
  return (
    <>
      <PageHeader title={t("title")} desc={t("desc")} />
      <Playground />
    </>
  )
}
