"use client";
import { ICreateBackendBanner } from "@/types/Banner";
import React, { useState, useEffect } from "react";
import { Button, Skeleton } from "@heroui/react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = {
  banners: ICreateBackendBanner[];
  isLoadingBanners: boolean;
};

const HomeSlider = ({ banners, isLoadingBanners }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay || !banners || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, banners]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-[600px]">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <>
      {!banners ||
        (banners.length === 0 && (
          <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 md:h-[500px] lg:h-[600px]">
            <p className="text-lg text-gray-500">No banners available</p>
          </div>
        ))}
      {isLoadingBanners && (
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px] lg:h-[600px]">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      {banners?.length > 0 && !isLoadingBanners && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Event Unggulan
            </h2>
            <p className="text-lg text-gray-600">
              Jangan lewatkan event-event menarik yang sedang trending
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[500px] lg:h-[600px]">
              {/* Main Slider */}
              <div className="relative h-full w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div
                      className="relative h-full w-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${banners[currentSlide]?.image || "/images/placeholder-banner.jpg"})`,
                      }}
                    >
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30" />

                      {/* Content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-4xl px-4 text-center text-white">
                          <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl"
                          >
                            {banners[currentSlide]?.title ||
                              "Welcome to EventKu"}
                          </motion.h2>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <Button
                              size="lg"
                              color="primary"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold"
                            >
                              Jelajahi Event
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {banners.length > 1 && (
                <>
                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute left-4 top-1/2 -translate-y-1/2 border-white/20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    onPress={prevSlide}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    isIconOnly
                    variant="flat"
                    className="absolute right-4 top-1/2 -translate-y-1/2 border-white/20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    onPress={nextSlide}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Dots Indicator */}
              {banners.length > 1 && (
                <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={cn(
                        "h-3 w-3 rounded-full transition-all duration-300",
                        currentSlide === index
                          ? "scale-125 bg-white"
                          : "bg-white/50 hover:bg-white/70",
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Auto-play Control */}
              {banners.length > 1 && (
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  className="absolute right-4 top-4 border-white/20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  onPress={toggleAutoPlay}
                >
                  {isAutoPlay ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              )}

              {/* Slide Counter */}
              {banners.length > 1 && (
                <div className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  {currentSlide + 1} / {banners.length}
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
};

export default HomeSlider;
