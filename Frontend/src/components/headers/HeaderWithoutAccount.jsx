import React from "react";

const HeaderWithoutAccount = () => {
    return (
        <header className="w-full border-gray-200 border-b bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="h-10">
                        <img src="./Logo.png" alt="Science Without Chains logo" className="w-full h-full object-contain"/>
                    </div>
                    <span className="font-semibold text-lg">Science Without Chains</span>
                </div>

                <nav className="hidden md:flex space-x-10 text-md text-gray-700">
                    <a href="#" className="hover:text-black">Categories</a>
                    <a href="#" className="hover:text-black">About Us</a>
                    <a href="#" className="hover:text-black">Help</a>
                </nav>

                <div className="flex items-center space-x-10 text-md">
                    <a href="#" className="hover:undeline">Log In</a>
                </div>
            </div>
        </header>
    )
}

export default HeaderWithoutAccount;