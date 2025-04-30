import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface FooterProps {
  variant?: 'fixed' | 'static';
}

export function Footer({ variant = 'fixed' }: FooterProps) {
  return (
    <footer className={`h-auto md:h-14 w-full ultra-glass relative z-50 ${variant === 'fixed' ? 'fixed bottom-0 left-0 right-0' : 'static'}`}>
      {/* Enhanced gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"></div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-white/90 to-purple-50/90 -z-10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3e8ff30_0%,#ffffff40_50%,#f3e8ff30_100%)] pointer-events-none -z-10"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-400/10 animate-float-advanced"></div>
        <div className="absolute bottom-3/4 right-1/3 w-3 h-3 rounded-full bg-blue-400/10 animate-float-advanced" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container py-4 md:py-0 flex flex-col md:flex-row h-auto md:h-14 items-center justify-between gap-4 md:gap-0 relative">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4 group">
          <p className="text-sm text-muted-foreground text-center md:text-left transition-colors duration-300 group-hover:text-gradient">
            ResumeLM © 2025
          </p>
          <div className="h-4 w-px bg-gradient-to-b from-purple-200/30 via-purple-300/50 to-purple-200/30 hidden md:block"></div>
          <span className="text-sm text-muted-foreground text-center group-hover:text-purple-600/80 transition-colors duration-300">
            Made with <span className="animate-pulse inline-block">❤️</span> in Vancouver, BC
          </span>
        </div>

        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link
            href="mailto:resumelm@pm.me"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-purple-600 transition-all duration-300 relative group overflow-hidden px-3 py-1 rounded-full"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100/0 via-purple-100/30 to-purple-100/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative">Contact Support</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="https://x.com/alexanfromvan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-purple-600 transition-all duration-300 p-1 hover:scale-110 relative group"
            >
              <span className="absolute inset-0 bg-purple-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Twitter className="h-5 w-5 md:h-4 md:w-4 relative z-10" />
            </Link>
            <Link
              href="https://linkedin.com/in/olyaiy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-600 transition-all duration-300 p-1 hover:scale-110 relative group"
            >
              <span className="absolute inset-0 bg-blue-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Linkedin className="h-5 w-5 md:h-4 md:w-4 relative z-10" />
            </Link>
            <Link
              href="https://github.com/olyaiy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-800 transition-all duration-300 p-1 hover:scale-110 relative group"
            >
              <span className="absolute inset-0 bg-gray-100/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <Github className="h-5 w-5 md:h-4 md:w-4 relative z-10" />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}