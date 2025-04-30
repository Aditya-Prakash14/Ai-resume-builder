import { Metadata } from "next";
import { MockResume } from "@/components/landing/mock-resume";
import { MockResumeMobile } from "@/components/landing/mock-resume-mobile";
import { BenefitsList } from "@/components/landing/benefits-list";
import { ActionButtons } from "@/components/landing/action-buttons";
import { Logo } from "@/components/ui/logo";
import { ErrorDialog } from "@/components/auth/error-dialog";
import { CreatorStory } from "@/components/landing/creator-story";
import { HowItWorks } from "@/components/landing/how-it-works";
import { HeroVideoSection } from "@/components/landing/hero-video-section";
import { Footer } from "@/components/layout/footer";
import { SplitContent } from "@/components/ui/split-content";
import { NavLinks } from "@/components/layout/nav-links";
import { ModelShowcase } from "@/components/landing/model-showcase";

// import { WaitlistSection } from "@/components/waitlist/waitlist-section";

export const metadata= {
  title: "Login | ResumeLM - AI-Powered Resume Builder",
  description: "Create tailored, ATS-optimized resumes powered by AI. ResumeLM helps you land your dream tech job with personalized resume optimization.",
  keywords: ["resume builder", "AI resume", "ATS optimization", "tech jobs", "career tools", "job application"],
  authors: [{ name: "ResumeLM" }],
  openGraph: {
    title: "ResumeLM - AI-Powered Resume Builder",
    description: "Create tailored, ATS-optimized resumes powered by AI. Land your dream tech job with personalized resume optimization.",
    url: "https://resumelm.com/auth/login",
    siteName: "ResumeLM",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "ResumeLM - AI Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeLM - AI-Powered Resume Builder",
    description: "Create tailored, ATS-optimized resumes powered by AI. Land your dream tech job with personalized resume optimization.",
    images: ["/og.webp"],
    creator: "@resumelm",
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

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise
      
        {/* Error Dialog */}
        

        {/* Enhanced Gradient Background Elements */}
        
          {/* Primary gradient mesh with improved colors */}
          

          {/* Enhanced animated gradient orbs with better positioning and animations - mobile optimized */}
          
          
          

          {/* Enhanced mesh grid overlay with subtle animation */}
          
        

        {/* Enhanced Navigation with backdrop blur and border */}
        
          
            
              
              
            
          
        

        {/* Enhanced Content with better spacing and animations */}
        



          {/* Hero Section with Split Layout */}
          
            
              {/* Left Column - Content */}
              
                
                  {/* GitHub Badge */}
                  
                    
                      
                    
                    
                      Open Source on GitHub
                    
                    
                      
                    
                  

                  
                    
                      
                        Free AI Resume Builder
                      
                      
                      
                        that lands you tech jobs
                        
                      
                    

                    
                      Create tailored, ATS-optimized resumes powered by AI.
                    
                  

                  
                

                
              

              {/* Right Column - Floating Resume Preview */}
              
                {/* Mobile-only single resume view */}
                
                  
                    {/* Decorative Elements - Subtle gradients for mobile */}
                    
                    

                    {/* Stacked Resume Previews - Mobile Optimized */}
                    
                      {/* Background Resume - Third Layer */}
                      
                        
                      

                      {/* Middle Resume - Second Layer */}
                      
                        
                      

                      {/* Front Resume - Main Layer */}
                      
                        
                      
                    
                  
                

                {/* Desktop stacked resume view */}
                
                  {/* Decorative Elements */}
                  
                  

                  {/* Stacked Resume Previews */}
                  
                    {/* Background Resume - Third Layer */}
                    
                      
                    

                    {/* Middle Resume - Second Layer */}
                    
                      
                    

                    {/* Front Resume - Main Layer */}
                    
                      
                    
                  
                
              
            
          

          
            
          

          

          
            

            

            

            
          

          {/* How It Works Section */}
          
            
          

          {/* Creator Story */}
          
            
          
        
      
      
    
  );
}
