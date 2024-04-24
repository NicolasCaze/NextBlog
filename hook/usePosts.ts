import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const usePosts = (slug: string | null = null) => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
        const {data} = await axios.get(`/api/posts?cat=${slug}`);
        return data;
    }
    })
}