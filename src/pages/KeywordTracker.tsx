import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const KeywordTracker = () => {
  const [keywords, setKeywords] = useState<Record<string, number[]>>({});
  const [selectedKeyword, setSelectedKeyword] = useState("áyas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/data/keyword_trends.json")
      .then((res) => res.json())
      .then((data) => setKeywords(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  const availableKeywords = Object.keys(keywords);
  const filteredKeywords = availableKeywords.filter((k) =>
    k.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = selectedKeyword && keywords[selectedKeyword]
    ? keywords[selectedKeyword].map((count, index) => ({
        mandala: index + 1,
        frequency: count,
      }))
    : [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Keyword & Concept Tracker"
          subtitle="Search for specific Sanskrit terms and track their frequency across Mandalas"
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
                <CardTitle className="text-lg font-serif">Search Keywords</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lemma..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredKeywords.map((keyword) => (
                    <Button
                      key={keyword}
                      variant={selectedKeyword === keyword ? "default" : "outline"}
                      className="w-full justify-start font-serif"
                      onClick={() => setSelectedKeyword(keyword)}
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">
                  Frequency of "{selectedKeyword}" Across Mandalas
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Observe how this term's usage evolves throughout the Rig Veda
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
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
                      labelFormatter={(label) => `Mandala ${label}`}
                    />
                    <Bar dataKey="frequency" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">About "{selectedKeyword}":</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedKeyword === "áyas" && "Metal (iron/bronze) - Shows technological advancement"}
                    {selectedKeyword === "rájan" && "King/ruler - Reflects political structure evolution"}
                    {selectedKeyword === "soma" && "Sacred ritual drink - Central to Vedic ceremonies"}
                    {selectedKeyword === "yajña" && "Sacrifice/ritual - Core concept of Vedic religion"}
                    {selectedKeyword === "deva" && "God/deity - Fundamental religious term"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default KeywordTracker;
