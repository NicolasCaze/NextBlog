import { NextResponse } from "next/server"
import prisma from "@/lib/connect";
import { auth } from "@/lib/auth-options";

export const GET = async (req: Request) => {
    try {
       /* const session = await getAuthSession();
        if (!session || !session.user){
            return NextResponse.json(
                {message: "Not Authentificated"},
                {status: 403},
            );
        }*/


        const {searchParams} = new URL(req.url);
        const catSlug = searchParams.get("cat");
        const posts = await prisma.post.findMany({
            where: {
              ...(catSlug && catSlug != "null" && catSlug != "" && {catSlug})  
            },
            include: {
                cat: true
            }
        });
        
        return NextResponse.json(posts, { status: 200});
    }catch (error) {
        return NextResponse.json(
            {
                error: "Something was wrong"
            },
            {
                status: 500
            },
        );
    }
}

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session || !session.user){
            return NextResponse.json(
                {message: "Not Authentificated"},
                {status: 403},
            );
        }
        const body = await req.json();
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email}
        })
        return NextResponse.json(post, {status: 200})
    } catch (error) {
        return NextResponse.json(
            {
                error: "Something was wrong"
            },
            {
                status: 500
            },
        );
    }
}