import Head from "next/head"
import { siteConfig } from "@/config/site"
import ImageCloud from "@/components/UploadImage"
import { Layout } from "@/components/layout"
import { useSession } from "next-auth/react"

import Hero from "@/components/hero"

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      <Hero />
      {!session && <></>}
      {session?.user && (
        <>
          <div id="start"></div>
          <ImageCloud />
        </>
      )}
    </Layout>
  )
}
