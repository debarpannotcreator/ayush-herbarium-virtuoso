import { useState } from "react";
import { Search, Menu, X, Leaf, BookOpen, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";
import { PDFViewerModal } from "@/components/PDFViewerModal";

interface NavigationProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navigation = ({ onSearch, searchQuery }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">AYUSH Virtual Garden</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <BookOpen className="w-4 h-4 mr-2" />
              Plants
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Users className="w-4 h-4 mr-2" />
              Virtual Tours
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setIsPDFOpen(true)}
            >
              <Info className="w-4 h-4 mr-2" />
              About AYUSH
            </Button>
          </div>

          {/* Search Bar & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search medicinal plants..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 w-64 bg-background/50"
              />
            </div>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search medicinal plants..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Plants
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Virtual Tours
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => setIsPDFOpen(true)}
                >
                  <Info className="w-4 h-4 mr-2" />
                  About AYUSH
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl="https://pub-cd74c6e7d0ba4183b0c2616e506282f2.r2.dev/doc.pdf"
      />
    </nav>
  );
};