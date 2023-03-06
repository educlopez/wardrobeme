import { useSession, signIn, signOut } from "next-auth/react"
import { buttonVariants, Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              size: "sm",
              variant: "outline",
              className:
                "flex flex-row items-center justify-center gap-2 text-zinc-700 dark:text-zinc-400",
            })}
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src={session.user.image} alt={session.user.name} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
            <span className="text-zinc-900 dark:text-white">
              {session.user.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
  return (
    <>
      <button
        className={buttonVariants({
          size: "sm",
          variant: "outline",
        })}
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}
