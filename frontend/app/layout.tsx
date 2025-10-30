import type { Metadata } from "next";
import { COLORS } from "@/lib/constants/colors";
import "pretendard/dist/web/variable/pretendardvariable.css"
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "쉼터 찾기",
    template : "%s | 쉼터 찾기",
  },
  description: "당신의 여름과 겨울을 시원하고 따스하게 보낼 수 있는 곳을 알려드립니다.",

  viewport:{
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  // 주소창 색상
  themeColor: COLORS.blue[500], 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
