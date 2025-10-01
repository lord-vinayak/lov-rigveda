import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface Verse {
  id: number;
  sanskrit_text: string;
  translation: string;
  meter: string;
  grammar: Array<{
    index: number;
    form: string;
    lemma: string;
    lemmaRefs: string[];
    props: {
      case?: string;
      gender?: string;
      number?: string;
      tense?: string;
      voice?: string;
      "non-finite"?: string;
      "lemma type"?: string;
      position?: string;
      person?: string;
    };
  }>;
}

const VerseView = () => {
  const { mandalaId, suktaId } = useParams<{
    mandalaId: string;
    suktaId: string;
  }>();
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    axios
      .get("/api/sukta/" + mandalaId + "/" + suktaId)
      .then((res) => setVerses(res.data))
      .catch(() => {
        // Fallback data
        setVerses([
          {
            id: 1,
            sanskrit_text: "agním īḷe puróhitaṃ yajñásya devám ṛtvíjam",
            translation:
              "I praise Agni, the household priest, the divine minister of the sacrifice",
            meter: "Gāyatrī",
            grammar: [
              {
                index: 1,
                form: "agním",
                lemma: "agni",
                lemmaRefs: ["null"],
                props: {
                  case: "accusative",
                  number: "singular",
                  gender: "masculine",
                },
              },
              {
                index: 2,
                form: "īḷe",
                lemma: "īḍ",
                lemmaRefs: ["null"],
                props: {
                  tense: "present",
                  person: "1st",
                  number: "singular",
                },
              },
            ],
          },
        ]);
      });
  }, [mandalaId, suktaId]);

  const CASE_LABELS = {
    NOM: "Nominative",
    ACC: "Accusative",
    DAT: "Dative",
    ABL: "Ablative",
    INS: "Instrumental",
    GEN: "Genitive",
    LOC: "Locative",
    VOC: "Vocative",
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader
          title={`Hymn ${mandalaId}.${suktaId}`}
          subtitle="Detailed verse-by-verse analysis"
          showBack
        />

        <div className="space-y-6">
          {verses.map((verse) => (
            <motion.div
              key={verse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: verse.id * 0.1 }}>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">
                    Verse {verse.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Meter: {verse.meter}
                  </p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sanskrit" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="sanskrit">Sanskrit</TabsTrigger>
                      <TabsTrigger value="translation">Translation</TabsTrigger>
                      <TabsTrigger value="grammar">Grammar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sanskrit" className="mt-4">
                      <div className="bg-muted p-6 rounded-lg">
                        <p className="text-lg font-serif leading-relaxed text-center">
                          {verse.sanskrit_text}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="translation" className="mt-4">
                      <div className="bg-muted p-6 rounded-lg">
                        <p className="text-base font-serif text-center leading-relaxed">
                          {verse.translation}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="grammar" className="mt-4">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Word</TableHead>
                              <TableHead>Lemma</TableHead>
                              <TableHead>Features</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {verse.grammar.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium font-serif">
                                  {item.form}
                                </TableCell>
                                <TableCell className="text-primary">
                                  {item.lemma}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {item.props.case && (
                                      <span className="px-2 py-1 text-xs bg-secondary/20 rounded">
                                        {CASE_LABELS[item.props.case] ?? "Unknown case"}
                                      </span>
                                    )}
                                    {/* {item.props.tense && (
                                      <span className="px-2 py-1 text-xs bg-accent/20 rounded">
                                        {item.props.tense}
                                      </span>
                                    )} */}
                                    {item.props.number && (
                                      <span className="px-2 py-1 text-xs bg-muted rounded">
                                        {item.props.number == "PL"
                                          ? "Plural"
                                          : "Singular"}
                                      </span>
                                    )}
                                    {item.props.gender && (
                                      <span className="px-2 py-1 text-xs bg-primary/20 rounded">
                                        {item.props.gender == "M"
                                          ? "Masculine"
                                          : "Feminine"}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerseView;
