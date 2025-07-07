import PageHead from "@/components/commons/PageHead";
import React from "react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title = "Auth", children }: Props) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10">
      <PageHead title={title} />
      <section className="max-w-screen 3xl:container p-6">{children}</section>
    </div>
  );
};

export default AuthLayout;
