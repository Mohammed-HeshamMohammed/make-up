import { Brush, Scissors, DollarSign } from "lucide-react";
import { ServiceType } from "@/types/service";

export const services: ServiceType[] = [
  {
    id: 1,
    category: "hair",
    title: "Blowouts & Styling",
    description: "Includes: Wash, blow-dry, iron/curling (client's choice)",
    price: "500 EGP",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/booking?service=blowout",
    icon: Brush
  },
  {
    id: 2,
    category: "hair",
    title: "Hair Dye",
    description: "Options: Full color, highlights, root touch-up",
    price: "3,500 EGP",
    image: "/lovable-uploads/23782e1a-b001-4f69-b42f-38a5edd0d4fc.png",
    link: "/booking?service=coloring",
    icon: Brush
  },
  {
    id: 3,
    category: "hair",
    title: "Hair Cut",
    description: "Includes: Split-end removal, light layering",
    price: "700 EGP",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3",
    link: "/booking?service=trimming",
    icon: Scissors
  },
  {
    id: 4,
    category: "nails",
    title: "Pedicure/Manicure",
    description: "Options: Basic (cuticle care + polish), Spa (exfoliation + massage)",
    price: "500 EGP",
    image: "/lovable-uploads/40577a66-805a-47df-8aa7-97daace3e383.png",
    link: "/booking?service=manicure",
    icon: DollarSign
  },
  {
    id: 5,
    category: "nails",
    title: "Gel Polish",
    description: "Premium long-lasting gel polish application",
    price: "600 EGP",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3",
    link: "/booking?service=gel-polish",
    icon: DollarSign
  },
  {
    id: 6,
    category: "nails",
    title: "Hard Gel Extensions",
    description: "Professional nail extensions with premium hard gel",
    price: "1,200 EGP",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3",
    link: "/booking?service=gel-extensions",
    icon: DollarSign
  },
  {
    id: 7,
    category: "lashes",
    title: "Lash Lifting",
    description: "Effect: Natural curl enhancement (lasts 6–8 weeks)",
    price: "1,000 EGP",
    image: "/lovable-uploads/5426a857-6969-48d5-be2a-ba32a8219daa.png",
    link: "/booking?service=lash-lifting",
    icon: DollarSign
  },
  {
    id: 8,
    category: "lashes",
    title: "Classic Extensions",
    description: "1:1 individual lash application for natural enhancement",
    price: "1,500 EGP",
    image: "/lovable-uploads/e541bc96-6288-46eb-82bd-e210b62051f1.png",
    link: "/booking?service=classic-extensions",
    icon: DollarSign
  },
  {
    id: 9,
    category: "lashes",
    title: "Hybrid Extensions",
    description: "Mix of classic and volume techniques for added drama",
    price: "1,800 EGP",
    image: "/lovable-uploads/01168562-6ffd-43b9-80c8-10cca19ed04b.png",
    link: "/booking?service=hybrid-extensions",
    icon: DollarSign
  },
  {
    id: 10,
    category: "makeup",
    title: "Everyday Glam",
    description: "Perfect for daily occasions and professional looks",
    price: "700 EGP",
    image: "/lovable-uploads/3260662e-8417-4825-9bbd-5858adede228.png",
    link: "/booking?service=everyday-glam",
    icon: DollarSign
  },
  {
    id: 11,
    category: "makeup",
    title: "Soire",
    description: "Premium makeup for special occasions",
    price: "2,000 EGP",
    image: "/lovable-uploads/73264c02-7d6d-4177-8d75-3bac89c8b9f8.png",
    link: "/booking?service=bridal-makeup",
    icon: DollarSign
  },
  {
    id: 12,
    category: "wedding",
    title: "Bridal Package",
    description: "Hair Styling + Makeup",
    price: "18,000 EGP",
    image: "/lovable-uploads/99df6273-f4cc-47f2-9cc3-734da4750f09.png",
    link: "/booking?service=bridal-package",
    icon: DollarSign
  },
  {
    id: 13,
    category: "wedding",
    title: "Premium Wedding Package",
    description: "Hair Styling + Makeup + Nails + Lashes",
    price: "22,000 EGP",
    image: "/lovable-uploads/99df6273-f4cc-47f2-9cc3-734da4750f09.png",
    link: "/booking?service=premium-wedding-package",
    icon: DollarSign
  },
  {
    id: 14,
    category: "wedding",
    title: "Mother Package",
    description: "Hair Styling + Makeup + Nails",
    price: "8,000 EGP",
    image: "/lovable-uploads/73264c02-7d6d-4177-8d75-3bac89c8b9f8.png",
    link: "/booking?service=mother-wedding-package",
    icon: DollarSign
  },
  {
    id: 15,
    category: "wedding",
    title: "Bridesmaids Package",
    description: "Makeup for 5 girls",
    price: "7,000 EGP",
    image: "/lovable-uploads/73264c02-7d6d-4177-8d75-3bac89c8b9f8.png",
    link: "/booking?service=bridesmaids-package",
    icon: DollarSign
  }
];