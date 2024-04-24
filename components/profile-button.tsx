"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export default function LoginButton() {
    const {data: session, status} = useSession();
    console.log("session", status, session);
    
    if (!session) {
        return (
            <Link href="/login">
            <Button>Login</Button>
            </Link>
        )
    }
    
const onLogout = () => {
    signOut();
}

return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage className="w-8 h-8" src={session.user?.image || "/avatar.jpeg" }/> {"  "}
                <AvatarFallback>{session.user?.name}</AvatarFallback>
               
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer">Log out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
)
}