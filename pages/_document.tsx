import Document, { Head, Html, Main, NextScript } from "next/document"
import { siteConfig } from "@/config/site"
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={siteConfig.description} />
          <meta property="og:site_name" content={siteConfig.name} />
          <meta property="og:description" content={siteConfig.description} />
          <meta property="og:title" content={siteConfig.name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={siteConfig.name} />
          <meta name="twitter:description" content={siteConfig.description} />
        </Head>
        <body className="min-h-screen font-sans antialiased bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
