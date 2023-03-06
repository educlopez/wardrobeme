import { Inter as FontSans } from "@next/font/google"
import { Playfair_Display as FontSerif } from "@next/font/google"
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"

import "../styles/index.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
        h1, h2, h3, h4, h5, h6 {
          font-family: ${fontSerif.style.fontFamily};
        }
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  )
}
