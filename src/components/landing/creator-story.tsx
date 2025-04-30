import { Code, Github, Linkedin, Twitter } from "lucide-react";

export function CreatorStory() {
  return (
    <div className="py-16 border-y border-white/40 bg-mesh-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[400px_1fr] gap-8 items-center">
          {/* Advanced Avatar Area */}
          <div className="relative mx-auto md:mx-0">
            {/* Decorative background elements */}
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse-glow"></div>

            {/* Neo-brutalism style avatar container */}
            <div className="relative neo-brutalism aspect-square w-64 md:w-80 rounded-2xl overflow-hidden bg-white">
              {/* Abstract avatar representation */}
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-blue-50 p-6">
                <div className="relative w-full h-full">
                  {/* Abstract geometric avatar */}
                  <div className="absolute top-[20%] left-[25%] w-[50%] h-[30%] rounded-full bg-gradient-to-br from-violet-500 to-purple-600"></div>
                  <div className="absolute top-[55%] left-[25%] w-[50%] h-[20%] rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                  {/* Decorative elements */}
                  <div className="absolute top-[15%] left-[15%] w-4 h-4 rounded-full bg-emerald-500 animate-float"></div>
                  <div className="absolute bottom-[20%] right-[20%] w-6 h-6 rounded-full bg-rose-500 animate-float-delayed"></div>
                  <div className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>

                  {/* Code symbols */}
                  <div className="absolute top-[10%] right-[10%] text-blue-600 animate-float">
                    <Code className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-[15%] left-[15%] text-purple-600 animate-float-delayed">
                    <Code className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Github className="h-5 w-5 text-gray-800" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="h-5 w-5 text-blue-500" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Linkedin className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-uxl bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Why I Built ResumeLM
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground/90 leading-relaxed">
              <p>
                Hi, I&apos;m Alex! I&apos;m a Computer Science student at the University of British Columbia in Vancouver,
                and like many students, I&apos;ve been through the challenging journey of searching for tech internships.
              </p>

              <p>
                ResumeLM is my passion project - a free, open-source resume builder designed to help students and developers
                create ATS-optimized resumes without the hefty subscription costs. Because everyone deserves access to great tools.
              </p>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://x.com/alexfromvan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-violet-600 transition-colors"
                >
                  Twitter ↗
                </a>
                <a
                  href="https://github.com/olyaiy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-violet-600 transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}