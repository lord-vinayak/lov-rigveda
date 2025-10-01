import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

interface Mandala {
  mandala: number;
  title: string;
  total_verses: number;
  total_hymns: number;
  vocab_size: number;
}

const ComparisonPage = () => {
  const [mandalas, setMandalas] = useState<Mandala[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 10]);

  useEffect(() => {
    axios.get("/api/all_mandalas")
      .then(res => setMandalas(res.data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const selectedData = mandalas.filter((m) => selectedIds.includes(m.mandala));

  const toggleSelection = (mandala: number) => {
    setSelectedIds((prev) =>
      prev.includes(mandala) ? prev.filter((i) => i !== mandala) : [...prev, mandala]
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Compare Mandalas"
          subtitle="Select and compare multiple Mandalas side-by-side"
          showBack
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="border-2 sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Select Mandalas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mandalas.map((mandala) => (
                  <div key={mandala.mandala} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mandala-${mandala.mandala}`}
                      checked={selectedIds.includes(mandala.mandala)}
                      onCheckedChange={() => toggleSelection(mandala.mandala)}
                    />
                    <label
                      htmlFor={`mandala-${mandala.mandala}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Mandala {mandala.mandala}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Verse Count Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Bar dataKey="total_verses" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Hymn Count Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Bar dataKey="total_hymns" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl font-serif">Vocabulary Size Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "2px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Bar dataKey="vocab_size" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
