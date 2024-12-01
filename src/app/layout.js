import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { App as CapacitorApp } from '@capacitor/app';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Customer Support Service",
  description: "Customer Support Service in India",
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
      
    </head>
      <body className={inter.className}>{children}</body> 
      
    </html>
  );
}
