import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

export const GET = async (
    req: Request, 
    { params }: { params: { slug: string }}
) => {
    const { slug  } = params;

    try {
        const categories = await prisma.category.findUnique(
            {
                where: { slug },
            }
        ) 
        return NextResponse.json(categories, { status: 200 });
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