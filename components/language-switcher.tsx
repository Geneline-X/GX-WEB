"use client"

import * as React from "react"
import { ChevronDown, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"

const languages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "French", code: "fr", flag: "🇫🇷" },
    { name: "Spanish", code: "es", flag: "🇪🇸" },
    { name: "German", code: "de", flag: "🇩🇪" },
    { name: "Portuguese", code: "pt", flag: "🇵🇹" },
    { name: "Chinese", code: "zh", flag: "🇨🇳" },
    { name: "Italian", code: "it", flag: "🇮🇹" },
]

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    const currentLang = languages.find(l => l.code === locale) || languages[0]

    const onLanguageChange = (newLocale: string) => {
        setIsOpen(false)
        router.replace(pathname, { locale: newLocale })
    }

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative"
        >
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-12 px-3 flex items-center gap-2 rounded-none text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                    >
                        <Languages className="h-4 w-4" />
                        <span className="text-sm font-medium uppercase">{currentLang.code}</span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform duration-300",
                                isOpen ? "rotate-180" : "rotate-0"
                            )}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-48 rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-card p-1"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            className={cn(
                                "flex items-center justify-between py-2 px-3 cursor-pointer rounded-none transition-colors",
                                locale === lang.code
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                            )}
                            onClick={() => onLanguageChange(lang.code)}
                        >
                            <span className="text-sm font-medium">{lang.name}</span>
                            <span className="text-xs opacity-60 uppercase">{lang.code}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
