import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { LazyReportItem } from "@/components/Report";
import Loading from "@/components/common/Loading";
import api from "@/services/api.service";

const Home = () => {
  const [reportUrl, setReportUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeReport = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener el reporte con ID = 1 (Home report)
        const response = await api.get("/report/1");

        if (response.data.success && response.data.data.url) {
          setReportUrl(response.data.data.url);
        } else {
          setError("No se pudo obtener la URL del reporte");
        }
      } catch (err) {
        console.error("[Home] Error fetching report:", err);
        setError("Error al cargar el reporte de inicio");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeReport();
  }, []);

  if (loading) {
    return <Loading text="Cargando reporte de inicio..." />;
  }

  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          backgroundColor: "background.default",
        }}
      >
        {reportUrl && <LazyReportItem reportUrl={reportUrl} />}
      </Box>
    </Box>
  );
};

export default Home;
