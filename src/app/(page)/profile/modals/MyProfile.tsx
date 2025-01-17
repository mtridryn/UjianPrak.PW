import { Form } from "@/app/lib/model/form";
import { SaveChangeButton } from "@/components/core/Button/SaveChangeButton";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: Form;
  loading: boolean;
}

export default function MyProfile({
  handleSubmit,
  handleChange,
  formData,
  loading,
}: Props) {
  return (
    <div className="m-10 w-full">
      <form onSubmit={handleSubmit}>
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 py-5">
            <FontAwesomeIcon icon={faUser} />
            <p>My Profile</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
          </li>
          {["name", "email", "phone", "location"].map((field) => (
            <li
              key={field}
              className="flex items-center justify-between gap-3 border-b-2 py-5"
            >
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                className="h-10 w-1/2 rounded-lg border p-1 text-right"
                value={formData[field as keyof Form]}
                onChange={handleChange}
                required
              />
            </li>
          ))}
          <li className="flex items-center justify-end gap-3 py-5">
            <SaveChangeButton loading={loading} className="p-3" />
          </li>
        </ul>
      </form>
    </div>
  );
}
