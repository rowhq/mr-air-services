"use client";

import { useState, useMemo } from "react";
import {
  LayoutDashboardIcon,
  PaletteIcon,
  FileTextIcon,
  WrenchIcon,
  MessageSquareIcon,
  ImageIcon,
  MapPinIcon,
  LinkIcon,
  SettingsIcon,
  MailIcon,
  SearchIcon,
  ChevronDownIcon,
  HelpCircleIcon,
} from "@/components/admin/icons";

// Types
interface HelpStep {
  title: string;
  items: string[];
}

interface HelpTip {
  type: "tip" | "warning" | "info";
  text: string;
}

interface HelpSection {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  steps: HelpStep[];
  tips?: HelpTip[];
  shortcuts?: { key: string; action: string }[];
}

// Help content data
const helpSections: HelpSection[] = [
  {
    id: "quick-start",
    icon: LayoutDashboardIcon,
    title: "Inicio Rápido",
    description: "Aprende lo básico en 5 minutos",
    steps: [
      {
        title: "1. Acceso al Sistema",
        items: [
          "Navega a tudominio.com/login",
          "Ingresa tu email y contraseña",
          "Usa el icono de ojo para ver/ocultar la contraseña",
          "Haz clic en 'Sign In' para acceder",
        ],
      },
      {
        title: "2. Dashboard Principal",
        items: [
          "Ve las estadísticas de páginas, servicios y testimonios",
          "Accede rápidamente a las páginas recientes",
          "Usa las acciones rápidas para editar contenido",
        ],
      },
      {
        title: "3. Navegación del Sidebar",
        items: [
          "Principal: Dashboard y Editor Visual",
          "Contenido: Páginas, Servicios, Testimonios, Media",
          "Configuración: Ubicaciones, Navegación, Settings",
          "Leads: Formularios recibidos",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Puedes colapsar el sidebar haciendo clic en la flecha para tener más espacio." },
    ],
  },
  {
    id: "visual-editor",
    icon: PaletteIcon,
    title: "Editor Visual",
    description: "Crea y edita páginas con drag & drop",
    steps: [
      {
        title: "Interfaz del Editor",
        items: [
          "Panel izquierdo: Vista previa de la página",
          "Panel derecho: Propiedades del bloque seleccionado",
          "Barra superior: Modos de vista, deshacer/rehacer, guardar",
        ],
      },
      {
        title: "Trabajar con Bloques",
        items: [
          "Arrastra el icono ≡ para mover bloques",
          "Haz clic en el icono de ojo para ocultar/mostrar",
          "Usa el botón de duplicar para copiar bloques",
          "Elimina bloques con el icono de basura",
        ],
      },
      {
        title: "Agregar Nuevos Bloques",
        items: [
          "Pasa el mouse entre bloques para ver '+ Add Block'",
          "Haz clic y selecciona el tipo de bloque",
          "El bloque se insertará en esa posición",
        ],
      },
      {
        title: "Guardar y Publicar",
        items: [
          "Save Draft: Guarda sin publicar (solo borrador)",
          "Publish: Publica los cambios al sitio en vivo",
          "El indicador muestra si hay cambios sin guardar",
        ],
      },
    ],
    shortcuts: [
      { key: "Ctrl/Cmd + S", action: "Guardar borrador" },
      { key: "Ctrl/Cmd + Z", action: "Deshacer" },
      { key: "Ctrl/Cmd + Shift + Z", action: "Rehacer" },
      { key: "Escape", action: "Deseleccionar bloque" },
    ],
    tips: [
      { type: "warning", text: "Los cambios NO se publican automáticamente. Debes hacer clic en 'Publish' para que sean visibles." },
    ],
  },
  {
    id: "pages",
    icon: FileTextIcon,
    title: "Gestión de Páginas",
    description: "Administra las páginas del sitio",
    steps: [
      {
        title: "Tipos de Editores",
        items: [
          "Editor Visual: Para páginas como Home, Contact, About (drag & drop)",
          "Editor de Contenido: Para páginas de servicio (formularios)",
        ],
      },
      {
        title: "Editor de Contenido",
        items: [
          "Vista previa en vivo mientras editas",
          "Secciones colapsables para organizar campos",
          "Los cambios se reflejan automáticamente en la preview",
          "Indicador de campos completados (X/Y)",
        ],
      },
      {
        title: "Modos de Vista",
        items: [
          "Desktop: Vista completa",
          "Tablet: 768px de ancho",
          "Mobile: 375px de ancho",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Cada página muestra su estado: Published (publicada) o Draft (borrador)." },
    ],
  },
  {
    id: "services",
    icon: WrenchIcon,
    title: "Gestión de Servicios",
    description: "Crea y edita los servicios ofrecidos",
    steps: [
      {
        title: "Crear un Servicio",
        items: [
          "Haz clic en '+ New Service'",
          "Completa el título y slug (URL)",
          "Agrega descripción corta y completa",
          "Selecciona un icono representativo",
          "Define la posición (orden de aparición)",
          "Agrega características (una por línea)",
        ],
      },
      {
        title: "Opciones del Servicio",
        items: [
          "Destacado: Aparece en la página principal",
          "Publicado: Visible en el sitio",
          "Posición: Controla el orden de visualización",
        ],
      },
      {
        title: "Iconos Disponibles",
        items: [
          "HVAC: AC, Heating, Tune-Up",
          "Servicios: Snowflake, Termómetro, Fan, Droplets",
          "Calidad: Shield, Check, Star, Award",
          "Herramientas: Wrench, Settings, Tools",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Usa números bajos en 'Posición' para que el servicio aparezca primero." },
    ],
  },
  {
    id: "testimonials",
    icon: MessageSquareIcon,
    title: "Gestión de Testimonios",
    description: "Administra los reviews de clientes",
    steps: [
      {
        title: "Crear un Testimonio",
        items: [
          "Haz clic en '+ New Testimonial'",
          "Ingresa las iniciales del cliente (2 letras)",
          "Agrega la ubicación (ciudad)",
          "Selecciona la calificación (1-5 estrellas)",
          "Elige la fuente (Google, Yelp, Facebook, Website)",
          "Escribe el texto del testimonio",
        ],
      },
      {
        title: "Gestionar Testimonios",
        items: [
          "Haz clic en la estrella para destacar/quitar destacado",
          "Los testimonios destacados aparecen primero",
          "Puedes ocultar testimonios sin eliminarlos",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Los testimonios de Google y Yelp generan más confianza." },
    ],
  },
  {
    id: "media",
    icon: ImageIcon,
    title: "Biblioteca de Medios",
    description: "Sube y gestiona imágenes",
    steps: [
      {
        title: "Subir Imágenes",
        items: [
          "Arrastra y suelta archivos en el área de upload",
          "O haz clic en '+ Upload Images' para seleccionar",
          "Puedes subir múltiples archivos a la vez",
        ],
      },
      {
        title: "Gestionar Imágenes",
        items: [
          "Haz clic en una imagen para ver sus detalles",
          "Agrega Alt Text para SEO y accesibilidad",
          "Copia la URL para usar en otros lugares",
          "Descarga o reemplaza la imagen si es necesario",
        ],
      },
      {
        title: "Tamaños Recomendados",
        items: [
          "Hero/Banner: 1920 x 1080 px",
          "Thumbnails: 400 x 300 px",
          "Logos: 200 x 200 px (PNG transparente)",
          "OG Image (redes sociales): 1200 x 630 px",
        ],
      },
    ],
    tips: [
      { type: "warning", text: "Siempre agrega Alt Text descriptivo. Mejora el SEO y la accesibilidad." },
    ],
  },
  {
    id: "locations",
    icon: MapPinIcon,
    title: "Ubicaciones de Oficina",
    description: "Gestiona las sucursales",
    steps: [
      {
        title: "Agregar Ubicación",
        items: [
          "Haz clic en '+ New Location'",
          "Ingresa nombre, dirección, ciudad, estado y código postal",
          "Agrega teléfono y email (opcionales)",
          "Define los horarios de atención para cada día",
        ],
      },
      {
        title: "Ubicación Principal",
        items: [
          "Marca una ubicación como 'Primary' (principal)",
          "La ubicación principal se muestra destacada",
          "Solo puede haber una ubicación principal",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Los horarios por defecto son: Lun-Vie 7AM-6PM, Sáb 8AM-4PM, Dom Cerrado." },
    ],
  },
  {
    id: "navigation",
    icon: LinkIcon,
    title: "Navegación del Sitio",
    description: "Edita los menús header y footer",
    steps: [
      {
        title: "Editar Navegación",
        items: [
          "Selecciona la pestaña Header o Footer",
          "Cada link muestra: Label, URL, Tipo, Visibilidad",
          "Usa las flechas para reordenar los elementos",
        ],
      },
      {
        title: "Crear un Link",
        items: [
          "Haz clic en '+ New Link'",
          "Selecciona la ubicación (Header o Footer)",
          "Ingresa el texto (Label) y la URL",
          "Marca 'External' si abre en nueva pestaña",
          "Selecciona un padre para crear submenús",
        ],
      },
      {
        title: "Tipos de Link",
        items: [
          "Internal: Links dentro del sitio (/contact, /services)",
          "External: Links a otros sitios (https://...)",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Puedes ocultar links temporalmente sin eliminarlos usando el toggle de visibilidad." },
    ],
  },
  {
    id: "settings",
    icon: SettingsIcon,
    title: "Configuración General",
    description: "Ajustes globales del sitio",
    steps: [
      {
        title: "Información de la Empresa",
        items: [
          "Nombre de la empresa",
          "Teléfono principal",
          "Email principal",
          "Dirección física",
        ],
      },
      {
        title: "Horarios de Atención",
        items: [
          "Define horarios para cada día",
          "Incluye horario de emergencias",
          "Estos horarios se muestran en el sitio",
        ],
      },
      {
        title: "Redes Sociales",
        items: [
          "Facebook, Instagram, Twitter/X",
          "LinkedIn, YouTube, Yelp",
          "Google Business Profile",
        ],
      },
      {
        title: "SEO por Defecto",
        items: [
          "Título por defecto para páginas sin título",
          "Sufijo del título (aparece en todas las páginas)",
          "Descripción por defecto",
          "Imagen OG para compartir en redes",
        ],
      },
    ],
    tips: [
      { type: "warning", text: "Recuerda guardar los cambios con el botón 'Save Changes'." },
    ],
  },
  {
    id: "leads",
    icon: MailIcon,
    title: "Gestión de Leads",
    description: "Administra los formularios recibidos",
    steps: [
      {
        title: "Ver Leads",
        items: [
          "Las tarjetas superiores muestran conteo por estado",
          "Haz clic en una tarjeta para filtrar",
          "Selecciona un lead para ver sus detalles",
        ],
      },
      {
        title: "Estados de Leads",
        items: [
          "New (Azul): Lead recién recibido",
          "Contacted (Amarillo): Ya se contactó al cliente",
          "Converted (Verde): Se convirtió en cliente",
          "Closed (Gris): Lead cerrado",
        ],
      },
      {
        title: "Flujo de Trabajo",
        items: [
          "1. Lead llega como 'New'",
          "2. Al contactar, cambia a 'Contacted'",
          "3. Si confirma servicio, cambia a 'Converted'",
          "4. Al completar, cambia a 'Closed'",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Revisa los leads nuevos diariamente para dar respuesta rápida." },
    ],
  },
  {
    id: "shortcuts",
    icon: HelpCircleIcon,
    title: "Atajos de Teclado",
    description: "Trabaja más rápido con atajos",
    steps: [
      {
        title: "Editor Visual",
        items: [
          "Ctrl/Cmd + S: Guardar borrador",
          "Ctrl/Cmd + Z: Deshacer último cambio",
          "Ctrl/Cmd + Shift + Z: Rehacer cambio",
          "Escape: Deseleccionar bloque actual",
        ],
      },
      {
        title: "Navegación General",
        items: [
          "Ctrl/Cmd + K: Abrir búsqueda en sidebar",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Los atajos funcionan en Mac (Cmd) y Windows/Linux (Ctrl)." },
    ],
  },
];

// Quick access cards component
function QuickAccessCard({
  section,
  onClick,
  isActive,
}: {
  section: HelpSection;
  onClick: () => void;
  isActive: boolean;
}) {
  const Icon = section.icon;
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl border-2 text-left transition-all
        hover:border-secondary hover:shadow-md
        ${isActive
          ? "border-secondary bg-secondary/5 dark:bg-secondary/10"
          : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-lg
          ${isActive
            ? "bg-secondary text-white"
            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          }
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
            {section.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {section.description}
          </p>
        </div>
      </div>
    </button>
  );
}

// Accordion section component
function AccordionSection({
  section,
  isExpanded,
  onToggle,
}: {
  section: HelpSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {section.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {section.description}
            </p>
          </div>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className={`
        overflow-hidden transition-all duration-300 ease-out
        ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-700">
          {/* Steps */}
          <div className="space-y-6">
            {section.steps.map((step, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                  {step.title}
                </h4>
                <ul className="space-y-2">
                  {step.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-secondary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Shortcuts */}
          {section.shortcuts && section.shortcuts.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                Atajos de Teclado
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {section.shortcuts.map((shortcut, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs font-mono text-neutral-700 dark:text-neutral-300">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {shortcut.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {section.tips && section.tips.length > 0 && (
            <div className="mt-6 space-y-3">
              {section.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className={`
                    p-4 rounded-lg text-sm flex items-start gap-3
                    ${tip.type === "tip"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                      : tip.type === "warning"
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    }
                  `}
                >
                  <span className="font-medium">
                    {tip.type === "tip" ? "Tip:" : tip.type === "warning" ? "Importante:" : "Info:"}
                  </span>
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("quick-start");

  // Filter sections based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return helpSections;

    const query = searchQuery.toLowerCase();
    return helpSections.filter(section => {
      // Search in title and description
      if (section.title.toLowerCase().includes(query)) return true;
      if (section.description.toLowerCase().includes(query)) return true;

      // Search in steps
      for (const step of section.steps) {
        if (step.title.toLowerCase().includes(query)) return true;
        for (const item of step.items) {
          if (item.toLowerCase().includes(query)) return true;
        }
      }

      return false;
    });
  }, [searchQuery]);

  const handleQuickAccessClick = (sectionId: string) => {
    setExpandedSection(sectionId);
    // Scroll to section
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Centro de Ayuda
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Aprende a usar el CMS de Mr. Air Services
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en la ayuda..."
          className="
            w-full pl-12 pr-4 py-3
            bg-white dark:bg-neutral-800
            border border-neutral-200 dark:border-neutral-700
            rounded-xl text-neutral-900 dark:text-white
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary
            transition-all
          "
        />
      </div>

      {/* Quick Access Grid */}
      {!searchQuery && (
        <div>
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Acceso Rápido
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {helpSections.map((section) => (
              <QuickAccessCard
                key={section.id}
                section={section}
                onClick={() => handleQuickAccessClick(section.id)}
                isActive={expandedSection === section.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Accordion Sections */}
      <div>
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
          {searchQuery ? `Resultados (${filteredSections.length})` : "Guías Detalladas"}
        </h2>

        {filteredSections.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <HelpCircleIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              No se encontraron resultados para &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <div key={section.id} id={`section-${section.id}`}>
                <AccordionSection
                  section={section}
                  isExpanded={expandedSection === section.id}
                  onToggle={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          ¿Necesitas más ayuda? Contacta al administrador del sistema.
        </p>
      </div>
    </div>
  );
}
