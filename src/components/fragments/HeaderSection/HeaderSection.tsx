import Link from "next/link";

interface HeaderSectionProps {
    title: string;
    subtitle: string;
    link: string;
}

export default function HeaderSection({ title, subtitle, link }: HeaderSectionProps) {
    return (
        <div className="flex justify-between mb-5">
            <div className="flex flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-[20px] h-[40px] bg-blue-500 rounded-[4px] mr-2"></div>
                    <h5 className="text-blue-500">{subtitle}</h5>
                </div>
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <Link href="/search_list">
                <button className="bg-blue-500 h-max text-white text-md py-2 px-4 sm:px-5 md:px-6 rounded-[4px] hover:bg-blue-600 transition">
                    View All
                </button>
            </Link>
        </div>
    );
}
