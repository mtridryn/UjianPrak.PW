export default function SearchListSkeleton() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full min-h-[425px] animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
            <div className="w-3/4 h-5 bg-gray-300 rounded-md mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div> 
            <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div> 
            <div className="w-full h-4 bg-gray-300 rounded-md mb-4"></div> 
            
            <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-8"></div>

            <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        </div>
    )
}