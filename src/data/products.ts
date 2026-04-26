import carFrost from "@/assets/car-frost.jpg";
import carInferno from "@/assets/car-inferno.jpg";
import carPhantom from "@/assets/car-phantom.jpg";
import carVelocity from "@/assets/car-velocity.jpg";

export type CarType = "Beginner" | "Pro" | "Drift" | "Limited";

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  price: number;
  speedKmh: number;
  tag: string;
  scale: string;
  accent: "blue" | "red" | "purple" | "cyan";
  type: CarType;
  rating: number;
  reviews: number;
  description: string;
  performance: { label: string; value: number }[];
  features: string[];
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "frost",
    slug: "frost-xr",
    name: "Frost XR",
    image: carFrost,
    gallery: [carFrost, carFrost, carFrost],
    price: 399,
    speedKmh: 58,
    tag: "Best Seller",
    scale: "1:16",
    accent: "cyan",
    type: "Beginner",
    rating: 4.6,
    reviews: 214,
    description: "A stable starter drift platform with predictable handling and plenty of grip for learning transitions.",
    performance: [
      { label: "Control", value: 82 },
      { label: "Speed", value: 58 },
      { label: "Drift Angle", value: 74 },
    ],
    features: ["2.4GHz radio included", "LED headlight kit", "Extra tire set"],
    specs: [
      { label: "Motor", value: "Brushed 390" },
      { label: "Battery", value: "7.4V 1800mAh Li-Ion" },
      { label: "Runtime", value: "25 minutes" },
    ],
  },
  {
    id: "inferno",
    slug: "inferno-rs",
    name: "Inferno RS",
    image: carInferno,
    gallery: [carInferno, carInferno, carInferno],
    price: 529,
    speedKmh: 72,
    tag: "Track Ready",
    scale: "1:10",
    accent: "red",
    type: "Drift",
    rating: 4.8,
    reviews: 167,
    description: "Aggressive power delivery and tuned suspension geometry for long, smoky tandem lines.",
    performance: [
      { label: "Control", value: 78 },
      { label: "Speed", value: 72 },
      { label: "Drift Angle", value: 88 },
    ],
    features: ["Brushless setup", "Aluminum shocks", "Gyro-assisted steering"],
    specs: [
      { label: "Motor", value: "3650 Brushless" },
      { label: "Battery", value: "7.4V 3000mAh LiPo" },
      { label: "Runtime", value: "22 minutes" },
    ],
  },
  {
    id: "phantom",
    slug: "phantom-gtr",
    name: "Phantom GTR",
    image: carPhantom,
    gallery: [carPhantom, carPhantom, carPhantom],
    price: 619,
    speedKmh: 84,
    tag: "Pro Spec",
    scale: "1:10",
    accent: "purple",
    type: "Pro",
    rating: 4.9,
    reviews: 121,
    description: "Competition-grade chassis with sharper front bite and a wide tuning window for experienced drivers.",
    performance: [
      { label: "Control", value: 86 },
      { label: "Speed", value: 84 },
      { label: "Drift Angle", value: 91 },
    ],
    features: ["Carbon top deck", "Metal drivetrain", "Dual mode gyro"],
    specs: [
      { label: "Motor", value: "10.5T Sensored Brushless" },
      { label: "Battery", value: "2S/3S compatible" },
      { label: "Runtime", value: "20 minutes" },
    ],
  },
  {
    id: "velocity",
    slug: "velocity-lx",
    name: "Velocity LX",
    image: carVelocity,
    gallery: [carVelocity, carVelocity, carVelocity],
    price: 749,
    speedKmh: 96,
    tag: "Limited Run",
    scale: "1:10",
    accent: "blue",
    type: "Limited",
    rating: 5,
    reviews: 73,
    description: "Top-tier limited edition build focused on speed and precision with premium materials throughout.",
    performance: [
      { label: "Control", value: 89 },
      { label: "Speed", value: 96 },
      { label: "Drift Angle", value: 94 },
    ],
    features: ["Limited numbered shell", "High torque servo", "Factory pre-tuned setup"],
    specs: [
      { label: "Motor", value: "8.5T Sensored Brushless" },
      { label: "Battery", value: "3S 4200mAh LiPo" },
      { label: "Runtime", value: "18 minutes" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
