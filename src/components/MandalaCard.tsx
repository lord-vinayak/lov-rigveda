import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Users } from "lucide-react";

interface MandalaCardProps {
  mandala: {
    id: number;
    title: string;
    verse_count: number;
    hymn_count: number;
    vocab_size: number;
    dominant_deities: string[];
  };
  onClick: () => void;
}

export const MandalaCard = ({ mandala, onClick }: MandalaCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-xl transition-shadow border-2 border-border bg-card h-full"
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {mandala.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">{mandala.verse_count} verses</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{mandala.hymn_count} hymns</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{mandala.vocab_size} unique words</span>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Dominant Deities:</p>
            <div className="flex flex-wrap gap-1">
              {mandala.dominant_deities.map((deity) => (
                <span
                  key={deity}
                  className="px-2 py-1 text-xs bg-accent/20 text-accent-foreground rounded-full font-medium"
                >
                  {deity}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
