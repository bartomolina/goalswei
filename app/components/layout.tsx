import { PropsWithChildren } from "react";
import { Montserrat } from "@next/font/google";
import Nav from "./nav";

const montserrat = Montserrat({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Layout = ({ children }: PropsWithChildren) => (
  <div className={`${montserrat.variable} font-sans min-h-full className="bg-gray-100`}>
    <Nav />
    <div className="bg-gray-100">{children}</div>
  </div>
);

export default Layout;
