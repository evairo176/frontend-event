"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Chip,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import { Search, Calendar, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import HomeSlider from "./HomeSlider/HomeSlider";
import useHome from "./useHome";

import HomeList from "./HomeList";
import HomeCategoryList from "./HomeCategoryList/HomeCategoryList";
import { useRouter } from "next/router";
import {
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/components/constants/list.constants";
import { IEvent, IEventHome } from "@/types/Event";
import Image from "next/image";
import HomeEventSearch from "./HomeEventSearch";

type Props = {};

const fastFilter = [
  // { label: "Hari Ini", icon: "📅" },
  // { label: "Gratis", icon: "🆓" },
  { label: "Online", icon: "💻", filter: "true" },
  { label: "Offline", icon: "📍", filter: "false" },
  // { label: "Trending", icon: "🔥" },
  // { label: "Terdekat", icon: "📍" },
];

const Home = (props: Props) => {
  const router = useRouter();
  const {
    dataBanner,
    isLoadingBanner,
    dataEvent,
    isLoadingEvent,
    dataCategory,
    isLoadingCategory,

    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    handleSearch,
    search,
    setSearch,
  } = useHome();

  const handleFastFilterIsOnline = (value: string, url: string) => {
    const isOnline = value;
    router.push({
      pathname: url,
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Temukan Event
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Terbaik Untukmu
              </span>
            </h1>
            <p className="mb-8 text-xl text-blue-100 md:text-2xl">
              Jelajahi ribuan event menarik di seluruh Indonesia. Dari konser
              musik hingga workshop bisnis.
            </p>

            {/* Search Card */}
            <HomeEventSearch
              dataEventSearch={dataEventSearch?.data || []}
              isLoadingEventSearch={isLoadingEventSearch}
              isRefetchingEventSearch={isRefetchingEventSearch}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              handleFastFilterIsOnline={handleFastFilterIsOnline}
              fastFilter={fastFilter}
            />
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute left-10 top-20 opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20"
          >
            <Ticket className="h-8 w-8" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
          >
            <Calendar className="h-6 w-6" />
          </motion.div>
        </div>
      </section>

      {/* Banner Slider Section */}
      <HomeSlider
        banners={dataBanner?.data || []}
        isLoadingBanners={isLoadingBanner}
      />

      {/* Categories Section */}
      <HomeCategoryList
        dataCategory={dataCategory?.data || []}
        isLoadingCategory={isLoadingCategory}
      />

      {/* Popular Events Section */}
      <HomeList
        events={dataEvent?.data || []}
        isLoadingEvent={isLoadingEvent}
      />

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-3xl font-bold md:text-4xl">10K+</h3>
              <p className="text-blue-100">Event Tersedia</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-3xl font-bold md:text-4xl">500K+</h3>
              <p className="text-blue-100">Pengguna Aktif</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-3xl font-bold md:text-4xl">50+</h3>
              <p className="text-blue-100">Kota di Indonesia</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-2 text-3xl font-bold md:text-4xl">4.8</h3>
              <p className="text-blue-100">Rating Pengguna</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              Siap Menemukan Event Impianmu?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Bergabunglah dengan ribuan orang yang sudah menemukan pengalaman
              tak terlupakan melalui platform kami.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                color="primary"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 font-semibold"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Mulai Jelajahi Event
              </Button>
              <Button
                size="lg"
                variant="bordered"
                color="primary"
                className="px-8 font-semibold"
              >
                Buat Event Sendiri
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
