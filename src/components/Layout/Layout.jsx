import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import {
  LayoutRoot,
  LayoutContent,
  PageContainer,
  ContentArea,
} from "./Layout.styles";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "@/context/Notification.context";
import { useState } from "react";
import { MenuProvider } from "./Layout.context";

/**
 * ============================================
 * LAYOUT - Layout principal de la aplicación
 * ============================================
 *
 * Componente que estructura el layout principal con:
 * - Sidebar colapsable/expandible
 * - Topbar con TopbarMenu dinámico y acciones
 * - Área de contenido principal (Outlet para rutas)
 * - Providers para contextos globales (Notification, Menu)
 * 
 * Cambios vs MainLayout:
 * - Renombrado de MainLayout → Layout (más conciso)
 * - PageLayout fusionado: eliminada capa de abstracción innecesaria
 * - Estilos de PageLayout integrados en PageContainer
 */
const Layout = () => {
  const [isSidebarPinned, setIsSidebarPinned] = useState(() => {
    const pinned = localStorage.getItem("sidebarPinned");
    return pinned === "true";
  });

  return (
    <NotificationProvider>
      <MenuProvider>
        <LayoutRoot>
          <Sidebar
            isPinned={isSidebarPinned}
            setIsPinned={setIsSidebarPinned}
          />
          <LayoutContent $isPinned={isSidebarPinned}>
            <Topbar isPinned={isSidebarPinned} />
            <ContentArea>
              <PageContainer>
                <Outlet />
              </PageContainer>
            </ContentArea>
          </LayoutContent>
        </LayoutRoot>
      </MenuProvider>
    </NotificationProvider>
  );
};

export default Layout;
