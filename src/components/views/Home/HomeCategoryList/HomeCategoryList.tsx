import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Skeleton } from "@heroui/react";
import { ICategory } from "@/types/Category";
import Image from "next/image";

type Props = {
  dataCategory: ICategory[];
  isLoadingCategory: boolean;
};

const CategorySkeleton = ({ index }: { index: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issue
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <div className="animate-pulse">
          <Card className="bg-gradient-to-br from-white to-gray-50">
            <CardBody className="p-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <Skeleton className="mb-3 h-[35px] w-20 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

const HomeCategoryList = ({ dataCategory, isLoadingCategory }: Props) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Kategori Event Populer
        </h2>
        <p className="text-lg text-gray-600">
          Pilih kategori yang sesuai dengan minatmu
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {isLoadingCategory
          ? // Show skeleton when loading
            Array.from({ length: 8 }).map((_, index) => (
              <CategorySkeleton key={`skeleton-${index}`} index={index} />
            ))
          : // Show actual data when loaded
            dataCategory?.length > 0 &&
            dataCategory?.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="cursor-pointer bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:shadow-lg">
                  <CardBody className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        src={category.icon as string}
                        className="mb-3"
                        height={35}
                        width={80}
                        alt={category.name as string}
                      />
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default HomeCategoryList;
