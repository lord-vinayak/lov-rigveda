import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  BarChart3,
  GitCompare,
  Languages,
  Map,
  TrendingUp,
  Sparkles,
  Menu,
} from "lucide-react";
import MyIcon from "@/icons/book.jsx";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/vocabulary", label: "Vocabulary", icon: Languages },
  { path: "/deities", label: "Deities", icon: Sparkles },
  // { path: "/grammar", label: "Grammar", icon: BarChart3 },
  { path: "/compare", label: "Compare", icon: GitCompare },
  // { path: "/cultural", label: "Cultural", icon: Map },
  { path: "/complexity", label: "Complexity", icon: TrendingUp },
];



export const Navigation = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}>
              <MyIcon className="w-14 h-14 text-accent" />
            </motion.div>
            <span className="text-xl font-serif font-bold text-primary">
              T.R.P. - The Rig Veda Project
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} className="relative">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation (visible on screens smaller than medium) */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <div className="flex flex-col space-y-2 pt-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <SheetClose asChild key={item.path}>
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted text-foreground"
                          )}>
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
