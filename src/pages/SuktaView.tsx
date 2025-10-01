import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen } from "lucide-react";
import axios from "axios";

interface Sukta {
  id: number;
  title: string;
  verse_count: number;
  main_deity: string;
  unique_words: number;
}

const SuktaView = () => {
  const { mandalaId } = useParams<{ mandalaId: string }>();
  const [suktas, setSuktas] = useState<Sukta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/mandala/" + mandalaId)
      .then(res => setSuktas(res.data))
      .catch(() => {
        // Fallback data if specific file doesn't exist
        setSuktas([
          { id: 1, title: `Hymn ${mandalaId}.1`, verse_count: 9, main_deity: "Agni", unique_words: 45 },
          { id: 2, title: `Hymn ${mandalaId}.2`, verse_count: 12, main_deity: "Indra", unique_words: 52 },
          { id: 3, title: `Hymn ${mandalaId}.3`, verse_count: 10, main_deity: "Soma", unique_words: 48 },
        ]);
      });
  }, [mandalaId]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={`Mandala ${mandalaId}`}
          subtitle={`Explore the individual hymns (Suktas) of this Mandala`}
          showBack
        />

        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="text-xl font-serif">Hymn Length Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={suktas}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="id" 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Hymn Number', position: 'insideBottom', offset: -4 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Verse Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="verse_count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suktas.map((sukta) => (
            <motion.div
              key={sukta.id}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow border-2"
                onClick={() => navigate(`/sukta/${mandalaId}/${sukta.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-serif flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    {sukta.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verses:</span>
                    <span className="font-medium">{sukta.verse_count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deity:</span>
                    <span className="font-medium text-accent">{sukta.main_deity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unique Words:</span>
                    <span className="font-medium">{sukta.unique_words}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuktaView;
