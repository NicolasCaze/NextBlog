import { category } from "@/types";
import { CATEGORIES } from "@/utils/Categories";
import Link from "next/link";
import { Button } from "./ui/button";
import PageContainer from "./page-container";

export default function Footer() {
    return (
        <footer className="p-4 border-t">
            <PageContainer>
            <div className="flex flex-col md:flex-row items-start md:items-center  justify-center">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
                    NextBlog
                </h1>
                

            <div className="flex flex-col md:flex-row gap-2">
                {CATEGORIES.map((Categories: category) => (
                    <div key={Categories.id}>
                        <Link href={`/categories/${Categories.slug}`}>
                            <Button variant="ghost">
                            {Categories.name}
                            </Button>
                        </Link>
                        </div>
                   
                ))}
                <Button variant="ghost">
                <Link href="/write">
                    Write a post
                </Link>
            </Button>
           
           </div>
            
            </div>
            </PageContainer>
        </footer>
    )
}