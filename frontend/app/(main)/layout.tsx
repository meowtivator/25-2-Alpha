import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function MainLayout({children} : {children: React.ReactNode}) {
  return(
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-hidden">{children}</main>
      <BottomTabBar/>
    </div>
  )
}