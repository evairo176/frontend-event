"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { Search, Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import HomeSlider from "./HomeSlider/HomeSlider";
import useHome from "./useHome";
import { ICreateBackendBanner } from "@/types/Banner";
import HomeList from "./HomeList";
import HomeCategoryList from "./HomeCategoryList/HomeCategoryList";

const categories = [
  { key: "music", label: "Musik", icon: "🎵" },
  { key: "sports", label: "Olahraga", icon: "⚽" },
  { key: "business", label: "Bisnis", icon: "💼" },
  { key: "technology", label: "Teknologi", icon: "💻" },
  { key: "art", label: "Seni", icon: "🎨" },
  { key: "food", label: "Kuliner", icon: "🍽️" },
];

type Props = {};

const Home = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    dataBanner,
    isLoadingBanner,
    dataEvent,
    isLoadingEvent,
    dataCategory,
    isLoadingCategory,
  } = useHome();

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto w-full max-w-6xl"
            >
              <Card className="border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
                <CardBody className="p-8">
                  {/* Search Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-6 text-center"
                  >
                    <h3 className="mb-2 text-2xl font-bold text-gray-800">
                      Cari Event Favoritmu
                    </h3>
                    <p className="text-gray-600">
                      Temukan event yang sesuai dengan minat dan lokasimu
                    </p>
                  </motion.div>

                  {/* Horizontal Search Form */}
                  <div className="flex flex-col items-stretch gap-4 lg:flex-row">
                    {/* Search Input */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex-1"
                    >
                      <Input
                        placeholder="Cari nama event, artis, atau penyelenggara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        startContent={
                          <Search className="h-5 w-5 text-gray-400" />
                        }
                        size="lg"
                        classNames={{
                          input: "text-gray-700 text-base",
                          inputWrapper:
                            "bg-gray-50 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 transition-colors h-14",
                        }}
                      />
                    </motion.div>

                    {/* Location Select */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="lg:w-48"
                    >
                      <Select
                        placeholder="Pilih Kota"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        startContent={
                          <MapPin className="h-5 w-5 text-gray-400" />
                        }
                        size="lg"
                        classNames={{
                          trigger:
                            "bg-gray-50 border-gray-200 hover:border-blue-300 h-14",
                          value: "text-gray-700",
                        }}
                      >
                        <SelectItem key="jakarta" textValue="jakarta">
                          <div className="flex items-center gap-2">
                            <span>🏙️</span>
                            <span>Jakarta</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="bandung" textValue="bandung">
                          <div className="flex items-center gap-2">
                            <span>🏔️</span>
                            <span>Bandung</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="surabaya" textValue="surabaya">
                          <div className="flex items-center gap-2">
                            <span>🏭</span>
                            <span>Surabaya</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="bali" textValue="bali">
                          <div className="flex items-center gap-2">
                            <span>🏝️</span>
                            <span>Bali</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="yogyakarta" textValue="yogyakarta">
                          <div className="flex items-center gap-2">
                            <span>🏛️</span>
                            <span>Yogyakarta</span>
                          </div>
                        </SelectItem>
                      </Select>
                    </motion.div>

                    {/* Category Select */}
                    <motion.div
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="lg:w-48"
                    >
                      <Select
                        placeholder="Kategori"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        size="lg"
                        classNames={{
                          trigger:
                            "bg-gray-50 border-gray-200 hover:border-blue-300 h-14",
                          value: "text-gray-700",
                        }}
                      >
                        {categories.map((category) => (
                          <SelectItem
                            key={category.key}
                            textValue={category.key}
                          >
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                    </motion.div>

                    {/* Search Button */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        color="primary"
                        size="lg"
                        className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 px-8 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                        endContent={<Search className="h-5 w-5" />}
                      >
                        <span className="hidden sm:inline">Cari Event</span>
                        <span className="sm:hidden">Cari</span>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Quick Filters */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-6 border-t border-gray-200 pt-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">
                        Filter Cepat:
                      </span>
                      {[
                        { label: "Hari Ini", icon: "📅" },
                        { label: "Gratis", icon: "🆓" },
                        { label: "Online", icon: "💻" },
                        { label: "Trending", icon: "🔥" },
                        { label: "Terdekat", icon: "📍" },
                      ].map((filter, index) => (
                        <motion.div
                          key={filter.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Chip
                            variant="flat"
                            className="cursor-pointer transition-colors hover:bg-blue-100"
                            startContent={
                              <span className="text-xs">{filter.icon}</span>
                            }
                          >
                            {filter.label}
                          </Chip>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardBody>
              </Card>
            </motion.div>
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
