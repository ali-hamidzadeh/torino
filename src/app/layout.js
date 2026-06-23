import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "تورینو | جستجو و رزرو تور",
  description: "پلتفرم جستجو و رزرو تورهای مسافرتی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
