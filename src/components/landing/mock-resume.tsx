import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Zap } from "lucide-react";

export function MockResume() {
  return (
    <Card className="w-full max-w-[6in] aspect-[8.5/11] relative neo-brutalism overflow-hidden">
      {/* Advanced background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:16px_16px] opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-tr-full"></div>

      {/* Content container */}
      <div className="relative p-6 font-sans h-full">
        {/* Modern Header with gradient */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">David Zhang</h2>
            <div className="flex items-center gap-1 px-2 py-1 bg-black text-white text-[10px] rounded-full">
              <Zap className="w-2.5 h-2.5" />
              <span>Available for hire</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            <p className="text-gray-600 text-sm">Full Stack Developer</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Mail className="w-2.5 h-2.5" />
              <span>david.zhang@gmail.com</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <MapPin className="w-2.5 h-2.5" />
              <span>Vancouver, BC</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Github className="w-2.5 h-2.5" />
              <span>github.com/davidzhang-dev</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Linkedin className="w-2.5 h-2.5" />
              <span>linkedin.com/in/davidzhang-dev</span>
            </div>
          </div>
        </div>

      {/* Technical Skills - Modern Design */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Technical Skills</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-[10px] py-0">
              TypeScript
            </Badge>
            <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors text-[10px] py-0">
              Python
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-[10px] py-0">
              React
            </Badge>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-[10px] py-0">
              Next.js
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-[10px] py-0">
              Node.js
            </Badge>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-[10px] py-0">
              Express
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-[10px] py-0">
              AWS
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-[10px] py-0">
              Vercel
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-[10px] py-0">
              TensorFlow
            </Badge>
            <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-[10px] py-0">
              LangChain
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors text-[10px] py-0">
              PostgreSQL
            </Badge>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors text-[10px] py-0">
              MongoDB
            </Badge>
          </div>
        </div>
      </div>

      {/* Experience - Modern Timeline Design */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Professional Experience</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        <div className="relative pl-4 border-l border-gray-200 space-y-4">
          {/* Timeline dots and connecting line */}
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-purple-400 via-blue-400 to-cyan-400"></div>

          {/* First experience */}
          <div className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[17px] top-0 w-3 h-3 rounded-full bg-purple-500 border-2 border-white shadow-sm"></div>

            {/* Content */}
            <div className="bg-white/50 rounded-lg p-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-[11px] font-semibold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">Full Stack Developer</h4>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <p className="text-[10px] text-gray-600">May 2021 - Present</p>
                </div>
              </div>
              <p className="text-[10px] font-medium text-gray-700 mb-1.5">Clio, Vancouver, BC</p>
              <ul className="text-[10px] text-gray-600 space-y-1">
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Developed and maintained key features for legal practice management platform using React and TypeScript</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Implemented AI-powered document analysis feature reducing manual review time by 60%</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Optimized API performance resulting in 30% faster page load times</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Second experience */}
          <div className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[17px] top-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>

            {/* Content */}
            <div className="bg-white/50 rounded-lg p-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-[11px] font-semibold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Junior Developer</h4>
                <p className="text-[10px] text-gray-600">Jun 2019 - Apr 2021</p>
              </div>
              <p className="text-[10px] font-medium text-gray-700 mb-1.5">Hootsuite, Vancouver, BC</p>
              <ul className="text-[10px] text-gray-600 space-y-1">
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Built responsive dashboard components using React and Redux</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Collaborated on social media analytics features serving 100K+ users</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>Participated in agile development process and code reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Projects - Card Design */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Projects</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* Project Card 1 */}
          <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-2 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              <h4 className="text-[11px] font-semibold text-purple-800">AI Meeting Assistant</h4>
            </div>
            <div className="flex items-center gap-1 mb-1.5">
              <Github className="w-2 h-2 text-gray-500" />
              <p className="text-[8px] text-gray-600">github.com/davidzhang-dev/meeting-ai</p>
            </div>
            <ul className="text-[9px] text-gray-600 space-y-1">
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-1"></div>
                <span>Built meeting summarization tool using OpenAI API, Next.js, and TypeScript</span>
              </li>
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-1"></div>
                <span>Implemented real-time transcription and key points extraction</span>
              </li>
            </ul>
            <div className="mt-1 flex flex-wrap gap-1">
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 text-[7px] py-0 px-1">
                Next.js
              </Badge>
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 text-[7px] py-0 px-1">
                OpenAI
              </Badge>
              <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 text-[7px] py-0 px-1">
                TypeScript
              </Badge>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-2 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <h4 className="text-[11px] font-semibold text-blue-800">Housing Market Analyzer</h4>
            </div>
            <div className="flex items-center gap-1 mb-1.5">
              <Github className="w-2 h-2 text-gray-500" />
              <p className="text-[8px] text-gray-600">github.com/davidzhang-dev/van-housing</p>
            </div>
            <ul className="text-[9px] text-gray-600 space-y-1">
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-1"></div>
                <span>Created web scraper and analysis tool for Vancouver real estate listings</span>
              </li>
              <li className="flex items-start gap-1">
                <div className="w-1 h-1 rounded-full bg-gray-400 mt-1"></div>
                <span>Built interactive dashboard using Next.js, TailwindCSS, and Chart.js</span>
              </li>
            </ul>
            <div className="mt-1 flex flex-wrap gap-1">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-[7px] py-0 px-1">
                Next.js
              </Badge>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-[7px] py-0 px-1">
                Chart.js
              </Badge>
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-[7px] py-0 px-1">
                TailwindCSS
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Education - Modern Design */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Education</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg border border-cyan-100 p-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-baseline mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
              <h4 className="text-[11px] font-semibold text-cyan-800">B.Sc. Computer Science</h4>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
              <p className="text-[9px] font-medium">2019</p>
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-700 mb-1">University of British Columbia, Vancouver, BC</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 text-[8px] py-0 px-1.5">
              Software Engineering
            </Badge>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 text-[8px] py-0 px-1.5">
              Machine Learning
            </Badge>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 text-[8px] py-0 px-1.5">
              Data Structures
            </Badge>
            <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 text-[8px] py-0 px-1.5">
              Algorithms
            </Badge>
          </div>
        </div>
      </div>

      {/* Decorative footer element */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-glow"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
      </div>
      </div>
    </Card>
  );
}