"use client";

import Image from "next/image";
import Link from "next/link";
import PasswordInput from "@/components/core/Input/PasswordInput";
import GmailSign from "@/components/core/Button/GmailSign";
import { useState } from "react";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/auth/register";

export default function Sign_Up() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      Swal.fire({
        title: "Registering...",
        text: "Please wait while we create your account.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await registerUser({ name, email, password });

      setSuccess(response.message || "Registration successful!");

      Swal.fire({
        title: "Successfully created account!",
        text: "Data has been saved.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push("/");
        }
      });
    } catch (error: any) {
      setError(error.message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-[1000px] flex-col items-center rounded-[12px] bg-white p-5 shadow-lg lg:h-[500px] lg:flex-row">
        <div className="w-full p-5 lg:w-1/2">
          <h1 className="mb-4 text-center text-2xl font-semibold lg:text-left">
            Come Join The Wanderer, ✍🏻️
          </h1>

          <div className="mb-3 flex w-full flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3 flex w-full flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="JohnDoe@gmail.com"
              className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <PasswordInput onPasswordChange={handlePasswordChange} />

          <button
            onClick={handleSubmit}
            className="mb-3 w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-700 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Sign Up
          </button>

          <GmailSign />

          <h4 className="text-center text-base font-medium">
            Already Have an Account?
            <Link
              href="/auth/sign-in"
              className="ml-3 text-base text-sky-400 duration-300 hover:text-sky-500"
            >
              Sign In
            </Link>
          </h4>
        </div>

        {/* Bagian Gambar */}
        <div className="hidden w-1/2 lg:block">
          <Image
            src="/assets/image/sign_in.png"
            width={500}
            height={500}
            alt="layanan"
            className="mx-auto rounded-[8px] duration-500 hover:scale-[90%] lg:mx-0"
          />
        </div>
      </div>
    </div>
  );
}
