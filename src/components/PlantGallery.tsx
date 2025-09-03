import { useState, useMemo } from "react";
import { PlantCard, Plant } from "./PlantCard";
import { PlantDetailModal } from "./PlantDetailModal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List } from "lucide-react";

// Sample plant data
import turmericImage from "@/assets/turmeric-plant.jpg";
import tulsiImage from "@/assets/tulsi-plant.jpg";
import neemImage from "@/assets/neem-plant.jpg";

const samplePlants: Plant[] = [
  {
    id: "1",
    name: "Turmeric",
    botanicalName: "Curcuma longa",
    image: turmericImage,
    uses: ["Anti-inflammatory", "Digestive Health", "Wound Healing", "Immunity Booster"],
    system: "Ayurveda",
    region: "South Asia",
    description: "A flowering plant of the ginger family, widely used in Ayurvedic medicine for its powerful anti-inflammatory and healing properties.",
    cultivationMethod: "Grows in tropical regions with well-drained soil and partial shade."
  },
  {
    id: "2",
    name: "Holy Basil (Tulsi)",
    botanicalName: "Ocimum sanctum",
    image: tulsiImage,
    uses: ["Stress Relief", "Respiratory Health", "Immunity", "Spiritual Practice"],
    system: "Ayurveda",
    region: "India",
    description: "Sacred plant in Hindu tradition, known for its adaptogenic properties and ability to promote mental clarity and respiratory health.",
    cultivationMethod: "Easy to grow in warm climates, requires regular watering and full to partial sunlight."
  },
  {
    id: "3",
    name: "Neem",
    botanicalName: "Azadirachta indica",
    image: neemImage,
    uses: ["Skin Care", "Antibacterial", "Pest Control", "Dental Health"],
    system: "Ayurveda",
    region: "Indian Subcontinent",
    description: "Known as the 'village pharmacy', neem is highly valued for its antimicrobial properties and versatile medicinal applications.",
    cultivationMethod: "Drought-resistant tree that thrives in arid and semi-arid regions with minimal water requirements."
  }
];

interface PlantGalleryProps {
  searchQuery: string;
}

export const PlantGallery = ({ searchQuery }: PlantGalleryProps) => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [filterSystem, setFilterSystem] = useState<string>("all");
  const [filterUse, setFilterUse] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter plants based on search query and filters
  const filteredPlants = useMemo(() => {
    return samplePlants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSystem = filterSystem === "all" || plant.system === filterSystem;
      
      const matchesUse = filterUse === "all" || 
                        plant.uses.some(use => use.toLowerCase().includes(filterUse.toLowerCase()));
      
      return matchesSearch && matchesSystem && matchesUse;
    });
  }, [searchQuery, filterSystem, filterUse]);

  // Get unique systems and uses for filters
  const systems = Array.from(new Set(samplePlants.map(plant => plant.system)));
  const uses = Array.from(new Set(samplePlants.flatMap(plant => plant.uses)));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Medicinal Plant Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive database of traditional healing plants from the AYUSH systems
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-gradient-card border border-border rounded-xl">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <Select value={filterSystem} onValueChange={setFilterSystem}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select System" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                {systems.map(system => (
                  <SelectItem key={system} value={system}>{system}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterUse} onValueChange={setFilterUse}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Use" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Uses</SelectItem>
                {uses.map(use => (
                  <SelectItem key={use} value={use}>{use}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPlants.length} of {samplePlants.length} plants
          </p>
          
          <div className="flex items-center space-x-2">
            {searchQuery && (
              <Badge variant="outline">
                Search: "{searchQuery}"
              </Badge>
            )}
            {filterSystem !== "all" && (
              <Badge variant="outline">
                System: {filterSystem}
              </Badge>
            )}
            {filterUse !== "all" && (
              <Badge variant="outline">
                Use: {filterUse}
              </Badge>
            )}
          </div>
        </div>

        {/* Plant Grid */}
        <div className={viewMode === "grid" ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
          "space-y-6"
        }>
          {filteredPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onView={setSelectedPlant}
            />
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No plants found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterSystem("all");
                setFilterUse("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Plant Detail Modal */}
        {selectedPlant && (
          <PlantDetailModal
            plant={selectedPlant}
            isOpen={!!selectedPlant}
            onClose={() => setSelectedPlant(null)}
          />
        )}
      </div>
    </section>
  );
};