export default function CardSkeleton() {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-start h-full min-h-[425px] animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
            
            <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div>
            
            <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-4"></div>
            
            <div className="flex justify-between items-center w-full mt-auto">
                <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
            </div>
        </div>
    );
}
