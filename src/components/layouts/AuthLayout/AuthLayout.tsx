import PageHead from "@/components/cummons/PageHead";
import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title = "Auth", children }: Props) => {
  return (
    <>
      <PageHead title={title} />
      <section className="max-w-screen 3xl:container p-6">{children}</section>
    </>
  );
};

export default AuthLayout;
