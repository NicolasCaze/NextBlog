import Link from "next/link";
import { HeaderNavigation } from "./Header-navigation";
import MenuBurger from "./menu-burger";
import PageContainer from "./page-container";
import LoginButton from "./profile-button";
import ToggleTheme from "./toggle-theme";

export default function Header() {
  return (
    <header className="border-b px-4">
      <PageContainer>
        <div className="flex items-center justify-between w-full ">
          <MenuBurger />
          <div className=" text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600 ">
  <Link href="/">NextBlog</Link>
</div>

          <div className="hidden md:block">
            <HeaderNavigation />
          </div>
          <div className="ml-auto flex items-center">
    <ToggleTheme />
    <LoginButton />
  </div>
        </div>
      </PageContainer>
    </header>
  );
}
