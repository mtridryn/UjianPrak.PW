"use client";
import { useParams } from "next/navigation";
import UserProfile from "../page";
import ModalsPage from "../page";

export default function GetUserProfileById() {
  const { id } = useParams();
  return <ModalsPage id={id}></ModalsPage>;
}
