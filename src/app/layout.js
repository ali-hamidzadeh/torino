import Header from "@/components/shared/Header";
import LoginModal from "@/components/ui/loginModal";
import AuthProvider from "@/components/shared/AuthProvider";
import QueryProvider from "@/components/shared/QueryProvider";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata = {
  title: "تورینو | جستجو و رزرو تور",
  description: "پلتفرم جستجو و رزرو تورهای مسافرتی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
            <LoginModal />
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
