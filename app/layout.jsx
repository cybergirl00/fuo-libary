import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Barcode Scanner",
  description: "Book Barcode Scanner for school",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex ">
      <Sidebar />
      <main className="flex-grow lg:ml-64 p-4">
      {children}
      </main>
        </div>
        <Toaster />
        </body>

    </html>
  );
}
