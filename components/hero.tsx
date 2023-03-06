import { signIn, useSession } from "next-auth/react"
import { buttonVariants } from "@/components/ui/button"

import { CldImage } from "next-cloudinary"

export default function Hero() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <div className="relative overflow-hidden bg-white isolate dark:bg-zinc-900">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-white/10"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y={-1}
          className="overflow-visible fill-gray-300/20 dark:fill-gray-800/20"
        >
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <svg
        viewBox="0 0 1108 632"
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <path
          fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)"
          fillOpacity=".2"
          d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"
        />
        <defs>
          <linearGradient
            id="175c433f-44f6-4d59-93f0-c5c51ad5566d"
            x1="1220.59"
            x2="-85.053"
            y1="432.766"
            y2="638.714"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4F46E5" />
            <stop offset={1} stopColor="#80CAFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:py-40 lg:px-8">
        <div className="flex-shrink-0 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Start creating virtual wardrobe
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="flex items-center mt-10 gap-x-6">
            {!session && (
              <>
                <p className="mb-6">
                  Start creating your Digital Wardobe
                  <a
                    href="/api/auth/signin"
                    className=" text-amber-600 hover:text-amber-800"
                    onClick={(e) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Sign in
                  </a>
                </p>
              </>
            )}
            {session?.user && (
              <>
                <a
                  href="/#start"
                  className={buttonVariants({
                    size: "sm",
                    variant: "amber",
                    className:
                      "flex flex-row items-center justify-center gap-2 ",
                  })}
                >
                  Start now tagging clothes
                </a>
              </>
            )}
          </div>
        </div>
        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
            <CldImage
              width={1800}
              height={715}
              alt="WardrobeMe"
              className="w-[46rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              src="wardrobeme/test_l8k5at"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
