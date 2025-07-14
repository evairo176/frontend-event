import PageHead from "@/components/commons/PageHead";
import React from "react";
import Navbar from "./Navbar";

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
      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        {children}
      </div>
    </>
  );
};

export default LandingPageLayout;
