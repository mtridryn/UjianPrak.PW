"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logout } from "@/app/api/auth/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfileByUserId } from "@/app/api/profile/profile";
import Profile from "@/app/lib/model/profile";
import Image from "next/image";
import SkeletonUserPicture from "../Skeleton/SkeletonUserPicture";
import { useUserProfile } from "@/app/context/ProfileContext";

export function ProfileDropdown() {
  const session = localStorage.getItem("userSession");
  const [dataProfile, setDataProfile] = useState<Profile | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const { profile } = useUserProfile();

  useEffect(() => {
    (async () => {
      if (session) {
        const userData = JSON.parse(session);
        const dataProfile = await getProfileByUserId(userData.user_id);
        if (dataProfile) {
          setDataProfile(dataProfile);
          setLoading(false);
        }
      }

      if (profile) {
        setDataProfile(null);
      }
    })();
  }, [profile]);

  const router = useRouter();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex cursor-pointer items-center justify-center rounded-full hover:bg-white">
          {session ? (
            <>
              {loading ? (
                <SkeletonUserPicture />
              ) : (
                <Image
                  src={`/assets/picture/${dataProfile?.picture || profile?.picture || "bussiness-man.png"}`}
                  width={50}
                  height={50}
                  className="h-10 w-10 rounded-full object-cover transition duration-300 ease-in-out"
                  alt=""
                ></Image>
              )}
            </>
          ) : (
            <User className="cursor-pointer text-white group-hover:text-black" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="flex gap-3 p-2 hover:bg-slate-200">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <button
              onClick={(e: any) => handleLogout(e)}
              className="flex w-full gap-3 p-2 hover:bg-slate-200"
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
