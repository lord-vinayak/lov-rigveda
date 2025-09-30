import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export const PageHeader = ({ title, subtitle, showBack = false }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {showBack && (
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
};
