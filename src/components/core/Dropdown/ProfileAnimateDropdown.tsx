import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faDatabase,
  faGlobe,
  faHouseChimney,
  faLock,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

type Props = {
  currentMenu: string;
};

const ProfileAnimateDropdown = ({ currentMenu }: Props) => {
  return (
    <AnimateHeight
      duration={300}
      height={currentMenu === "settings" ? "auto" : 0}
    >
      <ul className="space-y-6 mt-6">
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faHouseChimney} className="w-5" />
            <div className="text-left">
              <p>Daftar Alamat</p>
              <p className="text-[13px]">Atur Alamat Pengiriman</p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faDatabase} className="w-5" />
            <div className="text-left">
              <p>Rekening Bank</p>
              <p className="text-[13px]">Tarik saldo</p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faWallet} className="w-5" />
            <div className="text-left">
              <p>Pembayaran Instan</p>
              <p className="text-[13px]">
                E-wallet, kartu kredit, & debit instan terdaftar
              </p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faLock} className="w-5" />
            <div className="text-left">
              <p>Keamanan Akun</p>
              <p className="text-[13px]">
                Kata sandi, PIN, & verifikasi data diri
              </p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faBell} className="w-5" />
            <div className="text-left">
              <p>Notifikasi</p>
              <p className="text-[13px]">Atur notifikasi</p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faGlobe} className="w-5" />
            <div className="text-left">
              <p>Privasi Akun</p>
              <p className="text-[13px]">Atur penggunaan data</p>
            </div>
          </button>
        </li>
      </ul>
    </AnimateHeight>
  );
};

export default ProfileAnimateDropdown;
