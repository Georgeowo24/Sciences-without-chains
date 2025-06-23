import React, {useState} from "react";

const HeaderWithAccount = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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

                <div className="Relative">
                    <img src="#" alt="User-Icon" className="w-10 h-10 rounded-full cursor-pointer" onClick={ ()=> setMenuOpen(!menuOpen)}/>
                    {menuOpen && (
                        <div className="absolute rigth-1/4 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HeaderWithAccount;