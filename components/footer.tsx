import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
const navigation = [
  {
    name: "Instagram",
    href: `${siteConfig.links.instagram}`,
    icon: (props) => (
      <>
        <Icons.instagram className="w-5 h-5" {...props} />
        <span className="sr-only">Instagram</span>
      </>
    ),
  },
  {
    name: "Twitter",
    href: `${siteConfig.links.twitter}`,
    icon: (props) => (
      <>
        <Icons.twitter className="w-5 h-5 fill-current" {...props} />
        <span className="sr-only">Twitter</span>
      </>
    ),
  },
  {
    name: "GitHub",
    href: `${siteConfig.links.github}`,
    icon: (props) => (
      <>
        <Icons.gitHub className="w-5 h-5" {...props} />
        <span className="sr-only">GitHub</span>
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900">
      <div className="px-6 py-12 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-zinc-700 hover:text-zinc-500 dark:text-zinc-300"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                  className: "text-zinc-700 dark:text-zinc-400",
                })}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-xs leading-5 text-center text-zinc-700 dark:text-zinc-300">
            Made with ♥️ {new Date().getFullYear()} by{" "}
            <a
              href="https://educalvolopez.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edu calvo
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
