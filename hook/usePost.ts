import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getPostBySlug = async (slug: string) => {
   const {data} =  await axios.get(`/api/posts/${slug}`)
   return data as Post;
}


export function usePost(slug: string) {
    return useQuery({
        queryKey: ["post", slug],
        queryFn: () => getPostBySlug(slug),
        enabled: !!slug
    }) 
}