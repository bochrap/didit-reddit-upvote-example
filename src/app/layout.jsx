import { Inter } from "next/font/google";
import { UserInfo } from "../components/UserInfo";

import "./globals.css";
import Link from "next/link";
import { Providers } from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Didit",
  description: "A social app like Reddit or Hacker News",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="border-b border-zinc-800 p-4 flex items-center">
            <Link href="/" className="text-xl">
              Didit
            </Link>
            <Link href="/add-post" className="ml-10 hover:bg-zinc-300 p-2 rounded bg-pink-300 text-black">
              Add post
            </Link>
            <div className="ml-auto">
              <UserInfo />
            </div>
          </header>
          <main className="max-w-screen-xl ml-4 lg:mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
