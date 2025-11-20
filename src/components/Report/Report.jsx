import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  PublicReportContainer,
  ReportIframe,
  LoadingOverlay,
  ErrorContainer,
  ErrorAlert,
  applyPublicReportTheme,
} from "./Report.styles.js";
import Loading from "@components/common/Loading.jsx";

/**
 * ============================================
 * COMPONENTE PRINCIPAL PARA REPORTES PÚBLICOS DE POWER BI
 * ============================================
 *
 * Componente que renderiza reportes públicos de Power BI mediante iframe
 * Recibe la URL del reporte directamente desde el menú
 *
 * @param {string} reportUrl - URL pública de Power BI del reporte (requerido)
 *
 * Características:
 * - No requiere PowerBIEmbed SDK
 * - No consume tokens de embed
 * - Usa URL pública de Power BI directamente
 * - Renderizado mediante iframe nativo
 * - Soporte para temas
 * - Estados de carga y error
 */
export const PublicReport = ({ reportUrl }) => {
  const theme = useTheme();
  const iframeRef = useRef(null);

  // Estados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [embedConfig, setEmbedConfig] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Aplicar tema cuando cambia
  useEffect(() => {
    applyPublicReportTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.palette.mode]);

  // Timeout de seguridad para forzar visualización del iframe
  useEffect(() => {
    if (embedConfig && !iframeLoaded) {
      const timeout = setTimeout(() => {
        console.warn(
          "[PublicReport] Timeout: forzando visualización del iframe"
        );
        setIframeLoaded(true);
      }, 10000); // 10 segundos

      return () => clearTimeout(timeout);
    }
  }, [embedConfig, iframeLoaded]);

  // Cargar configuración del reporte público
  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError(null);
        setIframeLoaded(false);

        // La URL viene directamente del menú, no necesita ser consultada
        if (!reportUrl) {
          setError("URL del reporte no disponible");
          setLoading(false);
          return;
        }

        setEmbedConfig({
          embedUrl: reportUrl,
          reportName: "Reporte de Power BI",
        });
      } catch (err) {
        console.error("[PublicReport] Error:", err);
        setError(`Error al cargar el reporte: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (reportUrl) {
      loadReport();
    } else {
      setError("URL del reporte es requerida");
      setLoading(false);
    }
  }, [reportUrl]);

  // Manejador de carga del iframe
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // Manejador de error del iframe
  const handleIframeError = () => {
    console.error("[PublicReport] Error al cargar el iframe");
    setError("Error al cargar el reporte de Power BI");
    setIframeLoaded(true);
  };

  // Renderizado condicional
  if (loading) return <Loading text="Cargando reporte público..." />;

  if (error) {
    return (
      <ErrorContainer>
        <ErrorAlert severity="error">{error}</ErrorAlert>
      </ErrorContainer>
    );
  }

  if (embedConfig) {
    return (
      <PublicReportContainer
        className={`public-report-container ${
          iframeLoaded
            ? "public-report-iframe-loaded"
            : "public-report-iframe-loading"
        }`}
      >
        <ReportIframe
          ref={iframeRef}
          src={embedConfig.embedUrl}
          title={embedConfig.reportName || "Power BI Public Report"}
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          aria-label={`Reporte de Power BI: ${embedConfig.reportName}`}
        />

        {/* Overlay de Loading mientras el iframe se carga */}
        {!iframeLoaded && (
          <LoadingOverlay>
            <Loading text="Renderizando reporte..." />
          </LoadingOverlay>
        )}
      </PublicReportContainer>
    );
  }

  return null;
};

export default PublicReport;
