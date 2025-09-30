import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface Mandala {
  id: number;
  title: string;
  vocab_size: number;
}

const VocabularyChart = () => {
  const [data, setData] = useState<Mandala[]>([]);

  useEffect(() => {
    fetch("/data/mandala_summary.json")
      .then((res) => res.json())
      .then((mandalas) => setData(mandalas))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Vocabulary Growth Over Time"
          subtitle="Track the evolution of unique vocabulary across the 10 Mandalas"
          showBack
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                Unique Words Per Mandala
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Observe how vocabulary richness changes across the Rig Veda's composition
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="vocabGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="id"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Mandala', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Unique Words', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    labelFormatter={(label) => `Mandala ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="vocab_size"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#vocabGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                {data.map((mandala) => (
                  <div
                    key={mandala.id}
                    className="p-4 bg-muted rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{mandala.vocab_size}</div>
                    <div className="text-xs text-muted-foreground">Mandala {mandala.id}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VocabularyChart;
