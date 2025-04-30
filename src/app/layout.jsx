import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/footer";
import { AppHeader } from "@/components/layout/app-header";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata= {
  metadataBase: new URL("https://ai-resume-builder-adityaprakash.vercel.app"),
  title: {
    default: "AI Resume Builder by Aditya Prakash",
    template: "%s | AI Resume Builder"
  },
  description: "Create tailored, ATS-optimized resumes powered by AI. Land your dream tech job with personalized resume optimization.",
  applicationName: "AI Resume Builder",
  keywords: ["resume builder", "AI resume", "ATS optimization", "tech jobs", "career tools", "job application"],
  authors: [{ name: "Aditya Prakash" }],
  creator: "Aditya Prakash",
  publisher: "Aditya Prakash",
  formatDetection: {
    email,
    address,
    telephone,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "AI Resume Builder",
    title: "AI Resume Builder by Aditya Prakash",
    description: "Create tailored, ATS-optimized resumes powered by AI. Land your dream tech job with personalized resume optimization.",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "AI Resume Builder by Aditya Prakash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Builder by Aditya Prakash",
    description: "Create tailored, ATS-optimized resumes powered by AI. Land your dream tech job with personalized resume optimization.",
    images: ["/og.webp"],
    creator: "@adityaprakash",
  },
  robots: {
    index,
    follow,
    googleBot: {
      index,
      follow,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "google-site-verification-code", // Replace with actual verification code
  // },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data= await supabase.auth.getUser();

  return (
    
      
        
          {user && }
          {/* Padding for header and footer */}
          
            {children}
            
          
          {user &&  }
        
        
      
    
  );
}
