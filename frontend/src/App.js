import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  MessageCircle, 
  Award, 
  Star, 
  Clock, 
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  X
} from "lucide-react";

// Auth imports
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/Auth/AuthModal';
import UserMenu from './components/Auth/UserMenu';
import ContactForm from './components/ContactForm';
import ProfilingForm from './components/ProfilingForm';
import CookieConsent from './components/CookieConsent';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Final CTA Component
const FinalCTA = () => {
  const { user } = useAuth();

  return (
    <button 
      onClick={() => {
        document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
      }}
      className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
    >
      Start Your Journey Today
      <ArrowRight className="inline ml-2 h-5 w-5" />
    </button>
  );
};

// Case Studies CTA Component
const CaseStudiesCTA = () => {
  const { user } = useAuth();

  return (
    <button 
      onClick={() => {
        document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
      }}
      className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
    >
      Get Your Breakthrough Solution
      <ArrowRight className="inline ml-2 h-5 w-5" />
    </button>
  );
};

// Membership Tier Button Component
const TierButton = ({ tier, children }) => {
  const { user } = useAuth();

  const handleClick = () => {
    // If it's the free "Curious" tier, scroll to case studies
    if (tier.price === "Free") {
      document.getElementById('case-studies').scrollIntoView({ behavior: 'smooth' });
    } else {
      // For paid tiers, scroll to profiling form
      document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`w-full py-3 rounded-full font-semibold transition-all ${
        tier.popular
          ? 'bg-orange-500 hover:bg-orange-600 text-white'
          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
      }`}
    >
      {children}
    </button>
  );
};

// Hero CTA Component
const HeroCTA = () => {
  const { user } = useAuth();

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center"
      variants={fadeInUp}
    >
      <button 
        onClick={() => {
          document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-orange-500 hover:bg-orange-600 px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-white text-sm sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 w-full sm:w-auto max-w-xs sm:max-w-none"
      >
        {user ? 'Complete Assessment' : 'Start Your Journey'}
        <ArrowRight className="inline ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button 
        onClick={() => {
          document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
        }}
        className="border-2 border-white/20 backdrop-blur-sm px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-white text-sm sm:text-lg font-semibold hover:bg-white/10 transition-all w-full sm:w-auto max-w-xs sm:max-w-none"
      >
        Learn More
      </button>
    </motion.div>
  );
};

// Navigation Component
const Navigation = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://i.imgur.com/92sS3DS.png" 
                alt="Collective Vox - Global Peer Coaching Community" 
                className="h-10 sm:h-14 md:h-18 lg:h-24 xl:h-28 w-auto cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
            
            {/* Mobile Center Join Button */}
            <div className="md:hidden flex-1 flex justify-center">
              <button 
                onClick={() => {
                  document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-full text-white text-xs font-semibold transition-all transform hover:scale-105"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                <button 
                  onClick={() => {
                    const element = document.getElementById('case-studies');
                    const offset = 120; // Larger offset for desktop nav
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm lg:text-base"
                >
                  Case Studies
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    const offset = 120;
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm lg:text-base"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('tiers');
                    const offset = 120;
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm lg:text-base"
                >
                  Membership
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('benefits');
                    const offset = 120;
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm lg:text-base"
                >
                  Benefits
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact-form');
                    const offset = 120;
                    const elementPosition = element.offsetTop;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm lg:text-base"
                >
                  Contact
                </button>
              </div>
              
              <div className="ml-4 lg:ml-6 xl:ml-8">
                {user ? (
                  <UserMenu />
                ) : (
                  <button 
                    onClick={() => {
                      document.getElementById('profiling-form').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-orange-500 hover:bg-orange-600 px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm lg:text-base font-semibold transition-all transform hover:scale-105"
                  >
                    Join Community
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  const element = document.getElementById('case-studies');
                  const offset = 80; // Account for fixed navigation height
                  const elementPosition = element.offsetTop;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-2 text-base w-full text-left"
              >
                Case Studies
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  const offset = 80;
                  const elementPosition = element.offsetTop;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-2 text-base w-full text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('tiers');
                  const offset = 80;
                  const elementPosition = element.offsetTop;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-2 text-base w-full text-left"
              >
                Membership
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('benefits');
                  const offset = 80;
                  const elementPosition = element.offsetTop;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-2 text-base w-full text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact-form');
                  const offset = 80;
                  const elementPosition = element.offsetTop;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-gray-300 hover:text-orange-400 transition-colors py-2 text-base w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialTab="signup"
      />
    </>
  );
};

const App = () => {
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "Crisis to Solution",
      subtitle: "How Cross-Industry Wisdom Saved $2M in Supply Chain Losses",
      name: "Nina Kumar",
      initials: "NK",
      role: "Supply Chain Director, Major Retail Chain",
      challenge: "Nina faced a critical supply chain disruption when her primary overseas manufacturer suddenly shut down due to regulatory issues. With 60% of holiday inventory at risk and only 8 weeks until peak season, traditional solutions felt inadequate. Her retail industry peers offered predictable advice: find backup suppliers, negotiate expedited shipping, accept higher costs. But Nina needed breakthrough thinking.",
      peers: [
        {
          title: "Hospital Administrator (Healthcare)",
          insight: "In medical emergencies, we activate our 'surge capacity protocol' - temporarily redistributing existing resources while building new capacity. Don't just replace the supplier; redistribute your entire network's capacity first."
        },
        {
          title: "Event Planner (Entertainment)",
          insight: "When venues cancel last-minute, I never scramble for identical replacements. I redesign the experience around what's available. Can you redesign your product mix around your functional suppliers?"
        }
      ],
      breakthrough: "These insights sparked Nina's hybrid solution: instead of replacing the lost supplier, she redesigned her holiday collection around her three functioning suppliers' strengths, redistributed orders to maximize their capacity, and created a 'limited edition' narrative around the streamlined product line. The event planner's reframing helped her see constraint as opportunity.",
      impact: "$2M Saved",
      details: "Nina's approach not only avoided massive losses but actually increased profit margins by 12% through the focused product strategy. The 'limited edition' positioning drove higher demand and justified premium pricing. What started as a crisis became her most successful holiday season.",
      quote: "I would never have thought to apply hospital surge protocols to retail supply chains. That's the power of Collective Vox - perspectives you'd never access in your industry bubble."
    },
    {
      id: 2,
      title: "From Micromanager to Leader",
      subtitle: "How Strategic Delegation Transformed Team Performance",
      name: "James Thompson",
      initials: "JT",
      role: "Engineering Manager, Fintech Startup",
      challenge: "James struggled with chronic micromanagement that was crushing his team's morale and stifling innovation. Despite working 70-hour weeks, his team consistently missed deadlines and two senior developers had quit citing 'suffocating management style.' His CEO delivered an ultimatum: fix the leadership issue or step down. Traditional management books offered theory, but James needed practical strategies to break deeply ingrained habits.",
      peers: [
        {
          title: "Theater Director (Arts)",
          insight: "In theater, every actor must deliver perfectly on opening night. I learned to give creative freedom within strict parameters - clear outcomes, flexible methods. Try 'guardrails, not handcuffs' - define success metrics but let them find their path."
        },
        {
          title: "Emergency Room Physician (Healthcare)",
          insight: "In the ER, I can't micromanage life-or-death decisions. I use 'trust but verify' intervals - brief check-ins at critical decision points, not constant monitoring. Create milestone gates, not minute-by-minute oversight."
        }
      ],
      breakthrough: "These insights led James to develop his 'Milestone Gate Method' - establishing clear project outcomes and check-in points while eliminating daily status meetings. Like the theater director, he defined success parameters but gave his team creative freedom in execution. The ER physician's approach helped him identify truly critical decision points that warranted intervention versus routine progress monitoring.",
      impact: "40% Faster",
      details: "Within three months, James's team accelerated delivery by 40% while significantly improving code quality. Team satisfaction scores jumped from 2.1 to 4.3 out of 5. His direct reports began proposing innovative solutions and taking ownership of complex problems. The transformation was so dramatic that James became the company's go-to mentor for other struggling managers.",
      quote: "I never imagined that theater directing and emergency medicine could teach me about software management. The combination of creative freedom with structured checkpoints was exactly what my team needed."
    }
  ];

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentCase = caseStudies[currentCaseStudy];
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://i.imgur.com/209tnzk.jpg')`
          }}
        ></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-16 lg:py-0 mt-16 sm:mt-0"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight"
            variants={fadeInUp}
          >
            Unlock Global
            <span className="block text-orange-400 mt-1 sm:mt-2">Collective Intelligence</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-5 sm:mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed px-1 sm:px-4 lg:px-0"
            variants={fadeInUp}
          >
            Join a worldwide community of professionals sharing wisdom, experience, and insights. 
            Get actionable answers to your toughest challenges without compromising your credibility in a psychologically safe environment.
          </motion.p>
          
          <HeroCTA />
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
              Meet the <span className="text-orange-400">Founder</span>
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-1 sm:px-0">
              Building the future of collective intelligence
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 sm:p-8 md:p-12 border border-gray-800">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
                {/* Profile Image */}
                <div className="text-center md:text-left">
                  <div className="relative inline-block">
                    <img 
                      src="https://i.imgur.com/Ltoe18j.jpeg" 
                      alt="Jeremy Williams - Founder" 
                      className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl object-cover shadow-2xl border-4 border-orange-500"
                    />
                    <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-orange-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      Certified Genos Practitioner
                    </div>
                  </div>
                  
                  {/* LinkedIn Badge */}
                  <div className="mt-4 sm:mt-6 flex justify-center md:justify-start">
                    <a 
                      href="https://www.linkedin.com/in/jpw1/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg text-xs sm:text-sm"
                    >
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg sm:text-3xl font-bold text-orange-400 mb-3 sm:mb-4">Jeremy Williams</h3>
                  <p className="text-sm sm:text-xl text-white mb-4 sm:mb-6 leading-relaxed">
                    <span className="text-orange-400 font-semibold">Genos Emotional Intelligence practitioner</span> and mentor with 
                    <span className="text-orange-400 font-semibold"> 16 years</span> of experience across financial, pharmaceutical, automotive, hospitality, and tech industries.
                  </p>
                  
                  <p className="text-xs sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                    Passionate about the relationship between people and technology, I'm building a 
                    <span className="text-orange-400 font-semibold"> global community of emotionally intelligent peers</span> sharing 
                    best practices and insights - what I call <span className="text-orange-400 font-semibold">'collective intelligence'</span>.
                  </p>

                  <p className="text-xs sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    <span className="text-orange-400 font-semibold">Certified Blockchain Expert</span> with deep knowledge of AI and Web3 technology. 
                    I'm on a mission to help professionals thrive in our digital transformation.
                  </p>

                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-orange-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-semibold">
                      See you soon! 😎
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-6 sm:mt-12 grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center p-3 sm:p-6 bg-gray-800/30 rounded-xl border border-gray-700">
                  <div className="text-xl sm:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">16+</div>
                  <div className="text-white font-semibold text-xs sm:text-base">Years Experience</div>
                </div>
                <div className="text-center p-3 sm:p-6 bg-gray-800/30 rounded-xl border border-gray-700">
                  <div className="text-xl sm:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">5</div>
                  <div className="text-white font-semibold text-xs sm:text-base">Industries Served</div>
                </div>
                <div className="text-center p-3 sm:p-6 bg-gray-800/30 rounded-xl border border-gray-700">
                  <div className="text-xl sm:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">EQ+AI</div>
                  <div className="text-white font-semibold text-xs sm:text-base">Future Focus</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
              Professional Challenges <span className="text-orange-400">Solved</span>
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-1 sm:px-0">
              Break through barriers with insights from professionals across industries and roles
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {[
              {
                icon: <Target className="h-5 w-5 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Blocked on Projects?",
                description: "Get unstuck with fresh perspectives from professionals who've faced similar challenges",
                image: "https://images.unsplash.com/photo-1713947503867-3b27964f042b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBzdHJlc3N8ZW58MHx8fHwxNzUyMjQyMzg4fDA&ixlib=rb-4.1.0&q=85"
              },
              {
                icon: <Users className="h-5 w-5 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Difficult Relationships?",
                description: "Navigate tricky professional dynamics with proven strategies from experienced peers",
                image: "https://images.pexels.com/photos/7640730/pexels-photo-7640730.jpeg"
              },
              {
                icon: <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Career Transition?",
                description: "Chart your path forward with guidance from those who've successfully made the leap",
                image: "https://images.unsplash.com/photo-1620809975674-10b8ff5f8e58?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHx3b3JrcGxhY2UlMjBzdHJlc3N8ZW58MHx8fHwxNzUyMjQyMzg4fDA&ixlib=rb-4.1.0&q=85"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-2 sm:mb-4">{item.icon}</div>
                <div className="mb-2 sm:mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-24 sm:h-32 object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-3">{item.title}</h3>
                <p className="text-xs sm:text-base text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              How <span className="text-orange-400">It Works</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
              Structured facilitator-led 90-minute workshops with AI-powered matching for maximum impact
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg" 
                alt="Professional coaching session"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    step: "01",
                    title: "Selection Process",
                    description: "Complete a 2-minute profiling form and participate in a FREE 20-minute online profiling interview to ensure the best peer matches"
                  },
                  {
                    step: "02",
                    title: "AI-Powered Matching",
                    description: "Our intelligent system matches you once per month with 2 peers based on complementary roles, industries, and challenges"
                  },
                  {
                    step: "03", 
                    title: "90-Minute Workshops",
                    description: "Each participant gets 30 minutes: 15 to share their challenge, 15 to receive peer insights and wisdom, all led by an experienced facilitator"
                  },
                  {
                    step: "04",
                    title: "Actionable Takeaways",
                    description: "Leave with concrete next steps from peer insights plus AI-generated summaries for ongoing reference"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section id="tiers" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Membership <span className="text-orange-400">Tiers</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
              Choose your level of engagement and grow with our community
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Curious",
                price: "Free",
                description: "Perfect for exploring and learning",
                features: [
                  "Access to challenge repository",
                  "Anonymous case studies",
                  "Learning resources",
                  "Community insights"
                ],
                buttonText: "Get Started",
                popular: false
              },
              {
                title: "Engaged",
                price: "€49",
                period: "/month",
                description: "Active participation in workshops",
                features: [
                  "Everything in Curious",
                  "1 workshop per month",
                  "Expert coach facilitation",
                  "AI-powered matching",
                  "Peer networking"
                ],
                buttonText: "Join Now",
                popular: true
              },
              {
                title: "Mentor",
                price: "€149",
                period: "/month",
                description: "Lead and grow with premium support",
                features: [
                  "Everything in Engaged",
                  "1-on-1 coaching session",
                  "Peer Masters Lounge",
                  "Profile promotion",
                  "Badge system access"
                ],
                buttonText: "Become a Mentor",
                popular: false
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl p-4 sm:p-6 lg:p-8 ${
                  tier.popular 
                    ? 'bg-gray-700/30 backdrop-blur-sm border-2 border-gray-500' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10'
                } hover:bg-white/10 transition-all ${
                  index === 2 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{tier.title}</h3>
                  <div className="mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-orange-400">{tier.price}</span>
                    {tier.period && <span className="text-sm sm:text-base text-gray-400">{tier.period}</span>}
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">{tier.description}</p>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-300">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <TierButton tier={tier}>
                  {tier.buttonText}
                </TierButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profiling Form Section */}
      <section id="profiling-form" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Get Your <span className="text-orange-400">Free Assessment</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Complete this 2 minute profiling form and we'll contact you within 24 hours to arrange a FREE 20 minute profiling call to onboard you into our members area.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ProfilingForm />
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            id="contact-form"
            className="text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Not Ready Yet? <span className="text-orange-400">Get In Touch</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Have questions about our peer coaching community? We're here to help you understand how Collective Vox can support your professional growth.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Earn Your <span className="text-orange-400">Recognition</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Build your professional credibility through our 5-star rating system and facilitate workshops once you achieve your 'ELITE MENTOR' badge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/7468245/pexels-photo-7468245.jpeg" 
                alt="Achievement badges"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  Build your professional credibility through our 5-star rating system and facilitate workshops once you achieve your 'elite mentor' badge.
                </p>
                
                {[
                  { stars: 1, description: "Beginning your journey as a trusted peer" },
                  { stars: 2, description: "Providing valuable insights consistently" },
                  { stars: 3, description: "Recognized for exceptional peer support" },
                  { stars: 4, description: "Established as a go-to wisdom provider" },
                  { stars: 5, description: "Elite mentor with platform promotion" }
                ].map((badge, index) => (
                  <div key={index} className={`flex items-center space-x-4 rounded-xl p-4 border ${
                    badge.stars === 5 
                      ? 'bg-gray-700/30 backdrop-blur-sm border-gray-500' 
                      : 'bg-white/5 backdrop-blur-sm border-white/10'
                  }`}>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex}
                          className={`h-5 w-5 ${starIndex < badge.stars ? 'text-orange-400 fill-current' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className={`${badge.stars === 5 ? 'text-white font-bold' : 'text-gray-300'}`}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-10 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Why Choose <span className="text-orange-400">Collective Vox</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
              Unlock opportunities and accelerate your professional growth
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Global Network",
                description: "Connect with professionals across industries and continents"
              },
              {
                icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Safe Environment",
                description: "Share challenges without compromising your professional credibility"
              },
              {
                icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Actionable Insights",
                description: "AI insight and summaries with practical solutions you can implement immediately"
              },
              {
                icon: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Build Credibility",
                description: "Earn recognition and promote your services through our platform"
              },
              {
                icon: <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Expert Facilitation",
                description: "Professionally guided sessions for maximum value extraction"
              },
              {
                icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />,
                title: "Time Efficient",
                description: "Structured 90-minute sessions that respect your busy schedule"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-3 sm:mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6">
              Success <span className="text-orange-400">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-1 sm:px-0">
              Real results from cross-industry collaboration
            </p>
          </motion.div>

          {/* Case Study Container */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile for better layout */}
            <button 
              onClick={prevCaseStudy}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110 shadow-lg hidden sm:block"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            
            <button 
              onClick={nextCaseStudy}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white p-2 sm:p-3 rounded-full transition-all hover:scale-110 shadow-lg hidden sm:block"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-between sm:hidden mb-4">
              <button 
                onClick={prevCaseStudy}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition-all"
              >
                <ChevronLeft className="h-4 w-4 inline mr-1" />
                Previous
              </button>
              <button 
                onClick={nextCaseStudy}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg transition-all"
              >
                Next
                <ChevronRight className="h-4 w-4 inline ml-1" />
              </button>
            </div>

            {/* Case Study Content */}
            <motion.div 
              key={currentCaseStudy}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-3 sm:p-8 md:p-12 border border-gray-800 mx-0 sm:mx-16"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-left sm:text-center mb-6 sm:mb-12">
                <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 sm:mb-4">
                  {currentCase.title}
                </h3>
                <p className="text-sm sm:text-xl md:text-2xl text-white font-semibold">
                  {currentCase.subtitle}
                </p>
              </div>

              {/* Profile */}
              <div className="flex items-start sm:items-center sm:justify-center mb-6 sm:mb-12">
                <div className="flex items-center bg-gray-800/50 rounded-xl p-3 sm:p-6 backdrop-blur-sm w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center mr-3 sm:mr-6 flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-xl">{currentCase.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-2xl font-bold text-orange-400 truncate">{currentCase.name}</h4>
                    <p className="text-gray-300 text-xs sm:text-lg leading-tight">{currentCase.role}</p>
                  </div>
                </div>
              </div>

              {/* The Challenge */}
              <div className="mb-6 sm:mb-12">
                <h4 className="text-base sm:text-2xl font-bold text-orange-400 mb-3 sm:mb-6">The Challenge</h4>
                <div className="bg-gray-800/30 rounded-xl p-3 sm:p-6 border border-gray-700">
                  <p className="text-white leading-relaxed text-xs sm:text-lg">
                    {currentCase.challenge}
                  </p>
                </div>
              </div>

              {/* The Collective Intelligence */}
              <div className="mb-6 sm:mb-12">
                <h4 className="text-base sm:text-2xl font-bold text-orange-400 mb-3 sm:mb-6">The Collective Intelligence</h4>
                <p className="text-white text-xs sm:text-lg mb-3 sm:mb-6">
                  Collective Vox's AI matched {currentCase.name.split(' ')[0]} with two unexpected peers:
                </p>
                
                <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                  {currentCase.peers.map((peer, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-xl p-3 sm:p-6 border-l-4 border-orange-500">
                      <h5 className="text-sm sm:text-xl font-bold text-orange-400 mb-2 sm:mb-3">{peer.title}</h5>
                      <p className="text-gray-300 italic leading-relaxed text-xs sm:text-base">
                        "{peer.insight}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Breakthrough */}
              <div className="mb-6 sm:mb-12">
                <h4 className="text-base sm:text-2xl font-bold text-orange-400 mb-3 sm:mb-6">The Breakthrough</h4>
                <div className="bg-gray-800/30 rounded-xl p-3 sm:p-6 border border-gray-700">
                  <p className="text-white leading-relaxed text-xs sm:text-lg">
                    {currentCase.breakthrough}
                  </p>
                </div>
              </div>

              {/* The Impact */}
              <div className="text-left sm:text-center">
                <div className="bg-orange-500 rounded-xl p-4 sm:p-8 border-2 border-orange-400 shadow-xl">
                  <h4 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-4">{currentCase.impact}</h4>
                  <h5 className="text-base sm:text-2xl font-bold text-white mb-3 sm:mb-6">The Impact</h5>
                  <p className="text-white leading-relaxed text-xs sm:text-lg mb-3 sm:mb-6">
                    {currentCase.details}
                  </p>
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 sm:p-6 border border-gray-800">
                    <p className="text-white italic text-xs sm:text-xl">
                      "{currentCase.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCaseStudy(index)}
                className={`w-4 h-4 rounded-full transition-all ${
                  index === currentCaseStudy 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <CaseStudiesCTA />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Success <span className="text-orange-400">Stories</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              See how professionals like you have transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg",
                name: "Sarah Mitchell",
                role: "Marketing Director, Healthcare Tech",
                badge: "5-Star Mentor",
                quote: "The AI matching is genius. I was paired with a fintech CEO and a supply chain director for my leadership challenge. In 90 minutes, I got perspectives I'd never have accessed in my traditional network.",
                rating: 5
              },
              {
                image: "https://images.unsplash.com/photo-1611927263875-74b858c28218",
                name: "James Chen", 
                role: "Sustainability Consultant, Former Finance",
                badge: "Career Breakthrough",
                quote: "Six months after my workshop on career pivoting, I landed my dream role in sustainability consulting. The actionable insights from peers who'd made similar transitions were invaluable.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
                name: "Raj Patel",
                role: "Engineering Manager, Software",
                badge: "Team Leadership",
                quote: "My difficult team member situation felt impossible until I got advice from a retail manager and a nonprofit director. Their combined wisdom gave me a framework that transformed our dynamic.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg",
                name: "Maria Rodriguez",
                role: "Senior Director, Consumer Goods",
                badge: "Strategic Thinking",
                quote: "The 1-on-1 coaching with the EQ practitioner was a game-changer. Finally understood how my communication style was limiting my executive presence. Now I'm on track for VP.",
                rating: 5
              },
              {
                image: "https://images.unsplash.com/photo-1611927263875-74b858c28218",
                name: "Tom Wilson",
                role: "Operations Director, Manufacturing",
                badge: "Innovation Catalyst",
                quote: "Working with peers from completely different industries opened my mind. Applied hospitality principles to manufacturing - increased our customer satisfaction by 40%.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
                name: "Lisa Thompson",
                role: "Product Manager, SaaS",
                badge: "Problem Solver",
                quote: "Stuck on a complex product roadmap decision, I connected with a healthcare director and retail strategist. Their cross-industry insights led to a breakthrough feature that increased user retention by 35%.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg",
                name: "David Kim",
                role: "CFO, Tech Startup",
                badge: "Financial Strategy",
                quote: "The peer workshop on scaling challenges connected me with a manufacturing CEO and nonprofit executive. Their perspectives on cash flow management during growth phases were game-changing.",
                rating: 5
              },
              {
                image: "https://images.unsplash.com/photo-1611927263875-74b858c28218",
                name: "Anna Kowalski",
                role: "HR Director, Pharma",
                badge: "Culture Builder",
                quote: "Transforming company culture felt overwhelming until I learned from a hospitality manager and tech director. Their combined approaches helped us improve employee satisfaction by 50%.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
                name: "Carlos Santos",
                role: "Supply Chain Director, Retail",
                badge: "Efficiency Expert",
                quote: "The AI-powered matching connected me with a logistics expert and software architect. Their fresh perspectives on automation helped us reduce costs by 25% while improving delivery times.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg",
                name: "Rebecca Foster",
                role: "VP Marketing, EdTech",
                badge: "Growth Strategist",
                quote: "My market expansion challenge seemed impossible until I connected with a healthcare CEO and retail director. Their insights on regulatory navigation and customer acquisition were invaluable.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 text-orange-400 fill-current" />
                    ))}
                  </div>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {testimonial.badge}
                  </span>
                </div>
                
                <p className="text-gray-300 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-700/30 backdrop-blur-sm border-t border-gray-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-orange-400">Unlock</span> Your Potential?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already transforming their careers through collective intelligence.
            </p>
            <div className="flex justify-center">
              <FinalCTA />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Collective Vox</h3>
              <p className="text-gray-400">
                Building the world's most supportive professional community through collective intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('tiers').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    Membership
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    Workshops
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('case-studies').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    Success Stories
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Collective Vox Global Peer Coaching Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Cookie Consent Bar */}
      <CookieConsent />
      </div>
    </AuthProvider>
  );
};

export default App;