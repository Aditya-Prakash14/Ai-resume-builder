import { Brain, Cpu, Sparkles, Zap } from "lucide-react";

export function ModelShowcase() {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading with animated gradient text */}
        <h2 className="text-center text-3xl font-semibold mb-12 text-gradient-animated">
          Use Your Favorite AI Models
        </h2>

        {/* Advanced Container with Glass Effect */}
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 via-blue-100/50 to-violet-100/50 rounded-2xl blur-xl animate-pulse-glow" />

          {/* Glass container */}
          <div className="relative glass-card p-8 rounded-2xl">
            {/* Model cards with advanced styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {/* GPT Card */}
              <div className="border-gradient p-6 flex flex-col items-center text-center hover-card h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">GPT-4</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-3"></div>
                <p className="text-sm text-muted-foreground mb-4">Advanced language model with exceptional reasoning capabilities</p>
                <div className="mt-auto flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs text-emerald-600 font-medium">Integrated</span>
                </div>
              </div>

              {/* Claude Card */}
              <div className="border-gradient p-6 flex flex-col items-center text-center hover-card h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Claude</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mb-3"></div>
                <p className="text-sm text-muted-foreground mb-4">Anthropic's helpful, harmless, and honest AI assistant</p>
                <div className="mt-auto flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                  <span className="text-xs text-violet-600 font-medium">Integrated</span>
                </div>
              </div>

              {/* Deepseek Card */}
              <div className="border-gradient p-6 flex flex-col items-center text-center hover-card h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Deepseek</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-3"></div>
                <p className="text-sm text-muted-foreground mb-4">Powerful model with strong coding and reasoning abilities</p>
                <div className="mt-auto flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs text-blue-600 font-medium">Integrated</span>
                </div>
              </div>

              {/* Gemini Card */}
              <div className="border-gradient p-6 flex flex-col items-center text-center hover-card h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gemini</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mb-3"></div>
                <p className="text-sm text-muted-foreground mb-4">Google's most capable and versatile AI model</p>
                <div className="mt-auto flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-xs text-rose-600 font-medium">Integrated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-full blur-xl animate-float-delayed"></div>
        </div>

        {/* Additional info */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Connect with your preferred AI provider or use our managed API keys
        </p>
      </div>
    </div>
  );
}