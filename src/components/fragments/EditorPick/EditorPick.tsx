export default function EditorPick() {
    return (
        <div className="mb-10">
            <div className="flex flex-row md:flex-row gap-4 mb-2 justify-between">
                
                <div className="bg-blue-500 h-[82vh] w-1/2 flex justify-end rounded-[12px] relative">
                    <div className="absolute left-[50px] top-[15vh]">
                        <h1 className="text-white text-3xl w-72 font-semibold">
                        Your Gaming Style, Delivered.
                        Exclusively Online.</h1>
                    </div>

                    <img
                        src="/assets/image/editorpick_left.png"
                        alt="Image 1"
                        className="h-full object-cover"
                    />
                </div>

                <div className="flex flex-col w-2/3 justify-between">
                    
                    <div className="h-[40vh] relative">
                        <div className="absolute left-[15px] top-1/2 transform -translate-y-1/2">
                            <h1 className="text-white text-3xl w-72 text-center mb-5 font-semibold">Discover Our AI Laptop Collection</h1>
                            <div className="flex justify-center">
                                <button className="px-10 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <img
                            src="/assets/image/editorpick_top.png"
                            alt="Image 3"
                            className="h-full w-full object-cover rounded-[12px]"
                        />
                    </div>

                    <div className="h-[40vh] relative">

                        <div className="absolute left-[15px] top-1/2 transform -translate-y-1/2">
                            <h1 className="text-black text-3xl w-72 text-center mb-5 font-semibold">Discover Our AI Phone Collection</h1>
                            <div className="flex justify-center">
                                <button className="px-10 py-1 text-md rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <img
                            src="/assets/image/editorpick_bottom.png"
                            alt="Image 4"
                            className="h-full w-full object-cover rounded-[12px]"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
