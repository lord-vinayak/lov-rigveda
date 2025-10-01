import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

interface Mandala {
  id: number;
  title: string;
  avg_verses_per_hymn: number;
  avg_words_per_verse: number;
}

const ComplexityView = () => {
  const [data, setData] = useState<Mandala[]>([]);

  useEffect(() => {
    axios.get("/api/all_mandalas")
      .then(res => setData(res.data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Structural Complexity Analysis"
          subtitle="Compare compositional metrics across all Mandalas"
          showBack
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                Average Verses Per Hymn
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Indicates typical hymn length and structural organization
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="mandala"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Mandala', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Avg Verses', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="avg_verses_per_hymn" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                Average Words Per Verse
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Reflects verse density and linguistic complexity
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="mandala"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Mandala', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Avg Words', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="avg_words_per_verse" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                Combined Complexity Comparison
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Side-by-side view of both structural metrics
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="mandala"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Mandala', position: 'insideBottom', offset: -2 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Average', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend wrapperStyle={{ bottom: -5 }} />
                  <Bar dataKey="avg_verses_per_hymn" fill="hsl(var(--primary))" name="Verses/Hymn" />
                  <Bar dataKey="avg_words_per_verse" fill="hsl(var(--secondary))" name="Words/Verse" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* <Card className="border-2 bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 text-foreground">Complexity Patterns:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Mandala 8 shows exceptional length with ~17 verses per hymn</li>
                <li>• Word density per verse remains relatively consistent (7.5-8.5 words)</li>
                <li>• Shorter hymns don't necessarily mean simpler content</li>
                <li>• Structural consistency suggests formalized compositional practices</li>
              </ul>
            </CardContent>
          </Card> */}
        </motion.div>
      </div>
    </div>
  );
};

export default ComplexityView;
