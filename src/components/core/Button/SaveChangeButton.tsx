type Props = {
  loading: boolean;
  className?: string;
};

export const SaveChangeButton = ({ loading, className }: Props) => {
  return (
    <button
      type="submit"
      className={`rounded-lg bg-blue-500 ${className} text-white hover:bg-blue-600 ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={loading}
    >
      {loading ? "Saving..." : "Save Change"}
    </button>
  );
};
