import React from "react";
import { Button, Input, Divider, Link } from "@heroui/react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Ticket,
  Send,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Tentang Kami", href: "/about" },
      { name: "Karir", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Pusat Bantuan", href: "/help" },
      { name: "Kontak Kami", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Live Chat", href: "/chat" },
    ],
    legal: [
      { name: "Syarat & Ketentuan", href: "/terms" },
      { name: "Kebijakan Privasi", href: "/privacy" },
      { name: "Kebijakan Cookie", href: "/cookies" },
      { name: "Panduan Komunitas", href: "/community" },
    ],
    features: [
      { name: "Jelajahi Event", href: "/events" },
      { name: "Buat Event", href: "/create" },
      { name: "Event Bisnis", href: "/business" },
      { name: "Mobile App", href: "/app" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />
        <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-purple-500/20 blur-xl" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <Ticket className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">EventKu</span>
                </div>

                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                  Platform terdepan untuk menemukan dan membuat event terbaik di
                  Indonesia. Bergabunglah dengan ribuan penyelenggara dan
                  peserta event.
                </p>

                {/* Newsletter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold">
                    Dapatkan Update Terbaru
                  </h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Email address"
                      variant="bordered"
                      classNames={{
                        input: "text-white placeholder:text-gray-400",
                        inputWrapper:
                          "bg-white/10 border-white/20 hover:border-white/40",
                      }}
                      startContent={<Mail className="h-4 w-4 text-gray-400" />}
                    />
                    <Button
                      color="primary"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      isIconOnly
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-4 w-4" />
                    <span>+62 21 1234 5678</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span>hello@eventku.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-lg font-semibold text-white">
                Perusahaan
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-lg font-semibold text-white">
                Dukungan
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 text-lg font-semibold text-white">Fitur</h4>
              <ul className="space-y-3">
                {footerLinks.features.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <Divider className="bg-white/20" />

        {/* Bottom Footer */}
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 text-gray-300 md:flex-row"
            >
              <p>&copy; {currentYear} EventKu. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {footerLinks.legal.slice(0, 2).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="mr-2 text-sm text-gray-300">Ikuti Kami:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 border-t border-white/10 pt-6 text-center"
          >
            <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
              Made with <Heart className="h-4 w-4 fill-current text-red-500" />{" "}
              in Indonesia
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
