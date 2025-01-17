import updatePicture from "@/app/api/profile/update-picture";
import { SaveChangeButton } from "@/components/core/Button/SaveChangeButton";
import ProfileAnimateDropdown from "@/components/core/Dropdown/ProfileAnimateDropdown";
import TokoAnimateDropdown from "@/components/core/Dropdown/TokoAnimateDropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { logout } from "@/app/api/auth/google";
import { ChevronRight, LogOut, Settings, Store } from "lucide-react";
import Profile from "@/app/lib/model/profile";
import { useUserProfile } from "@/app/context/ProfileContext";
import { useRouter } from "next/navigation";

type Props = {
  data: Profile;
};

const ProfileSidebar = ({ data }: Props) => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { setProfile } = useUserProfile();
  const router = useRouter();

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => (oldValue === value ? "" : value));
  };

  useEffect(() => {
    if (data.picture) {
      setPictureUrl(`/assets/picture/${data.picture}`);
    }
  }, [data.picture]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setPictureUrl(`/assets/picture/${result.filename}`);
      const profileUpdated = await updatePicture(data.user_id, result.filename);
      if (profileUpdated) {
        const updatedProfile: Profile = {
          ...data,
          picture: profileUpdated.picture,
        };
        setProfile(updatedProfile);
      }

      setIsDialogOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "An error occurred while updating the profile. Please try again.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    router.push("/");
  };

  return (
    <div className="m-10">
      <>
        <div className="flex gap-4 border-b-2 py-5">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <div className="group relative">
                <Image
                  src={pictureUrl || "/assets/picture/bussiness-man.png"}
                  width={500}
                  height={500}
                  className="h-24 w-24 rounded-full object-cover transition duration-300 ease-in-out"
                  alt="empty"
                />

                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                  <span className="text-lg text-white">Update Picture</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <SaveChangeButton loading={loading} className="p-2" />
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col justify-center">
            <p>{data.name}</p>
            <p>{data.email}</p>
          </div>
        </div>

        <div className="space-y-20">
          <ul className="mx-2 mt-8 space-y-6">
            <li className="flex flex-col">
              <button
                type="button"
                className={`${currentMenu === "settings" ? "active" : ""}`}
                onClick={() => toggleMenu("settings")}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5" />
                  <span className="text-black">Settings</span>
                  <div
                    className={`ml-auto ${
                      currentMenu === "settings" ? "rotate-90" : ""
                    } duration-300`}
                  >
                    <ChevronRight />
                  </div>
                </div>
              </button>

              <ProfileAnimateDropdown currentMenu={currentMenu} />
            </li>

            {data.role && (
              <li className="flex flex-col">
                <button
                  type="button"
                  className={`${currentMenu === "toko" ? "active" : ""}`}
                  onClick={() => toggleMenu("toko")}
                >
                  <div className="flex items-center gap-3">
                    <Store className="w-5" />
                    <span className="text-black">Toko</span>
                    <div
                      className={`ml-auto ${
                        currentMenu === "toko" ? "rotate-90" : ""
                      } duration-300`}
                    >
                      <ChevronRight />
                    </div>
                  </div>
                </button>

                <TokoAnimateDropdown currentMenu={currentMenu} />
              </li>
            )}

            <li
              className="flex cursor-pointer items-center gap-3"
              onClick={(e) => handleLogout(e)}
            >
              <LogOut className="w-5" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </>
    </div>
  );
};

export default ProfileSidebar;
