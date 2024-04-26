"use client"
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CATEGORIES } from "@/utils/Categories";
import { category } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MenuBurger() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <Link onClick={handleClick} href="/write" >
            <Button variant="ghost">Write a post</Button>
          </Link>
          <p>Categories</p>
          {CATEGORIES.map((Categories: category) => (
            <Link
              key={Categories.id}
              href={`/categories/${Categories.slug}`}
              className="block px-2 py-1 text-lg"
              onClick={handleClick}
            >
              <Button variant="ghost">
                {Categories.name}
              </Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
