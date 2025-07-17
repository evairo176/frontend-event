import PageHead from "@/components/commons/PageHead";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  title: string;
  children: React.ReactNode;
};

const LandingPageLayout = ({ title, children }: Props) => {
  return (
    <>
      <PageHead title={title} />
      {/* navbar  */}
      <Navbar />
      {/* main  */}
      {children}
      <Footer />
    </>
  );
};

export default LandingPageLayout;
