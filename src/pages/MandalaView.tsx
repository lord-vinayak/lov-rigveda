import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MandalaCard } from "@/components/MandalaCard";
import { PageHeader } from "@/components/PageHeader";

interface Mandala {
  id: number;
  title: string;
  verse_count: number;
  hymn_count: number;
  vocab_size: number;
  dominant_deities: string[];
}

const MandalaView = () => {
  const [mandalas, setMandalas] = useState<Mandala[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/mandala_summary.json")
      .then((res) => res.json())
      .then((data) => setMandalas(data))
      .catch((err) => console.error("Error loading mandalas:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="The Ten Mandalas"
          subtitle="Explore the structure and evolution of the Rig Veda's sacred hymns"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {mandalas.map((mandala) => (
            <motion.div key={mandala.id} variants={itemVariants}>
              <MandalaCard
                mandala={mandala}
                onClick={() => navigate(`/mandala/${mandala.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MandalaView;
