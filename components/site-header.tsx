import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import LoginBtn from "@/components/login-button"
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-zinc-200 bg-white/70 backdrop-blur-sm dark:border-b-zinc-700 dark:bg-zinc-900/50 dark:backdrop-blur">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center gap-4 space-x-1">
            <LoginBtn />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
