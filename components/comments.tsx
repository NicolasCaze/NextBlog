"use client"
import { SyntheticEvent, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import type {Comments}  from "@prisma/client";
import Link from "next/link";
import { useComments } from "@/hook/use Comments";
import { CommentWhitUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function Comments({
  postSlug
}: {postSlug: string}) {
  const {data: session, status} = useSession();
  const [content, setContent] = useState("");

  const { mutate, isSuccess } = useMutation<AxiosResponse<Comments>, Error, Partial<Comments>>({
    mutationFn: (newComments) => axios.post("/api/comment", newComments) as Promise<AxiosResponse<Comments>>,
    onSuccess: (data) => {
      console.log("data on success", data);
    },
  });
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
  
    if (content !== "" && session?.user?.email) {
      mutate({
        content,
        postSlug,
        userEmail: session.user.email,
      } as Partial<Comments>);
    }
  }; 

  const {data: comments, isFetching} = useComments(postSlug);
    return (
        <div className="mt-10">
            <Separator />
            <h2 className="text-2xl text-gray-500 semi-bold mt-4" >Comments</h2> 
        <div className="mt-2 mb-6"> 
        
        {status === "authenticated" ? <div>
        <Textarea onChange={e => setContent(e.target.value)} className="mt-6 mb-6"  placeholder="Any comments ?"/>
        <Button disabled={content === ""} onClick={handleSubmit} className="bg-gray-400 mb-6">Add your comment</Button>
        
      </div>: <Link href="/login" className="underline" > 
      Login to write a comment
      </Link>} 
      </div> 

      {isFetching ? (<p>Loading</p>) : (comments.map((comment: CommentWhitUser) => (
        <div className="flex items-center mb-4" key={comment.id}>
          <Avatar>
            <AvatarImage src={comment.user.image || "/avatar.jpeg"}  />
            <AvatarFallback>{comment.user.name}</AvatarFallback>
          </Avatar>

          <div className="ml-3 p-4 border rounded-lg border-slate-400">
            <div className="flex items-center gap-2">
            <span>{comment.user.name}</span>
            <span className="text-slate-500 text-sm">{new Date(comment.user.createdAt).toLocaleDateString()}</span>
            </div>
          <p>{comment.content}</p>
          </div>
        </div>
      ))
      )}
      </div>
    )
}