import { Button } from "@/components/ui/button"
import { signOut } from "@/server/auth"
import { ArrowRight } from "lucide-react"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/sign-in" })
            }}
        >
            <Button type="submit"><ArrowRight />sign out</Button>
        </form>
    )
}
