import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Chip,
  Divider,
} from "@heroui/react";
import { Search, Calendar, MapPin, Users, Star, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";


const categories = [
  { key: "music", label: "Musik", icon: "🎵" },
  { key: "sports", label: "Olahraga", icon: "⚽" },
  { key: "business", label: "Bisnis", icon: "💼" },
  { key: "technology", label: "Teknologi", icon: "💻" },
  { key: "art", label: "Seni", icon: "🎨" },
  { key: "food", label: "Kuliner", icon: "🍽️" },
];

const popularEvents = [
  {
    id: 1,
    title: "Jakarta Music Festival 2025",
    location: "Jakarta Convention Center",
    date: "15 Feb 2025",
    price: "Rp 250.000",
    image: "/images/event1.jpg",
    rating: 4.8,
    attendees: 1200,
    category: "Musik"
  },
  {
    id: 2,
    title: "Tech Summit Indonesia",
    location: "Bali International Convention Centre",
    date: "22 Mar 2025",
    price: "Rp 500.000",
    image: "/images/event2.jpg",
    rating: 4.9,
    attendees: 800,
    category: "Teknologi"
  },
  {
    id: 3,
    title: "Food & Beverage Expo",
    location: "Surabaya Convention Hall",
    date: "10 Apr 2025",
    price: "Rp 150.000",
    image: "/images/event3.jpg",
    rating: 4.7,
    attendees: 950,
    category: "Kuliner"
  },
];


type Props = {};

const Home = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  return     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  {/* Hero Section */}
  <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
    <div className="absolute inset-0 bg-black/20" />
    <div className="relative container mx-auto px-4 py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Temukan Event
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Terbaik Untukmu
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Jelajahi ribuan event menarik di seluruh Indonesia. Dari konser musik hingga workshop bisnis.
        </p>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20">
            <CardBody className="p-8">
              {/* Search Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-6"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Cari Event Favoritmu
                </h3>
                <p className="text-gray-600">
                  Temukan event yang sesuai dengan minat dan lokasimu
                </p>
              </motion.div>

              {/* Horizontal Search Form */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch">
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
                    startContent={<Search className="w-5 h-5 text-gray-400" />}
                    size="lg"
                    classNames={{
                      input: "text-gray-700 text-base",
                      inputWrapper: "bg-gray-50 border-gray-200 hover:border-blue-300 focus-within:border-blue-500 transition-colors h-14"
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
                    startContent={<MapPin className="w-5 h-5 text-gray-400" />}
                    size="lg"
                    classNames={{
                      trigger: "bg-gray-50 border-gray-200 hover:border-blue-300 h-14",
                      value: "text-gray-700"
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
                      trigger: "bg-gray-50 border-gray-200 hover:border-blue-300 h-14",
                      value: "text-gray-700"
                    }}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.key} textValue={category.key}>
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold px-8 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                    endContent={<Search className="w-5 h-5" />}
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
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Filter Cepat:</span>
                  {[
                    { label: "Hari Ini", icon: "📅" },
                    { label: "Gratis", icon: "🆓" },
                    { label: "Online", icon: "💻" },
                    { label: "Trending", icon: "🔥" },
                    { label: "Terdekat", icon: "📍" }
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
                        className="cursor-pointer hover:bg-blue-100 transition-colors"
                        startContent={<span className="text-xs">{filter.icon}</span>}
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
    <div className="absolute top-20 left-10 opacity-20">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
      >
        <Ticket className="w-8 h-8" />
      </motion.div>
    </div>
    <div className="absolute bottom-20 right-10 opacity-20">
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
      >
        <Calendar className="w-6 h-6" />
      </motion.div>
    </div>
  </section>

  {/* Categories Section */}
  <section className="py-16 container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Kategori Event Populer
      </h2>
      <p className="text-gray-600 text-lg">
        Pilih kategori yang sesuai dengan minatmu
      </p>
    </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.key}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
            <CardBody className="text-center p-6">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-800">{category.label}</h3>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>

  {/* Popular Events Section */}
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Event Populer
        </h2>
        <p className="text-gray-600 text-lg">
          Event terpopuler yang tidak boleh kamu lewatkan
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Chip color="primary" variant="solid" size="sm">
                    {event.category}
                  </Chip>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{event.rating}</span>
                  </div>
                </div>
              </div>
              <CardBody className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees} peserta</span>
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Mulai dari</p>
                    <p className="text-xl font-bold text-blue-600">{event.price}</p>
                  </div>
                  <Button
                    color="primary"
                    variant="flat"
                    endContent={<ArrowRight className="w-4 h-4" />}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          size="lg"
          color="primary"
          variant="bordered"
          className="font-semibold"
          endContent={<ArrowRight className="w-4 h-4" />}
        >
          Lihat Semua Event
        </Button>
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">10K+</h3>
          <p className="text-blue-100">Event Tersedia</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">500K+</h3>
          <p className="text-blue-100">Pengguna Aktif</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">50+</h3>
          <p className="text-blue-100">Kota di Indonesia</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">4.8</h3>
          <p className="text-blue-100">Rating Pengguna</p>
        </motion.div>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Siap Menemukan Event Impianmu?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Bergabunglah dengan ribuan orang yang sudah menemukan pengalaman tak terlupakan melalui platform kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            color="primary"
            className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold px-8"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            Mulai Jelajahi Event
          </Button>
          <Button
            size="lg"
            variant="bordered"
            color="primary"
            className="font-semibold px-8"
          >
            Buat Event Sendiri
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
</div>;
};

export default Home;
