import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, Briefcase, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ProfilingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    industry: '',
    jobTitle: '',
    challenge1: '',
    challenge2: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [connectionTest, setConnectionTest] = useState('');

  // Test connection function
  const testConnection = async () => {
    try {
      console.log('Environment variables check:');
      console.log('SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
      console.log('SUPABASE_KEY exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
      console.log('Supabase client exists:', !!supabase);
      
      setConnectionTest('Testing connection...');
      
      const { data, error, count } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        setConnectionTest(`❌ Error: ${error.message} (Code: ${error.code})`);
        console.error('Connection test failed:', error);
      } else {
        setConnectionTest(`✅ Connected! Table has ${count || 0} records`);
        console.log('Connection test passed. Record count:', count);
      }
    } catch (err) {
      setConnectionTest(`❌ Network Error: ${err.message}`);
      console.error('Network error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.challenge1.trim()) newErrors.challenge1 = 'First challenge is required';
    if (!formData.challenge2.trim()) newErrors.challenge2 = 'Second challenge is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Try a more direct approach with upsert
      const { data, error } = await supabase
        .from('assessments')
        .upsert({
          full_name: formData.fullName,
          email: formData.email,
          industry: formData.industry,
          job_title: formData.jobTitle,
          challenge_1: formData.challenge1,
          challenge_2: formData.challenge2,
          status: 'new',
          created_at: new Date().toISOString()
        }, {
          onConflict: 'email'
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Try the simple approach if upsert fails
        if (error.message.includes('policy')) {
          const { data: insertData, error: insertError } = await supabase
            .from('assessments')
            .insert({
              full_name: formData.fullName,
              email: formData.email,
              industry: formData.industry,
              job_title: formData.jobTitle,
              challenge_1: formData.challenge1,
              challenge_2: formData.challenge2,
              status: 'new'
            });
            
          if (insertError) {
            setErrors({ submit: `Database error: ${insertError.message}` });
          } else {
            setIsSubmitted(true);
          }
        } else {
          setErrors({ submit: `Error: ${error.message}` });
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ submit: `Network error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Connection Test (temporary) */}
      <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Database Connection Test:</span>
          <button
            type="button"
            onClick={testConnection}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white text-xs"
          >
            Test Connection
          </button>
        </div>
        {connectionTest && (
          <p className={`mt-2 text-xs ${connectionTest.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {connectionTest}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <User className="h-5 w-5 text-orange-400 mr-2" />
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
            errors.fullName ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <Mail className="h-5 w-5 text-orange-400 mr-2" />
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
            errors.email ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
          placeholder="your.email@company.com"
        />
        {errors.email && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Industry */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <Building className="h-5 w-5 text-orange-400 mr-2" />
          Industry You Work In *
        </label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
            errors.industry ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
        >
          <option value="">Select your industry</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Pharmaceutical">Pharmaceutical</option>
          <option value="Automotive">Automotive</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Education">Education</option>
          <option value="Consulting">Consulting</option>
          <option value="Marketing">Marketing</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Other">Other</option>
        </select>
        {errors.industry && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.industry}
          </p>
        )}
      </div>

      {/* Job Title */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <Briefcase className="h-5 w-5 text-orange-400 mr-2" />
          Your Job Title *
        </label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
            errors.jobTitle ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
          placeholder="e.g., Marketing Director, Software Engineer, Project Manager"
        />
        {errors.jobTitle && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.jobTitle}
          </p>
        )}
      </div>

      {/* Challenge 1 */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <AlertCircle className="h-5 w-5 text-orange-400 mr-2" />
          First Key Challenge You Face *
        </label>
        <textarea
          name="challenge1"
          value={formData.challenge1}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none ${
            errors.challenge1 ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
          placeholder="Describe the first major challenge you typically face in your role..."
        />
        {errors.challenge1 && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.challenge1}
          </p>
        )}
      </div>

      {/* Challenge 2 */}
      <div>
        <label className="flex items-center text-white font-semibold mb-3">
          <AlertCircle className="h-5 w-5 text-orange-400 mr-2" />
          Second Key Challenge You Face *
        </label>
        <textarea
          name="challenge2"
          value={formData.challenge2}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none ${
            errors.challenge2 ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
          }`}
          placeholder="Describe the second major challenge you typically face in your role..."
        />
        {errors.challenge2 && (
          <p className="mt-2 text-red-400 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.challenge2}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center">
              Submit Profiling Form
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfilingForm;