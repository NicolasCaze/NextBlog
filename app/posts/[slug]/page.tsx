"use client"
import Comments from "@/components/comments";
import PageContainer from "@/components/page-container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/hook/usePost";
import { Eye, MessageCircle } from "lucide-react";
import Image from "next/image";


export default function PostsPage({params}: {params: {slug: string}}) {
    const { slug } = params;
    const {data: post, isFetching, error} = usePost(slug)
    
    if (isFetching) return <p>Loading</p>
    if (error) return <p>Error</p>

    
    return (
        <PageContainer>
            <div className="p-8">
            <div className="relative rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">

          <Image  src={post?.image || "/codev3.jpg"} alt={post?.title as string} fill />
          
          <div className=" absolute h-full w-full flex flex-col justify-center items-center">
          <div className="sm:max-w-xl maw-w-xs bg-secondary/80 p-4 rounded-lg">
            <h1 className=" text-center font-bold text-3xl sm:text-5xl text-black dark:text-white ">{post?.title}</h1>
          </div>
          </div>
         
      </div>
      <div className="flex justify-between items-center p-3 mb-3">
        <div className="flex items-center justify-center gap-3">
        <Avatar>
            <AvatarImage src="/avatar.jpeg"/>
            {/*<AvatarFallback>{post?.author}</AvatarFallback>*/}
        </Avatar>
        <div>
            {/*<p>{post?.author}</p>*/}
           {post?.createdAT && <p className="text-slate-500 text-sm">
                Posted on {new Date(post?.createdAT).toLocaleDateString()}
            </p>}
        </div>
        </div>
        <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                        <MessageCircle size={20} className="text-color-slate-500"/>
                        <p >{post?.nbComments}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={20} className="text-color-slate-500"/>
                        <p>{post?.view}</p>
                    </div>
                </div>
      </div>
      <Separator />
      <div className="mt-6 mb-6 " dangerouslySetInnerHTML={{
        __html: post?.content as string,
      }}></div>
      
      <Comments postSlug={slug} />
      </div>
     
        </PageContainer>
        
    )
}