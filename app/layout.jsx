import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Barcode Scanner",
  description: "Book Barcode Scanner for school",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex gap-5">
      <Sidebar />
      <main className="w-full">
      {children}
      </main>
        </div>
        <Toaster />
        </body>

    </html>
  );
}
