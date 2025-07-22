import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Briefcase, Target, MessageCircle } from 'lucide-react';

const ProfilingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    industry: '',
    experience: '',
    challenge: '',
    goals: '',
    availability: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-500/20 border border-green-500 rounded-2xl p-8 mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
          <p className="text-gray-300 text-lg">
            Your profiling form has been submitted successfully. We'll contact you within 24 hours to arrange your free 20-minute profiling call.
          </p>
        </div>
        <p className="text-gray-400">
          Check your email for confirmation and next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            <User className="inline h-4 w-4 mr-2" />
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            <User className="inline h-4 w-4 mr-2" />
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="your.email@company.com"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            <Briefcase className="inline h-4 w-4 mr-2" />
            Company *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Current Role *
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            placeholder="e.g., Marketing Director, Software Engineer"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            Industry *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          >
            <option value="">Select your industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="education">Education</option>
            <option value="consulting">Consulting</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Years of Experience *
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          >
            <option value="">Select experience level</option>
            <option value="1-3">1-3 years</option>
            <option value="4-7">4-7 years</option>
            <option value="8-12">8-12 years</option>
            <option value="13-20">13-20 years</option>
            <option value="20+">20+ years</option>
          </select>
        </div>
      </div>

      {/* Challenge and Goals */}
      <div>
        <label className="block text-white font-semibold mb-2">
          <Target className="inline h-4 w-4 mr-2" />
          Current Challenge *
        </label>
        <textarea
          name="challenge"
          value={formData.challenge}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
          placeholder="Describe your biggest professional challenge or obstacle you're currently facing..."
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          <MessageCircle className="inline h-4 w-4 mr-2" />
          What are you hoping to achieve?
        </label>
        <textarea
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
          placeholder="What specific outcomes or breakthroughs are you looking for?"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Preferred Call Time
        </label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
        >
          <option value="">Select your preferred time</option>
          <option value="morning">Morning (9AM - 12PM)</option>
          <option value="afternoon">Afternoon (12PM - 5PM)</option>
          <option value="evening">Evening (5PM - 8PM)</option>
          <option value="flexible">I'm flexible</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 px-8 py-4 rounded-full text-white text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 disabled:transform-none disabled:shadow-none"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Get My Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </button>
        <p className="text-gray-400 text-sm mt-4">
          * Required fields. We respect your privacy and will never share your information.
        </p>
      </div>
    </form>
  );
};

export default ProfilingForm;