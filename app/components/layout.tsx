import { PropsWithChildren } from "react";
import { Montserrat } from "@next/font/google";
import Nav from "./nav";

const montserrat = Montserrat({
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
