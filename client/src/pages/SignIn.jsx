import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, Mail, Lock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // '', 'success', 'error'
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus('');
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSubmitStatus('');
    setSubmitMessage('');
    
    // 确保至少显示1秒的加载状态
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status})`);
      }

      // 确保至少1秒的加载时间
      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
      }

      console.log('Login successful:', data);
      setSubmitStatus('success');
      setSubmitMessage('Welcome back! Login successful!');
      
      // 2秒后跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      // 确保至少1秒的加载时间
      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
      }

      console.error('Login failed:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message);
      
    } finally {
      setIsLoading(false);
    }
  };

  // 成功动画组件
  const SuccessAnimation = () => (
    <div className="flex items-center justify-center py-4">
      <div className="relative">
        {/* 背景圆圈动画 */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-ping absolute"></div>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center relative">
          <CheckCircle className="w-8 h-8 text-white animate-bounce" />
        </div>
      </div>
    </div>
  );

  // 错误动画组件
  const ErrorAnimation = () => (
    <div className="flex items-center justify-center py-2">
      <div className="flex items-center space-x-2">
        <XCircle className="w-5 h-5 text-red-500 animate-pulse" />
        <span className="text-red-600 text-sm font-medium">Login Failed</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 sm:py-8 relative">
      {/* 固定背景层 - 确保始终覆盖整个视口 */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10"></div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
      </div>

      <div className="relative flex items-center justify-center px-2 sm:px-4 z-10">
        <div className="w-full max-w-xs sm:max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-4 sm:mb-8">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-2 sm:mb-4 shadow-lg">
              <Home className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Welcome Back</h1>
            <p className="text-xs sm:text-base text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* 全局成功消息 */}
          {submitStatus === 'success' && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4">
              <SuccessAnimation />
              <p className="text-green-800 text-center text-sm font-medium">{submitMessage}</p>
              <p className="text-green-600 text-center text-xs mt-1">Redirecting you to the homepage...</p>
            </div>
          )}

          {/* 全局错误消息 */}
          {submitStatus === 'error' && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
              <ErrorAnimation />
              <div className="flex items-start space-x-2 mt-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 text-sm">{submitMessage}</p>
              </div>
              <p className="text-red-600 text-xs mt-2">Please check your credentials and try again</p>
            </div>
          )}

          {/* Sign In Form */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 lg:p-8 border border-white/20">
            <div className="space-y-3 sm:space-y-6">
              {/* Email Field */}
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <Mail className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading || submitStatus === 'success'}
                    className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading || submitStatus === 'success'}
                    className={`w-full pl-8 sm:pl-10 pr-9 sm:pr-12 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || submitStatus === 'success'}
                    className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center hover:text-blue-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || submitStatus === 'success'}
                className={`w-full py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 shadow-lg text-sm sm:text-base ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : isLoading 
                      ? 'bg-blue-400 text-white cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                }`}
              >
                {submitStatus === 'success' ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span>Login Successful!</span>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    <span className="text-sm sm:text-base">Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider - 隐藏当状态为成功时 */}
            {submitStatus !== 'success' && (
              <div className="mt-4 sm:mt-8 mb-3 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 sm:px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sign Up Link - 隐藏当状态为成功时 */}
            {submitStatus !== 'success' && (
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Don't have an account?
                  <button
                    type="button"
                    className="ml-1 sm:ml-2 text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors text-xs sm:text-sm"
                    onClick={() => {
                      // Navigate to sign up page
                      navigate('/signup');
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-4 sm:mt-8 text-xs sm:text-sm text-gray-500">
            <p>Secure login protected by encryption</p>
            <div className="mt-1 space-x-1 sm:space-x-2">
              <button
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                onClick={() => alert('function is coming')}
              >
                Forgot Password?
              </button>
              <span>•</span>
              <button
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                onClick={() => alert('function is coming')}
              >
                Need Help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}