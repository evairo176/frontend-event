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
      <div className="py-10 md:p-6">{children}</div>
      <Footer />
    </>
  );
};

export default LandingPageLayout;
