import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useComments = (slug: string) => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: async() => {
            const {data} = await axios.get(`/api/comment?slug=${slug}`);
            return data;
        }
    })
}