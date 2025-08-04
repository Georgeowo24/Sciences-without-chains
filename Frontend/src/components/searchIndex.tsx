import { useState } from "react";
import { Button } from "@heroui/button";
import { SearchIcon } from "./icons";
import { useNavigate } from "react-router-dom";

export default function SearchIndex() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search/${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center bg-white shadow-md px-3 py-2 w-full max-w-md rounded-md h-14 w-full sm:w-96">
                <SearchIcon className="w-6 h-6 mr-2" color="black" />
                <input
                    type="text"
                    placeholder="Search free scientific documents"
                    className="flex-grow bg-transparent outline-none text-sm font-medium text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />
                <Button onClick={handleSearch} color="primary" variant="shadow">
                    Search
                </Button>
            </div>
        </div>
    );
}
