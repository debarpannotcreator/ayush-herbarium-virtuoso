import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  image: string;
  uses: string[];
  system: "Ayurveda" | "Yoga" | "Naturopathy" | "Unani" | "Siddha" | "Homeopathy";
  region: string;
  description: string;
  cultivationMethod: string;
}

interface PlantCardProps {
  plant: Plant;
  onView: (plant: Plant) => void;
}

export const PlantCard = ({ plant, onView }: PlantCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getSystemColor = (system: string) => {
    const colors = {
      "Ayurveda": "bg-primary text-primary-foreground",
      "Yoga": "bg-accent text-accent-foreground",
      "Naturopathy": "bg-secondary text-secondary-foreground",
      "Unani": "bg-muted text-muted-foreground",
      "Siddha": "bg-primary/80 text-primary-foreground",
      "Homeopathy": "bg-accent/80 text-accent-foreground"
    };
    return colors[system as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="group hover:shadow-botanical transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action buttons overlay */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className={`w-8 h-8 p-0 bg-background/80 backdrop-blur-sm ${isLiked ? 'text-red-500' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={`w-8 h-8 p-0 bg-background/80 backdrop-blur-sm ${isBookmarked ? 'text-accent' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {plant.name}
          </h3>
          <p className="text-sm text-muted-foreground italic">
            {plant.botanicalName}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={getSystemColor(plant.system)}>
            {plant.system}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {plant.region}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {plant.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Primary Uses:</h4>
          <div className="flex flex-wrap gap-1">
            {plant.uses.slice(0, 3).map((use, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-primary/30 text-primary"
              >
                {use}
              </Badge>
            ))}
            {plant.uses.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{plant.uses.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(plant)}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};