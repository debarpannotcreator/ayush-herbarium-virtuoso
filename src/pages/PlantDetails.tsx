import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Eye, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plant } from "@/components/PlantCard";
import { PlantModelViewer } from "@/components/PlantModelViewer";
import { useState, useEffect } from "react";

// Sample plant data (in a real app, this would come from an API)
import turmericImage from "@/assets/turmeric-plant.jpg";
import tulsiImage from "@/assets/tulsi-plant.jpg";
import neemImage from "@/assets/neem-plant.jpg";
import aloeVeraImage from "@/assets/aloe-vera-plant.jpg";
import ashwagandhaImage from "@/assets/ashwagandha-plant.jpg";
import gingerImage from "@/assets/ginger-plant.jpg";
import peppermintImage from "@/assets/peppermint-plant.jpg";
import giloyImage from "@/assets/giloy-plant.jpg";
import amlaImage from "@/assets/amla-plant.jpg";
import sandalwoodImage from "@/assets/sandalwood-plant.jpg";
import muletiImage from "@/assets/mulethi-plant.jpg";
import ginsengImage from "@/assets/ginseng-plant.jpg";

const samplePlants: Plant[] = [
  {
    id: "1",
    name: "Turmeric (Haldi)",
    botanicalName: "Curcuma longa",
    image: turmericImage,
    uses: ["Anti-inflammatory", "Digestive Health", "Wound Healing", "Immunity Booster"],
    system: "Ayurveda",
    region: "South Asia",
    description: "A flowering plant of the ginger family, widely used in Ayurvedic medicine for its powerful anti-inflammatory and healing properties. Contains curcumin, a potent compound with numerous health benefits.",
    cultivationMethod: "Grows in tropical regions with well-drained soil and partial shade. Requires 8-9 months to mature."
  },
  {
    id: "2",
    name: "Holy Basil (Tulsi)",
    botanicalName: "Ocimum sanctum",
    image: tulsiImage,
    uses: ["Stress Relief", "Respiratory Health", "Immunity", "Spiritual Practice"],
    system: "Ayurveda",
    region: "India",
    description: "Sacred plant in Hindu tradition, known for its adaptogenic properties and ability to promote mental clarity and respiratory health. Rich in antioxidants and essential oils.",
    cultivationMethod: "Easy to grow in warm climates, requires regular watering and full to partial sunlight."
  },
  // Add more plants as needed...
];

export default function PlantDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find plant by ID (in real app, fetch from API)
    const foundPlant = samplePlants.find(p => p.id === id);
    setPlant(foundPlant || null);
  }, [id]);

  if (!plant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Plant not found</h2>
          <Button onClick={() => navigate('/garden')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Garden
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/garden')}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Garden
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-foreground">{plant.name}</h1>
                <p className="text-sm text-muted-foreground italic">{plant.botanicalName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? 'text-accent' : ''}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model Viewer - Main Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-border/50 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span>3D Plant Model</span>
                  </CardTitle>
                  <Badge className={getSystemColor(plant.system)}>
                    {plant.system}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                <PlantModelViewer plant={plant} />
              </CardContent>
            </Card>
          </div>

          {/* Plant Information Panel */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{plant.name}</CardTitle>
                    <p className="text-sm text-muted-foreground italic">
                      {plant.botanicalName}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System:</span>
                  <Badge className={getSystemColor(plant.system)}>
                    {plant.system}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Region:</span>
                  <span className="text-sm text-muted-foreground">{plant.region}</span>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Primary Uses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {plant.uses.map((use, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="cultivation" className="text-xs">Cultivation</TabsTrigger>
                    <TabsTrigger value="preparation" className="text-xs">Preparation</TabsTrigger>
                    <TabsTrigger value="research" className="text-xs">Research</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {plant.description}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Traditional Uses</h4>
                      <div className="space-y-2">
                        {plant.uses.map((use, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cultivation" className="p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Growing Conditions</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {plant.cultivationMethod}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Care Instructions</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Regular monitoring for optimal growth</p>
                        <p>• Proper harvesting techniques for medicinal potency</p>
                        <p>• Seasonal care adjustments</p>
                        <p>• Sustainable cultivation practices</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preparation" className="p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Traditional Methods</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Decoction preparation</p>
                        <p>• Powder formulation</p>
                        <p>• Oil extraction methods</p>
                        <p>• Fresh juice preparation</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Dosage Guidelines</h4>
                      <p className="text-sm text-muted-foreground">
                        Consult with qualified practitioners for appropriate dosage based on individual constitution and health conditions.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="research" className="p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Modern Studies</h4>
                      <p className="text-sm text-muted-foreground">
                        Contemporary research validates many traditional uses through scientific investigation of active compounds and therapeutic mechanisms.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Active Compounds</h4>
                      <p className="text-sm text-muted-foreground">
                        Various phytochemicals contribute to the therapeutic properties, supporting traditional medicinal applications.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}