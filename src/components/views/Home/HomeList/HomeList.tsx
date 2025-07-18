import { IEventHome } from "@/types/Event";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
import { ArrowRight, Calendar, MapPin, Star, Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

type Props = {
  events: IEventHome[];
  isLoadingEvent: boolean;
};

const HomeList = ({ events, isLoadingEvent }: Props) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Event Populer
          </h2>
          <p className="text-lg text-gray-600">
            Event terpopuler yang tidak boleh kamu lewatkan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events &&
            !isLoadingEvent &&
            events?.map((event, index) => (
              <ItemCard key={event.id} event={event} index={index} />
            ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            color="primary"
            variant="bordered"
            className="font-semibold"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Lihat Semua Event
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeList;
