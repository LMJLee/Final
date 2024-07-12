"use client";

import "./globals.css";
import SessionProvider from "./SessionProvider";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { SelectedPage } from "./shared/types";
import Admin from "./admin/page";


import Footer from "./scenes/footer";
import Navbar from "./scenes/navbar";
import Home from "./scenes/home";
import Contact from "./scenes/contact";
import About from "./scenes/about";
import Gallery from "./scenes/gallery";
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      } else {
        setIsTopOfPage(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" className="h-full ">
      <body>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Admin />}/>
            
          </Routes>
        

        <Navbar
              isTopOfPage={isTopOfPage}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Home setSelectedPage={setSelectedPage} />
            <Gallery setSelectedPage={setSelectedPage} />
            <About setSelectedPage={setSelectedPage} />
            <Contact setSelectedPage={setSelectedPage} />
            <Footer />
            </BrowserRouter>

           {children}
          </SessionProvider>
      </body>
    </html>
  );
}
