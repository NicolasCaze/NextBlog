import { Prisma } from "@prisma/client";

export type category = 
{
    id: number,
    name: string,
    slug: string
}

export type Post = {
    id: number;
    category: string;
    title: string;
    image: string;
    caption: string;
    date: string | Date;
    minutesToRead: number;
    author: string;
    nbViews: number;
    nbComments: number;
    slug: string;
    content?: string;
  };

  export type PostWithCategory = Prisma.PostGetPayload<{
    include: {cat: true}
  }>

  export type CommentWhitUser = Prisma.CommentsGetPayload<{
    include: { user: true}
  }>