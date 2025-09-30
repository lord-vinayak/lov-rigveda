import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const HymnLengthChart = () => {
  const [distributions, setDistributions] = useState<Record<string, number[]>>({});

  useEffect(() => {
    fetch("/data/hymn_length_distribution.json")
      .then((res) => res.json())
      .then((data) => setDistributions(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const createHistogram = (values: number[]) => {
    const counts: Record<number, number> = {};
    values.forEach((v) => {
      counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([length, count]) => ({ length: parseInt(length), count }))
      .sort((a, b) => a.length - b.length);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Hymn Length Distribution"
          subtitle="Analyze the verse count patterns across all Mandalas"
          showBack
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(distributions).map(([mandala, lengths]) => {
            const histogramData = createHistogram(lengths);
            const avg = (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(1);

            return (
              <motion.div
                key={mandala}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: parseInt(mandala) * 0.05 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif flex justify-between items-center">
                      <span>Mandala {mandala}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        Avg: {avg} verses
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={histogramData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="length"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          label={{ value: 'Verses', position: 'insideBottom', offset: -5, fontSize: 12 }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          label={{ value: 'Count', angle: -90, position: 'insideLeft', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          fill={`hsl(${(parseInt(mandala) * 36) % 360}, 70%, 50%)`}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="mt-8 border-2 bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 text-foreground">Distribution Insights:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Most hymns contain between 7-13 verses, showing consistent composition patterns</li>
              <li>• Mandala 8 exhibits notably longer hymns on average</li>
              <li>• Early Mandalas show slightly more variation in hymn length</li>
              <li>• The consistency suggests established poetic traditions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HymnLengthChart;
