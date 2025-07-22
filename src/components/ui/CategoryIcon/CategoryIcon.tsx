import React from "react";
import {
  Music,
  Palette,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Heart,
  Utensils,
  Plane,
  Dumbbell,
  Camera,
  Code,
  Mic,
  Users,
  Calendar,
  Star,
  Gift,
  ShoppingBag,
  Car,
  Home,
  Sparkles,
  Coffee,
  Book,
  Trophy,
  Headphones,
  Laptop,
  Smartphone,
  Globe,
  MapPin,
  Clock,
  Zap,
  Film,
  Tv,
  Radio,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

// Icon mapping for different category types
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  // Entertainment & Arts
  music: Music,
  art: Palette,
  entertainment: Sparkles,
  gaming: Gamepad2,
  photography: Camera,
  film: Film,
  tv: Tv,
  radio: Radio,

  // Education & Professional
  education: GraduationCap,
  business: Briefcase,
  technology: Code,
  conference: Mic,
  book: Book,
  laptop: Laptop,

  // Health & Lifestyle
  health: Heart,
  fitness: Dumbbell,
  food: Utensils,
  travel: Plane,
  coffee: Coffee,

  // Social & Community
  community: Users,
  networking: Users,
  meetup: Calendar,
  trophy: Trophy,

  // Shopping & Commerce
  shopping: ShoppingBag,
  market: Gift,

  // Transportation & Automotive
  automotive: Car,
  transport: Car,

  // Real Estate & Property
  property: Home,
  realestate: Home,

  // Technology & Digital
  smartphone: Smartphone,
  headphones: Headphones,
  globe: Globe,
  zap: Zap,

  // Location & Time
  location: MapPin,
  time: Clock,

  // Default fallback
  default: Star,
};

// Get all available icon keys
export const getAvailableIcons = () => Object.keys(CATEGORY_ICONS);

export interface CategoryIconProps {
  /**
   * Category type/name to determine which icon to show
   */
  category?: string;
  /**
   * Size of the icon
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Custom className for styling
   */
  className?: string;
  /**
   * Color variant
   */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /**
   * Whether to show background circle
   */
  withBackground?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  category = "default",
  size = "md",
  className,
  variant = "default",
  withBackground = false,
}) => {
  // Get the appropriate icon component
  const IconComponent =
    CATEGORY_ICONS[category.toLowerCase()] || CATEGORY_ICONS.default;

  // Size classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  // Color variant classes
  const variantClasses = {
    default: "text-gray-600",
    primary: "text-blue-600",
    secondary: "text-purple-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  };

  // Background classes when withBackground is true
  const backgroundClasses = {
    default: "bg-gray-100",
    primary: "bg-blue-100",
    secondary: "bg-purple-100",
    success: "bg-green-100",
    warning: "bg-yellow-100",
    danger: "bg-red-100",
  };

  // Container size for background
  const containerSizeClasses = {
    sm: "p-2",
    md: "p-2.5",
    lg: "p-3",
    xl: "p-4",
  };

  const iconClasses = cn(sizeClasses[size], variantClasses[variant], className);

  if (withBackground) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          backgroundClasses[variant],
          containerSizeClasses[size],
        )}
      >
        <IconComponent className={iconClasses} />
      </div>
    );
  }

  return <IconComponent className={iconClasses} />;
};

export default CategoryIcon;
