import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Users, Waves, MapPin } from "lucide-react";

interface CulturalReference {
  name: string;
  mandalas: number[];
}

interface CulturalData {
  tribes: CulturalReference[];
  rivers: CulturalReference[];
  places: CulturalReference[];
}

const CulturalMap = () => {
  const [data, setData] = useState<CulturalData>({ tribes: [], rivers: [], places: [] });
  const [selected, setSelected] = useState<CulturalReference | null>(null);

  useEffect(() => {
    fetch("/data/cultural_references.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const ReferenceList = ({ items, icon: Icon }: { items: CulturalReference[]; icon: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className="cursor-pointer hover:shadow-lg transition-all border-2"
            onClick={() => setSelected(item)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Mentioned in {item.mandalas.length} Mandala{item.mandalas.length > 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-1">
                {item.mandalas.map((m) => (
                  <Badge key={m} variant="secondary">
                    M{m}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Cultural Reference Explorer"
          subtitle="Discover tribes, rivers, and places mentioned throughout the Rig Veda"
          showBack
        />

        <Tabs defaultValue="tribes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tribes" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tribes
            </TabsTrigger>
            <TabsTrigger value="rivers" className="flex items-center gap-2">
              <Waves className="w-4 h-4" />
              Rivers
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Places
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tribes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReferenceList items={data.tribes} icon={Users} />
            </motion.div>
          </TabsContent>

          <TabsContent value="rivers">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReferenceList items={data.rivers} icon={Waves} />
            </motion.div>
          </TabsContent>

          <TabsContent value="places">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReferenceList items={data.places} icon={MapPin} />
            </motion.div>
          </TabsContent>
        </Tabs>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card className="border-2 bg-accent/10">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">{selected.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This reference appears across {selected.mandalas.length} Mandala
                  {selected.mandalas.length > 1 ? 's' : ''}, indicating its significance in Vedic culture.
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.mandalas.map((m) => (
                    <Badge key={m} variant="default" className="text-base px-3 py-1">
                      Mandala {m}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CulturalMap;
