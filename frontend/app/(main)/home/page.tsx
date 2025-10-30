import { SearchBar } from "@/components/map/SearchBar";

export default function MainPage() {
  return(
    <div className="flex flex-col items-center justify-center">
      <SearchBar placeholder="무더위 쉼터 위치 검색하기"/>
      <h1 className="text-h1">메인 지도 화면</h1>
    </div>
  )
}