"use client";

import { LucideSearch } from "lucide-react";
import { useState } from "react";

interface SearchBarProps{
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps){
  const [query, setQuery] = useState("");

  const handleSearch = () =>{
    console.log("검색: ", query);
  };

  return (
    <div className="bg-blue-50 rounded-full shadow-lg px-4 py-3 border-blue-100 border-2 flex items-center gap-3">
      <LucideSearch/>

      <input 
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 outline-none text-body-small"
      />
    </div>
  )

}