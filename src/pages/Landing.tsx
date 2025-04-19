
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Search, AlertTriangle, FileText } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Hero Section */}
      <header className="relative z-10 overflow-hidden">
        <nav className="absolute top-0 w-full z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">AppClone Buster</span>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-sidebar-background">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative">
          <div className="text-center relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
              Protect Your App from Clones and Fakes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in delay-200">
              Detect, monitor, and mitigate unauthorized app clones to protect your brand integrity and user trust.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in delay-400">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/scanner">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Try Scanner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Search, 
                title: "Advanced Detection", 
                description: "Real-time scanning and monitoring of app stores to identify potential clones.",
                bgGradient: "from-blue-100 to-blue-200"
              },
              { 
                icon: AlertTriangle, 
                title: "Instant Alerts", 
                description: "Immediate notifications when suspicious clones or copycat apps are detected.",
                bgGradient: "from-purple-100 to-purple-200"
              },
              { 
                icon: FileText, 
                title: "Detailed Reports", 
                description: "Comprehensive analysis and documentation of detected threats.",
                bgGradient: "from-green-100 to-green-200"
              }
            ].map(({ icon: Icon, title, description, bgGradient }) => (
              <div 
                key={title} 
                className={`p-6 rounded-lg border bg-gradient-to-br ${bgGradient} hover:scale-105 transition-transform duration-300 shadow-lg`}
              >
                <Icon className="h-10 w-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20 px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Protect Your App?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join hundreds of app developers who trust AppClone Buster to protect their applications from unauthorized clones.
          </p>
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 transition-all duration-300"
            >
              Start Protection Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
