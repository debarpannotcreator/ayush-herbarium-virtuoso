import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plant } from "./PlantCard";
import { MapPin, Leaf, Heart, BookOpen, Share2, Download, Box } from "lucide-react";

interface PlantDetailModalProps {
  plant: Plant;
  isOpen: boolean;
  onClose: () => void;
}

export const PlantDetailModal = ({ plant, isOpen, onClose }: PlantDetailModalProps) => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {plant.name}
            </DialogTitle>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
              <Box className="w-4 h-4 mr-2" />
              View 3D
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gradient-card">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Botanical Name:</span> 
                  <em className="ml-2">{plant.botanicalName}</em>
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">System:</span>
                  <Badge className={getSystemColor(plant.system)}>
                    {plant.system}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="font-medium text-foreground">Region:</span>
                  <span className="ml-2">{plant.region}</span>
                </p>
              </div>
            </div>

            {/* Medicinal Uses */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Medicinal Uses</h3>
              <div className="flex flex-wrap gap-2">
                {plant.uses.map((use, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-primary/30 text-primary"
                  >
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {plant.description}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="bg-gradient-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-primary" />
                Traditional Knowledge
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {plant.description} This plant has been used in traditional {plant.system} 
                medicine for centuries, with documented uses in ancient texts and modern 
                clinical applications.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="cultivation" className="mt-6 space-y-4">
            <div className="bg-gradient-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3">Cultivation Methods</h4>
              <p className="text-muted-foreground leading-relaxed">
                {plant.cultivationMethod}
              </p>
              <div className="mt-4 space-y-2">
                <h5 className="font-medium text-foreground">Growing Tips:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Optimal growing conditions for maximum potency</li>
                  <li>Harvesting times for different plant parts</li>
                  <li>Sustainable cultivation practices</li>
                  <li>Pest management using natural methods</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="mt-6 space-y-4">
            <div className="bg-gradient-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3">Traditional Preparations</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-foreground">Common Preparations:</h5>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>Decoctions and teas</li>
                    <li>Powdered extracts</li>
                    <li>Topical applications</li>
                    <li>Essential oils</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Safety Note:</strong> Always consult with qualified practitioners 
                    before using medicinal plants. Individual reactions may vary.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="research" className="mt-6 space-y-4">
            <div className="bg-gradient-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Scientific Research
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Modern research continues to validate traditional uses of {plant.name}, 
                with studies focusing on its bioactive compounds and therapeutic mechanisms.
              </p>
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Research Areas:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Pharmacological studies and bioactive compounds</li>
                  <li>Clinical trials and efficacy studies</li>
                  <li>Safety profiles and contraindications</li>
                  <li>Modern applications and drug development</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};