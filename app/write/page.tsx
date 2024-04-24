"use client"
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hook/useCategories";
import { Category, Post } from "@prisma/client";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { SyntheticEvent, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import ("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
}) ;
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
export default function WritePost() {
    const {data: categories, isFetching } = useCategories();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [catSlug, setCatSlug] = useState("");

    const [file, setFile] = useState<File>();
    const [imageObjectUrl, setImageObjectUrlFile] = useState<string | null>(null);


    const {data: session, status} = useSession();
    const router = useRouter();
    const { mutate, isSuccess } = useMutation<AxiosResponse<Post>, Error, Post>({
        mutationFn: (newPost) => axios.post("/api/posts", newPost) as Promise<AxiosResponse<Post>>,
        onSuccess: (data) => {
          console.log("data on success", data);
          router.push("/")
        },
      });
      


    const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

   const image = await uploadImage();
   console.log("image is", image);
    if (title != "" && catSlug != "" && content != " " && !image) {
        await mutate({
            title,
            content,
            catSlug,
            slug: title.trim().toLowerCase().replace(" ", "-"),
            image: image,
          } as Post);
          
    }
    
    }

    const onChangeFile = (e: SyntheticEvent) => {
      const files = (e.target as HTMLInputElement).files;

      if(!files || !files[0]) return;

      setFile(files[0]);
      setImageObjectUrlFile(URL.createObjectURL(files[0]));
    }
    useLayoutEffect(() => {
      if (!session) {
        router.replace("/login");
        return;
      }
    }, [router, session]);

    const uploadImage = async () => {
      try {
        if(!file) return;

        const data = new FormData();
        data.set("file", file);

        const response = await axios.post("/api/upload", data)
        return response.data;
      } catch (error) {
        console.log("Error in uploadImage", error)
      }
    }
    return (
        <PageContainer>
            <div className="p-10">
                <PageTitle title="Write a Post" />

                <div className="mb-6">
                  {imageObjectUrl && (<div className="relative w-40 h-40 mx-auto">
                    <Image 
                    src={imageObjectUrl}
                    fill
                    alt={title}
                    />
                    </div>)}
                  


                  <Input type="file" name="image" onChange={onChangeFile} />

                </div>

                <Input type="text" placeholder="Title" className="mb-6" 
                onChange={(e) => setTitle(e.target.value)}
                />
                {isFetching ? <p>Loading categories</p> :
                (<Select onValueChange={value => setCatSlug(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category"/>
                    </SelectTrigger>
                    <SelectContent>
                    {categories.map((category: Category) => (
                      <SelectItem  key={category.id} value={category.slug} >
                        {category.title}
                      </SelectItem>
                    ))}
                    </SelectContent>
                </Select>)}

                <ReactQuill className="mt-6" placeholder="Content..." 
                value={content}
                onChange={setContent}
                />

                <Button className="mt-6" onClick={handleSubmit}>
                    Publish
                </Button>
            </div>
        </PageContainer>
    )
}

