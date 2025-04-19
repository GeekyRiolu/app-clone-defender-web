
import React from 'react';
import { Shield, Lock, Bug } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center">
      {/* Loading Animation */}
      <div className="relative animate-pulse">
        <Shield className="w-20 h-20 text-blue-400" strokeWidth={1.5} />
        <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-spin" />
      </div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 animate-bounce delay-100">
        <Bug className="w-8 h-8 text-blue-400/30" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-bounce delay-300">
        <Shield className="w-6 h-6 text-purple-400/30" />
      </div>
      <div className="absolute top-2/3 right-1/3 animate-bounce delay-500">
        <Lock className="w-10 h-10 text-indigo-400/30" />
      </div>
      
      {/* Loading Text */}
      <h2 className="mt-8 text-2xl font-bold text-white animate-pulse">
        AppClone Buster
      </h2>
      <p className="mt-4 text-blue-200 animate-pulse">
        Securing your digital presence...
      </p>
    </div>
  );
};

export default LoadingScreen;
