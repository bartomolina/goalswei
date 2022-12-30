import { PropsWithChildren } from "react";
import Nav from "./nav";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Layout = ({ children }: PropsWithChildren) => (
  <div className={`${montserrat.variable} font-sans min-h-full`}>
    <Nav />
    <div>{children}</div>
  </div>
);

export default Layout;
