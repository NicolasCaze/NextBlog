"use client"

import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import SectionPostList from "@/components/section-postlist";
import { usePosts } from "@/hook/usePosts";

type PropsParams = {
    params: {
       slug: string;
    };
}

export default function Categories({ params }: PropsParams) {
    const { slug } = params;

   const {data: posts, isFetching} = usePosts(slug);
    return (
        <PageContainer>
        <div className="py-10 px-4">
            <PageTitle title={slug.replace("-", " ")}/>
            {!isFetching && <SectionPostList posts={posts} />}
        </div>
        </PageContainer>
    )
}