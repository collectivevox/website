import React from "react";
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
  CheckCircle,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

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

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                Collective Vox
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-orange-400 transition-colors">How It Works</a>
              <a href="#tiers" className="text-gray-300 hover:text-orange-400 transition-colors">Membership</a>
              <a href="#benefits" className="text-gray-300 hover:text-orange-400 transition-colors">Benefits</a>
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full text-white font-semibold transition-all transform hover:scale-105">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzUxOTAzOTUyfDA&ixlib=rb-4.1.0&q=85')`
          }}
        ></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Unlock Global
            <span className="block text-orange-400">Collective Intelligence</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Join a worldwide community of professionals sharing wisdom, experience, and insights. 
            Get actionable answers to your toughest challenges without compromising your credibility.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
              Start Your Journey
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white/20 backdrop-blur-sm px-8 py-4 rounded-full text-white text-lg font-semibold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Challenges <span className="text-orange-400">Solved</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Break through barriers with insights from professionals across industries and roles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8 text-orange-400" />,
                title: "Blocked on Projects?",
                description: "Get unstuck with fresh perspectives from professionals who've faced similar challenges"
              },
              {
                icon: <Users className="h-8 w-8 text-orange-400" />,
                title: "Difficult Relationships?",
                description: "Navigate tricky professional dynamics with proven strategies from experienced peers"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-orange-400" />,
                title: "Career Transition?",
                description: "Chart your path forward with guidance from those who've successfully made the leap"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              How <span className="text-orange-400">It Works</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Structured 90-minute workshops with AI-powered matching for maximum impact
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
                src="https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg" 
                alt="Professional coaching session"
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
                {[
                  {
                    step: "01",
                    title: "AI-Powered Matching",
                    description: "Our intelligent system matches you with 2 peers based on complementary roles, industries, and challenges"
                  },
                  {
                    step: "02", 
                    title: "90-Minute Workshops",
                    description: "Each participant gets 30 minutes: 15 to share their challenge, 15 to receive peer insights and wisdom"
                  },
                  {
                    step: "03",
                    title: "Actionable Takeaways",
                    description: "Leave with concrete next steps from peer insights plus AI-generated summaries for ongoing reference"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section id="tiers" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Membership <span className="text-orange-400">Tiers</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your level of engagement and grow with our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                price: "$49",
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
                price: "$99",
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
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10'
                } hover:bg-white/10 transition-all`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.title}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-orange-400">{tier.price}</span>
                    {tier.period && <span className="text-gray-400">{tier.period}</span>}
                  </div>
                  <p className="text-gray-300">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                  tier.popular
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}>
                  {tier.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Earn Your <span className="text-orange-400">Recognition</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build your professional credibility through our 5-star rating system
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
                {[
                  { stars: 1, reviews: "1+", description: "Beginning your journey as a trusted peer" },
                  { stars: 2, reviews: "2+", description: "Providing valuable insights consistently" },
                  { stars: 3, reviews: "4+", description: "Recognized for exceptional peer support" },
                  { stars: 4, reviews: "8+", description: "Established as a go-to wisdom provider" },
                  { stars: 5, reviews: "16+", description: "Elite mentor with platform promotion" }
                ].map((badge, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex}
                          className={`h-5 w-5 ${starIndex < badge.stars ? 'text-orange-400 fill-current' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-semibold">{badge.reviews} peer reviews</span>
                      <p className="text-gray-300 text-sm">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-orange-400">Collective Vox</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock opportunities and accelerate your professional growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-orange-400" />,
                title: "Global Network",
                description: "Connect with professionals across industries and continents"
              },
              {
                icon: <Shield className="h-8 w-8 text-orange-400" />,
                title: "Safe Environment",
                description: "Share challenges without compromising your professional credibility"
              },
              {
                icon: <Zap className="h-8 w-8 text-orange-400" />,
                title: "Actionable Insights",
                description: "Get practical solutions you can implement immediately"
              },
              {
                icon: <Award className="h-8 w-8 text-orange-400" />,
                title: "Build Credibility",
                description: "Earn recognition and promote your services through our platform"
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-orange-400" />,
                title: "Expert Facilitation",
                description: "Professionally guided sessions for maximum value extraction"
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-400" />,
                title: "Time Efficient",
                description: "Structured 90-minute sessions that respect your busy schedule"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success <span className="text-orange-400">Stories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how professionals like you have transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/5990047/pexels-photo-5990047.jpeg",
                name: "Sarah Chen",
                role: "Marketing Director",
                quote: "The insights I gained from my peers helped me navigate a complex team restructure. The different perspectives were invaluable.",
                rating: 5
              },
              {
                image: "https://images.unsplash.com/photo-1611927263875-74b858c28218",
                name: "Michael Rodriguez", 
                role: "Software Engineer",
                quote: "I was stuck on a technical architecture decision. The workshop gave me three different approaches I hadn't considered.",
                rating: 5
              },
              {
                image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
                name: "Emily Johnson",
                role: "Operations Manager",
                quote: "The 5-star rating system motivated me to contribute more, and now I'm getting consulting opportunities through the platform.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 text-orange-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-t border-orange-500/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-orange-400">Unlock</span> Your Potential?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already transforming their careers through collective intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Start Your Journey Today
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white/20 backdrop-blur-sm px-8 py-4 rounded-full text-white text-lg font-semibold hover:bg-white/10 transition-all">
                Book a Demo
              </button>
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
                <li><a href="#" className="hover:text-orange-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Membership</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Collective Vox Global Peer Coaching Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;