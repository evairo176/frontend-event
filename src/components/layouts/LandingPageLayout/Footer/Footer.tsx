import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-between bg-slate-900 px-6 py-10 text-center lg:flex-row lg:text-left">
      <Image
        src="/images/general/logo.svg"
        alt="logo"
        className="mb-4 w-40 lg:mb-0 lg:w-60"
        width={200}
        height={100}
      />
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div>
          <h4 className="text-xl text-white">Customer Service</h4>
          <p className="text-gray-600">
            <Link href={"mailto:semenjakpetang176@gmail.com"}>
              semenjakpetang176@gmail.com
            </Link>{" "}
            | <Link href={"tell:+6281388394941"}>+6281388394941</Link> |{" "}
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Office</h4>
          <p className="text-gray-600">Jalan tebet kuningan jakarta selatan</p>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4 lg:mb-0">
        <div className="mb-2 text-xl text-white lg:mb-0">Menu</div>
        {NAV_ITEMS?.map((row, index) => {
          return (
            <Link
              className="cursor-pointer text-sm text-gray-600 hover:text-white"
              key={`${row.label}-${index}`}
              href={row.href}
            >
              {row.label}
            </Link>
          );
        })}
      </div>
      <div className="mb-4 flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-gray-600">
          {SOCIAL_ITEMS?.map((row, index) => {
            return (
              <Link
                key={`footer-social-media-${row.label}-${index}`}
                href={row.href}
                className="flex gap-2 text-3xl hover:text-white"
              >
                {row.icon}
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-gray-600">
          Copyright @ {new Date().getFullYear()} acara. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
