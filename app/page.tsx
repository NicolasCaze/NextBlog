"use client"

import PageContainer from "@/components/page-container";

import SectionPostList from "@/components/section-postlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hook/useCategories";
import { usePosts } from "@/hook/usePosts";
import { Category } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const {data: posts, isFetching} = usePosts();
  const {data: categories} = useCategories();
  return (
    <PageContainer>
    <div className="py-10 px-4">
      <div
        style={{ backgroundImage: "url(/codev3.jpg)" }} 
        className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">

          <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="sm:max-w-xl maw-w-xs bg-secondary/80 p-4 rounded-lg">
            <h1 className=" text-center font-bold text-3xl sm:text-5xl text-black dark:text-white ">Become A Better React Developper</h1>
            <Input type="email" placeholder="Email" className="dark:bg-white mt-4"/>
            <Button size="lg" className="w-full py-6 text-xl mt-4">Subscribe to our Newsletter</Button>
          </div>
          </div>
         
      </div>
    
    <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center items-center">
      {categories?.map((category: Category) => (
         <Button variant="outline" key={category.id}>
          <Link href={`/categories/${category.slug}`}>{category.title}</Link>
         </Button>
      ))}
    </div>
     { !isFetching && <SectionPostList posts={posts} />}

   </div>
   </PageContainer>
  );
}
