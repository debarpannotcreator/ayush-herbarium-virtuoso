import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Star } from "lucide-react";

interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  theme: string;
  plantCount: number;
  rating: number;
  participants: number;
}

const sampleTours: Tour[] = [
  {
    id: "1",
    title: "Immunity Boosting Herbs",
    description: "Discover powerful immune-supporting plants from Ayurvedic tradition including Ashwagandha, Tulsi, and Guduchi.",
    duration: "15 min",
    difficulty: "Beginner",
    theme: "Immunity",
    plantCount: 8,
    rating: 4.8,
    participants: 1250
  },
  {
    id: "2",
    title: "Digestive Health Garden",
    description: "Explore herbs that support digestive wellness, from gentle teas to powerful medicinal compounds.",
    duration: "20 min",
    difficulty: "Intermediate",
    theme: "Digestion",
    plantCount: 12,
    rating: 4.9,
    participants: 890
  },
  {
    id: "3",
    title: "Skin Care Botanicals",
    description: "Journey through plants traditionally used for skin health, from Neem to Aloe Vera and beyond.",
    duration: "18 min",
    difficulty: "Beginner",
    theme: "Skin Care",
    plantCount: 10,
    rating: 4.7,
    participants: 1100
  }
];

export const VirtualTours = () => {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Beginner": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      "Intermediate": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      "Advanced": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    };
    return colors[difficulty as keyof typeof colors] || colors.Beginner;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Virtual Garden Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take guided journeys through curated collections of medicinal plants, 
            organized by therapeutic themes and traditional uses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleTours.map((tour) => (
            <Card 
              key={tour.id} 
              className="group hover:shadow-botanical transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getDifficultyColor(tour.difficulty)}>
                    {tour.difficulty}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 mr-1 text-accent fill-current" />
                    {tour.rating}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tour.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tour.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.participants}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {tour.plantCount} plants
                  </Badge>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-card"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
};