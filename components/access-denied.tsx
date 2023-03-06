import { signIn } from "next-auth/react"
import { buttonVariants } from "./ui/button"
export default function AccessDenied() {
  return (
    <>
      <div className="px-6 pt-24 sm:pt-32 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
            Access Denied
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            <a
              className={buttonVariants({
                size: "sm",
                variant: "amber",
                className: "flex flex-row items-center justify-center gap-2 ",
              })}
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              You must be signed in to view this page
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
