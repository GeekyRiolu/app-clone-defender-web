
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Search, AlertTriangle, FileText } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-sidebar-background">
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
        
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Protect Your App from Clones and Fakes
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Detect, monitor, and mitigate unauthorized app clones to protect your brand integrity and user trust.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-sidebar-background hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Link to="/scanner">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Try Scanner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <Search className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Detection</h3>
              <p className="text-muted-foreground">
                Real-time scanning and monitoring of app stores to identify potential clones.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <AlertTriangle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
              <p className="text-muted-foreground">
                Immediate notifications when suspicious clones or copycat apps are detected.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <FileText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis and documentation of detected threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Protect Your App?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of app developers who trust AppClone Buster to protect their applications from unauthorized clones.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-sidebar-background text-white hover:bg-sidebar-background/90">
              Start Protection Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
