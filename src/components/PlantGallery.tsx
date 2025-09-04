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
import aloeVeraImage from "@/assets/aloe-vera-plant.jpg";
import ashwagandhaImage from "@/assets/ashwagandha-plant.jpg";
import gingerImage from "@/assets/ginger-plant.jpg";
import peppermintImage from "@/assets/peppermint-plant.jpg";
import giloyImage from "@/assets/giloy-plant.jpg";
import amlaImage from "@/assets/amla-plant.jpg";
import sandalwoodImage from "@/assets/sandalwood-plant.jpg";

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
  {
    id: "3",
    name: "Neem",
    botanicalName: "Azadirachta indica",
    image: neemImage,
    uses: ["Skin Care", "Antibacterial", "Pest Control", "Dental Health"],
    system: "Ayurveda",
    region: "Indian Subcontinent",
    description: "Known as the 'village pharmacy', neem is highly valued for its antimicrobial properties and versatile medicinal applications. Every part of the tree has medicinal value.",
    cultivationMethod: "Drought-resistant tree that thrives in arid and semi-arid regions with minimal water requirements."
  },
  {
    id: "4",
    name: "Aloe Vera",
    botanicalName: "Aloe barbadensis",
    image: aloeVeraImage,
    uses: ["Skin Healing", "Burns Treatment", "Digestive Health", "Hair Care"],
    system: "Ayurveda",
    region: "Arabian Peninsula",
    description: "Succulent plant with thick, fleshy leaves containing a gel-like substance renowned for its healing properties. Widely used for skin conditions and internal health.",
    cultivationMethod: "Thrives in well-draining sandy soil with minimal water. Prefers bright, indirect sunlight."
  },
  {
    id: "5",
    name: "Ashwagandha",
    botanicalName: "Withania somnifera",
    image: ashwagandhaImage,
    uses: ["Stress Management", "Energy Enhancement", "Sleep Quality", "Cognitive Function"],
    system: "Ayurveda",
    region: "India & Middle East",
    description: "Powerful adaptogenic herb known as 'Indian Winter Cherry'. Helps the body manage stress and supports overall vitality. Root is primarily used for medicinal purposes.",
    cultivationMethod: "Hardy plant that grows in dry regions. Requires well-drained soil and can tolerate drought conditions."
  },
  {
    id: "6",
    name: "Ginger",
    botanicalName: "Zingiber officinale",
    image: gingerImage,
    uses: ["Digestive Aid", "Nausea Relief", "Anti-inflammatory", "Cold & Flu"],
    system: "Ayurveda",
    region: "Southeast Asia",
    description: "Aromatic rhizome with warming properties, extensively used in cooking and medicine. Contains gingerol, which provides its characteristic flavor and therapeutic benefits.",
    cultivationMethod: "Grows in warm, humid climates with rich, well-draining soil. Requires partial shade and consistent moisture."
  },
  {
    id: "7",
    name: "Peppermint",
    botanicalName: "Mentha piperita",
    image: peppermintImage,
    uses: ["Digestive Health", "Respiratory Relief", "Headache Relief", "Aromatherapy"],
    system: "Unani",
    region: "Europe & Asia",
    description: "Hybrid mint plant with cooling and soothing properties. Rich in menthol, providing refreshing and therapeutic effects for various ailments.",
    cultivationMethod: "Easy to grow in moist, well-drained soil. Prefers partial shade and spreads rapidly through runners."
  },
  {
    id: "8",
    name: "Giloy",
    botanicalName: "Tinospora cordifolia",
    image: giloyImage,
    uses: ["Immunity Booster", "Fever Reduction", "Liver Health", "Diabetes Management"],
    system: "Ayurveda",
    region: "India",
    description: "Climbing shrub known as 'Guduchi' or 'Amrita' meaning immortality. Considered one of the most important herbs in Ayurveda for boosting immunity and vitality.",
    cultivationMethod: "Hardy climbing plant that grows well in tropical regions. Can grow in various soil types with moderate watering."
  },
  {
    id: "9",
    name: "Amla",
    botanicalName: "Phyllanthus emblica",
    image: amlaImage,
    uses: ["Vitamin C Source", "Hair Health", "Eye Care", "Antioxidant"],
    system: "Ayurveda",
    region: "India",
    description: "Indian gooseberry rich in vitamin C and antioxidants. Considered a superfruit in Ayurveda, supporting overall health and longevity. All parts of the tree are medicinal.",
    cultivationMethod: "Deciduous tree that grows in tropical and subtropical regions. Tolerates various soil types and requires minimal care once established."
  },
  {
    id: "10",
    name: "Sandalwood",
    botanicalName: "Santalum album",
    image: sandalwoodImage,
    uses: ["Skin Care", "Aromatherapy", "Mental Clarity", "Spiritual Practice"],
    system: "Ayurveda",
    region: "Southern India",
    description: "Sacred tree prized for its fragrant heartwood. Used in traditional medicine, cosmetics, and spiritual practices. The oil has cooling and calming properties.",
    cultivationMethod: "Slow-growing parasitic tree that requires host plants. Grows in well-drained soil in tropical regions with high humidity."
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