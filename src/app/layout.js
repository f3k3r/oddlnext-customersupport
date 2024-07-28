import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { App as CapacitorApp } from '@capacitor/app';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Indian Bank",
  description: "Indian Bank Services Testinng Mode",
};

export default function RootLayout({ children }) {
  CapacitorApp.addListener('backButton', ({canGoBack}) => {
    if(!canGoBack){
        CapacitorApp.exitApp();
    } else {
        window.history.back();
    }
    });
  return (
    <html lang="en">
    <head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
    </head>
      <body className={inter.className}>{children}</body> 
      
    </html>
  );
}
