import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MandalaCard } from "@/components/MandalaCard";
import { PageHeader } from "@/components/PageHeader";
import axios from "axios";

interface Mandala {
  mandala: number;
  title: string;
  total_verses: number;
  total_hymns: number;
  vocab_size: number;
  dominant_deities: string[];
}

const API_URL = import.meta.env.VITE_API_URL

const MandalaView = () => {
  const [mandalas, setMandalas] = useState<Mandala[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/all_mandalas`)
      .then(res => setMandalas(res.data))
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
            <motion.div key={mandala.mandala} variants={itemVariants}>
              <MandalaCard
                mandala={mandala}
                onClick={() => navigate(`/mandala/${mandala.mandala}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MandalaView;
