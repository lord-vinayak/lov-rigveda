import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GrammarHeatmap = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/grammatical_trends.json")
      .then((res) => res.json())
      .then((trends) => {
        // Transform for stacked bar chart
        const transformed = Object.keys(trends).map((mandala) => ({
          mandala: `M${mandala}`,
          nominative: trends[mandala]["case:nominative"],
          accusative: trends[mandala]["case:accusative"],
          instrumental: trends[mandala]["case:instrumental"],
          present: trends[mandala]["tense:present"],
          aorist: trends[mandala]["tense:aorist"],
        }));
        setData(transformed);
      })
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Grammatical Feature Trends"
          subtitle="Analyze the distribution of grammatical cases and tenses across Mandalas"
          showBack
        />

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  Case Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Frequency of grammatical cases per Mandala
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mandala" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="nominative" stackId="a" fill="hsl(var(--primary))" />
                    <Bar dataKey="accusative" stackId="a" fill="hsl(var(--secondary))" />
                    <Bar dataKey="instrumental" stackId="a" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  Tense Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Frequency of verb tenses per Mandala
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="mandala" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="present" fill="#22c55e" />
                    <Bar dataKey="aorist" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="border-2 bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 text-foreground">Linguistic Insights:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Present tense dominates across all Mandalas, reflecting immediate ritual context</li>
                <li>• Nominative and accusative cases are most frequent, typical of subject-object structures</li>
                <li>• Later Mandalas show proportional consistency, indicating mature grammatical conventions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrammarHeatmap;
