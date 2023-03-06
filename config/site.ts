import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    instagram: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Wardrobeme",
  description:
    "Discover your wardrobe like never before with Wardrobeme! Upload an image of your clothes and let our cutting-edge technology detect individual items and colors in the image. Say goodbye to guessing what's in your wardrobe and start organizing with ease. Try Wardrobeme today!",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Gallery",
      href: "/gallery",
    },
  ],
  links: {
    twitter: "https://twitter.com/educlopez93",
    github: "https://github.com/educlopez",
    instagram: "https://www.instagram.com/edui_design/",
  },
}
