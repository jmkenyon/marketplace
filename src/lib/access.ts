import {ClientUser} from "payload"
import type {User} from "@/payload-types"
import { use } from "react"

export const isSuperAdmin = (user: ClientUser | User | null )  => {
    return Boolean(user?.roles?.includes('super-admin'))
}

