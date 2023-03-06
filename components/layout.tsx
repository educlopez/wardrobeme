import { SiteHeader } from "@/components/site-header"
import Footer from "@/components/footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  )
}
