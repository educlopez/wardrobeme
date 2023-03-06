import Head from "next/head"

import ImageCloud from "@/components/UploadImage"
import { Layout } from "@/components/layout"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <Layout>
      <Head>
        <title>Fashion</title>
      </Head>
      <Hero />
      <ImageCloud />
    </Layout>
  )
}
