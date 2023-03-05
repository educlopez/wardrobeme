import Head from "next/head"

import ImageCloud from "@/components/UploadImage"
import { Layout } from "@/components/layout"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Fashion</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <ImageCloud />
      </main>
    </Layout>
  )
}
