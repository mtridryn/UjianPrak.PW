"use client";
import { useParams, useRouter } from "next/navigation";
import UserProfile from "../page";
import { useEffect } from "react";

export default function ModalsPage({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const { slug } = useParams();
  const router = useRouter();
  const validRoutes = ["list-product", "update-product", "upload-product"];
  const slugString = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    if (!slugString || !validRoutes.includes(slugString)) {
      router.push("/profile");
    }
  }, [slugString, router]);

  return <UserProfile productId={id}></UserProfile>;
}
