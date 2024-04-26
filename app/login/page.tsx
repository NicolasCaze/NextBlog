"use client"
import PageContainer from "@/components/page-container"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useLayoutEffect } from "react"

export default function Login() {
    const onLogin = (provider: string ) => () => { 
        signIn(provider)
     }

     const {data: session, status} = useSession();
    const router = useRouter();

    useLayoutEffect(() => {
        if (session) {
          router.replace("/");
          return;
        }
      }, [router, session]);
    return (
        <PageContainer>
            <div className="p-10">
                <PageTitle title="Login or Register" />

                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    <Button onClick={onLogin("github")}>
                        <Github className="mr-3" />
                        Signin with Github 
                    </Button>
                    <Button onClick={onLogin("google")}>
                        <Mail className="mr-3" />
                        Signin with Google 
                    </Button>
                </div>
            </div>
        </PageContainer>
    )
}