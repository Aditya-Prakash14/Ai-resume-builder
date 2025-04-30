'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Code, FileText, PlayCircle, Sparkles, Zap } from 'lucide-react';

export function HeroVideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gradient-animated">
          See ResumeLM in Action
        </h2>
        <p className="text-muted-foreground text-lg">
          Watch how our AI-powered platform transforms your resume in minutes
        </p>
      </div>

      {/* Main Video Container */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="group relative mx-auto max-w-5xl cursor-pointer">
            {/* Advanced Container with Layered Design */}
            <div className="relative rounded-2xl overflow-hidden border-gradient glass-card">
              {/* Video Thumbnail - CSS-based design instead of image */}
              <div className="relative aspect-video bg-mesh-gradient">
                {/* Animated code blocks */}
                <div className="absolute top-[15%] left-[10%] w-[30%] h-[70%] bg-black/80 rounded-lg p-4 shadow-lg border border-white/10 animate-float">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-purple-400">resume.json</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-[90%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[70%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[85%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[60%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[75%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[80%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[65%] bg-purple-500/30 rounded-full"></div>
                    <div className="h-2 w-[90%] bg-purple-500/30 rounded-full"></div>
                  </div>
                </div>

                {/* Resume preview */}
                <div className="absolute top-[10%] right-[10%] w-[35%] h-[80%] bg-white rounded-lg shadow-lg border border-gray-200 animate-float-delayed">
                  <div className="flex flex-col h-full p-3">
                    <div className="h-6 w-[80%] mx-auto bg-gray-800 rounded-sm mb-2"></div>
                    <div className="h-3 w-[60%] mx-auto bg-gray-400 rounded-sm mb-4"></div>
                    <div className="flex-1 flex flex-col gap-2 px-2">
                      <div className="h-4 w-[90%] bg-gray-200 rounded-sm"></div>
                      <div className="h-2 w-[95%] bg-gray-100 rounded-sm"></div>
                      <div className="h-2 w-[90%] bg-gray-100 rounded-sm"></div>
                      <div className="h-2 w-[85%] bg-gray-100 rounded-sm"></div>
                      <div className="h-4 w-[90%] bg-gray-200 rounded-sm mt-2"></div>
                      <div className="h-2 w-[95%] bg-gray-100 rounded-sm"></div>
                      <div className="h-2 w-[90%] bg-gray-100 rounded-sm"></div>
                      <div className="h-4 w-[90%] bg-gray-200 rounded-sm mt-2"></div>
                      <div className="h-2 w-[95%] bg-gray-100 rounded-sm"></div>
                      <div className="h-2 w-[90%] bg-gray-100 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* AI processing visualization */}
                <div className="absolute top-[40%] left-[45%] w-[10%] h-[20%] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-purple-pink flex items-center justify-center animate-pulse-glow">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-2 w-16 h-1 bg-gradient-blue-purple"></div>
                </div>

                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/20 mix-blend-overlay"></div>

                {/* Improved Play Button */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute -inset-4 rounded-full bg-white/10 backdrop-blur-sm"></div>
                    <PlayCircle className="h-16 w-16 relative text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-violet-500/5 rounded-3xl -z-10"></div>
            <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-violet-500/5 rounded-3xl -z-20"></div>
          </div>
        </DialogTrigger>

        {/* Enhanced Video Dialog */}
        <DialogContent className="max-w-6xl border-0 bg-transparent p-0">
          <DialogTitle className="sr-only">Demo Video</DialogTitle>
          <DialogDescription className="sr-only">
            Watch how ResumeLM transforms your resume with AI
          </DialogDescription>
          <div className="aspect-video rounded-2xl overflow-hidden bg-black/95 shadow-2xl border border-white/10">
            <video
              controls
              autoPlay={isOpen}
              className="h-full w-full"
              src="/ResumeLM.mp4"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-blue-purple flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">AI-Powered</h3>
          <p className="text-sm text-muted-foreground">Advanced AI models optimize your resume for ATS systems</p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-purple-pink flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Tailored Content</h3>
          <p className="text-sm text-muted-foreground">Customized for specific job descriptions to increase interview chances</p>
        </div>

        <div className="glass-card p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-blue-purple flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Professional Design</h3>
          <p className="text-sm text-muted-foreground">Clean, modern templates that highlight your skills effectively</p>
        </div>
      </div>
    </section>
  );
}