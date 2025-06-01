import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Boxes, 
  ChevronRight, 
  ShoppingCart, 
  BarChart2, 
  Users, 
  Truck, 
  Bell,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Zap,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-lg text-foreground">InventSphere</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-foreground hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
              {/* Left Column - Content */}
              <div className="flex flex-col justify-center space-y-6 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-lg bg-emerald-100 dark:bg-emerald-900/20 px-3 py-1 text-sm font-medium text-emerald-900 dark:text-emerald-300">
                    <Zap className="mr-2 h-4 w-4" />
                    Next-Gen Inventory Management
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Streamline Your
                    <span className="text-emerald-600 dark:text-emerald-400"> Inventory </span>
                    Management
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl lg:mx-0">
                    InventSphere is a comprehensive inventory management system designed for businesses of all sizes. 
                    Track products, manage sales, and gain valuable insights with our intelligent platform.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-start justify-center">
                  <Link href="/signup" className="inline-flex items-center gap-2">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600">
                      Get Started Free
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right Column - Feature Cards */}
              <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="w-full max-w-lg">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-30 dark:opacity-20"></div>
                  <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                    <div className="grid gap-4">
                    {/* Feature Card 1 */}
                    <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Smart Inventory</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Track stock levels, set alerts, and automate reordering with AI-powered insights.</p>
                      </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Real-time Analytics</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get comprehensive insights into your inventory performance and trends.</p>
                      </div>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Multi-Location Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage inventory across multiple warehouses and locations seamlessly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 dark:bg-emerald-900/20 px-3 py-1 text-sm font-medium text-emerald-900 dark:text-emerald-300">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-100">
                  Designed for Efficiency
                </h2>
                <p className="max-w-[900px] mx-auto text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  InventSphere provides a comprehensive suite of tools to manage your inventory, sales, and business operations 
                  with modern technology and intuitive design.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                  <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Inventory Tracking</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Track stock levels, locations, and movements with real-time updates and automated alerts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sales Management</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Process sales, returns, and manage customer information efficiently with integrated workflows.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Advanced Analytics</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Gain valuable insights with customizable reports and interactive dashboards.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Role-Based Access</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Control access with customizable permissions and security roles for different users.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Supplier Management</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Manage suppliers, orders, and procurement processes with automated workflows.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105">
                <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <Bell className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Smart Alerts</h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Stay informed with intelligent notifications for critical inventory events and thresholds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container flex flex-col gap-6 px-4 py-10 md:px-6 md:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">InventSphere</span>
              </div>
              <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
                A professional inventory management system designed to optimize your business operations 
                with modern technology and intelligent automation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pricing</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Integrations</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Careers</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Documentation</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy</Link></li>
                  <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2025 InventSphere. All rights reserved.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}