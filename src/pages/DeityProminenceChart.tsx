import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DeityProminenceChart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/deity_trends.json")
      .then((res) => res.json())
      .then((trends) => {
        // Transform data for Recharts
        const transformed = Array.from({ length: 10 }, (_, i) => {
          const mandala: any = { mandala: i + 1 };
          Object.keys(trends).forEach((deity) => {
            mandala[deity] = trends[deity][i];
          });
          return mandala;
        });
        setData(transformed);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const deityColors = {
    Indra: "hsl(var(--primary))",
    Agni: "hsl(var(--secondary))",
    Soma: "hsl(var(--accent))",
    Asvins: "#22c55e",
    Varuna: "#3b82f6",
    Prajapati: "#a855f7",
    Visvedevas: "#f59e0b",
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Deity Prominence Over Time"
          subtitle="Trace the rise and fall of major Vedic deities across the Mandalas"
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
                Deity Mentions Per Mandala
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Observe shifting religious focus and theological evolution
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="mandala"
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Mandala', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  {Object.entries(deityColors).map(([deity, color]) => (
                    <Line
                      key={deity}
                      type="monotone"
                      dataKey={deity}
                      stroke={color}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 text-foreground">Key Observations:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Indra and Agni maintain dominant positions throughout most Mandalas</li>
                  <li>• Soma shows exceptional prominence in Mandala 9 (entirely dedicated to Soma)</li>
                  <li>• Prajapati emerges significantly only in the later Mandalas (8-10)</li>
                  <li>• Mandala 9 is notably specialized with minimal diversity</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DeityProminenceChart;
