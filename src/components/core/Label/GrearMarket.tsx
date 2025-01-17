import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  classname?: string;
  size?: string;
};

export default function GrearMarket({ size, children, classname }: Props) {
  return (
    <Link href="/">
      <div className={`${classname} flex items-end gap-2`}>
        <p
          className={`text-black ${size && "text-xl"} text-2xl font-bold`}
        >
          BelanjaKuy.
        </p>
        {children}
      </div>
    </Link>
  );
}
