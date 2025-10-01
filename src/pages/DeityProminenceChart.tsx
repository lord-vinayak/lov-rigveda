import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const DeityProminenceChart = () => {
  const [data, setData] = useState<any[]>([]);

const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/deity_trends`)
      .then((res) => res.data)
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
    Mitra: "#a855f7",
    Usas: "#f59e0b",
  };

  {
    /*1. Indra: 289 mentions
2. Agni: 197 mentions
3. Soma: 126 mentions
4. Asvins: 55 mentions
5. Varuna: 45 mentions
6. Mitra: 27 mentions
7. Usas: 21 mentions*/
  }

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
          transition={{ duration: 0.5 }}>
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="mandala"
                    stroke="hsl(var(--muted-foreground))"
                    label={{
                      value: "Mandala",
                      position: "insideBottom",
                      offset: -2,
                    }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    label={{
                      value: "Frequency",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend wrapperStyle={{ bottom: -5 }} />
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

              {/* <div className="mt-3 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 text-foreground">
                  Key Observations:
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • Indra and Agni maintain dominant positions throughout most
                    Mandalas
                  </li>
                  <li>
                    • Soma shows exceptional prominence in Mandala 9 (entirely
                    dedicated to Soma)
                  </li>
                  <li>
                    • Prajapati emerges significantly only in the later Mandalas
                    (8-10)
                  </li>
                  <li>
                    • Mandala 9 is notably specialized with minimal diversity
                  </li>
                </ul>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DeityProminenceChart;
