import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faCalendar,
  faDatabase,
  faFile,
  faGlobe,
  faHouseChimney,
  faLock,
  faPenToSquare,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

type Props = {
  currentMenu: string;
};

const TokoAnimateDropdown = ({ currentMenu }: Props) => {
  const router = useRouter();

  const handleButtonUpload = () => {
    router.push("/profile/upload-product");
  };

  const handleButtonList = () => {
    router.push("/profile/list-product");
  };

  return (
    <AnimateHeight duration={300} height={currentMenu === "toko" ? "auto" : 0}>
      <ul className="mt-6 space-y-6">
        <li>
          <button
            className="flex w-full items-center gap-3"
            onClick={handleButtonUpload}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
            <div className="text-left">
              <p>Upload Product</p>
            </div>
          </button>
        </li>
        <li>
          <button
            className="flex w-full items-center gap-3"
            onClick={handleButtonList}
          >
            <FontAwesomeIcon icon={faFile} className="w-5" />
            <div className="text-left">
              <p>List Product</p>
            </div>
          </button>
        </li>
      </ul>
    </AnimateHeight>
  );
};

export default TokoAnimateDropdown;
