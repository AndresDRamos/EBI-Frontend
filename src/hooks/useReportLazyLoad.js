import { useRef, useState, useEffect } from "react";

/**
 * ============================================
 * useReportLazyLoad Hook
 * ============================================
 * 
 * Hook para cargar iframes de reportes de forma lazy
 * Usa IntersectionObserver para detectar cuando el reporte entra en viewport
 * 
 * @param {string} reportUrl - URL del reporte a cargar
 * @param {Object} options - Opciones adicionales
 * @param {number} options.threshold - Umbral de visibilidad (0-1, default: 0.1)
 * @param {string} options.rootMargin - Margen para trigger precoz (default: "50px")
 * @returns {Object} { containerRef, shouldLoad, isVisible, isLoading }
 * 
 * Uso en componente:
 * const { containerRef, shouldLoad } = useReportLazyLoad(reportUrl);
 * return (
 *   <div ref={containerRef}>
 *     {shouldLoad && <PublicReport reportUrl={reportUrl} />}
 *   </div>
 * );
 */
export const useReportLazyLoad = (
  reportUrl,
  options = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "50px",
  } = options;

  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Callback cuando el elemento entra/sale del viewport
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldLoad) {
          // Elemento es visible y aún no se ha cargado
          setIsVisible(true);
          setShouldLoad(true);
          setIsLoading(true);

          // Dejar de observar una vez que se cargó
          if (observerRef.current) {
            observerRef.current.unobserve(entry.target);
          }

          // Simular delay de inicio de carga
          setTimeout(() => setIsLoading(false), 100);
        } else if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      });
    };

    // Crear el IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    // Iniciar observación
    observerRef.current.observe(container);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(container);
        observerRef.current.disconnect();
      }
    };
  }, [shouldLoad, threshold, rootMargin]);

  return {
    containerRef,
    shouldLoad,
    isVisible,
    isLoading,
  };
};

export default useReportLazyLoad;
