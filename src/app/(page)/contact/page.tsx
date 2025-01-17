"use client";

import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import {
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-grow flex-col items-center justify-center p-6">
        <h1 className="mt-10 text-4xl font-bold text-black">Contact Us</h1>
        <p className="mt-4 text-center text-lg text-gray-700">
          Reach out to us through any of the following platforms. We’re here to
          help!
        </p>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg">
            <FaInstagram className="mr-4 text-4xl text-pink-500" />
            <div>
              <h2 className="text-xl font-bold">Instagram</h2>
              <a
                href="https://www.instagram.com/rezatamaar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @rezatamaar
              </a>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg">
            <FaTiktok className="mr-4 text-4xl text-black" />
            <div>
              <h2 className="text-xl font-bold">Tiktok</h2>
              <a
                href="https://www.tiktok.com/@rezatamaar_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @rezatamaar_
              </a>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg">
            <FaEnvelope className="mr-4 text-4xl text-red-500" />
            <div>
              <h2 className="text-xl font-bold">Email</h2>

              <a
                href="mailto:rprawiratama.ramadhan@gmail.com&subject=tes"
                className="text-blue-600 hover:underline"
              >
                rprawiratama.ramadhan@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg">
            <FaPhoneAlt className="mr-4 text-4xl text-green-500" />
            <div>
              <h2 className="text-xl font-bold">Phone</h2>
              <a
                href="https://wa.me/6281808191102"
                className="text-blue-600 hover:underline"
              >
                +62 818-0819-1102
              </a>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg md:col-span-2">
            <FaMapMarkerAlt className="mr-4 text-4xl text-red-500" />
            <div>
              <h2 className="text-xl font-bold">Location</h2>
              <p className="text-gray-700">
                Jl. A. Yani No.1, Bantarjati, Kec. Bogor Utara, Kota Bogor, Jawa
                Barat 16153
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
