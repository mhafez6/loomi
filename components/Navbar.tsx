"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-cleint";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const id = user?.id;

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <h1>Loomi</h1>
        </Link>

        {user ? (
          <figure>
            <button
              onClick={() => {
                router.push(`/profile/${id}`);
              }}
            >
              <Image
                src={user.image || ""}
                width={36}
                height={36}
                alt="PFP"
                className="rounded-full aspect-square"
              />
            </button>
            <button
              className="cursor-pointer"
              onClick={async () => {
                return await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/sign-in");
                    },
                  },
                });
              }}
            >
              <Image
                src="/assets/icons/logout.svg"
                width={36}
                height={36}
                alt="Logout"
                className="rotate-180"
              />
            </button>
          </figure>
        ) : (
          <figure>
            <button
              className="py-2.5 px-5 flex items-center gap-2.5 text-sm font-semibold text-dark-100 border border-gray-25 rounded-4xl transition-all duration-300 ease-in-out hover:bg-[#ff4393] hover:text-white hover:border-[#ff4393]"
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
