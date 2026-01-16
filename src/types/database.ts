export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      blocks: {
        Row: {
          id: string;
          page_id: string;
          type: string;
          content: Json;
          settings: Json;
          position: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          type: string;
          content?: Json;
          settings?: Json;
          position?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_id?: string;
          type?: string;
          content?: Json;
          settings?: Json;
          position?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          icon: string | null;
          features: Json;
          cta_text: string | null;
          cta_link: string | null;
          is_featured: boolean;
          position: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          icon?: string | null;
          features?: Json;
          cta_text?: string | null;
          cta_link?: string | null;
          is_featured?: boolean;
          position?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          icon?: string | null;
          features?: Json;
          cta_text?: string | null;
          cta_link?: string | null;
          is_featured?: boolean;
          position?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          initials: string;
          location: string;
          rating: number;
          text: string;
          source: string;
          is_featured: boolean;
          position: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          initials: string;
          location: string;
          rating?: number;
          text: string;
          source?: string;
          is_featured?: boolean;
          position?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          initials?: string;
          location?: string;
          rating?: number;
          text?: string;
          source?: string;
          is_featured?: boolean;
          position?: number;
          is_published?: boolean;
          created_at?: string;
        };
      };
      office_locations: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          email: string | null;
          hours: Json;
          is_primary: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          city: string;
          state?: string;
          zip: string;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          email?: string | null;
          hours?: Json;
          is_primary?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          email?: string | null;
          hours?: Json;
          is_primary?: boolean;
          position?: number;
          created_at?: string;
        };
      };
      navigation_items: {
        Row: {
          id: string;
          location: string;
          label: string;
          href: string;
          parent_id: string | null;
          position: number;
          is_external: boolean;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          location: string;
          label: string;
          href: string;
          parent_id?: string | null;
          position?: number;
          is_external?: boolean;
          is_visible?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          location?: string;
          label?: string;
          href?: string;
          parent_id?: string | null;
          position?: number;
          is_external?: boolean;
          is_visible?: boolean;
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          url: string;
          alt_text: string | null;
          width: number | null;
          height: number | null;
          folder: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          url: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          folder?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          original_name?: string;
          mime_type?: string;
          size?: number;
          url?: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          folder?: string;
          created_at?: string;
        };
      };
      site_config: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
      };
      content_versions: {
        Row: {
          id: string;
          entity_type: string;
          entity_id: string;
          content: Json;
          version_number: number;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          entity_type: string;
          entity_id: string;
          content: Json;
          version_number: number;
          created_by?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          entity_type?: string;
          entity_id?: string;
          content?: Json;
          version_number?: number;
          created_by?: string;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          preferred_time: string | null;
          services: string[];
          message: string | null;
          source: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          preferred_time?: string | null;
          services?: string[];
          message?: string | null;
          source?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          preferred_time?: string | null;
          services?: string[];
          message?: string | null;
          source?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Convenience aliases
export type Page = Tables<"pages">;
export type Block = Tables<"blocks">;
export type Service = Tables<"services">;
export type Testimonial = Tables<"testimonials">;
export type OfficeLocation = Tables<"office_locations">;
export type NavigationItem = Tables<"navigation_items">;
export type Media = Tables<"media">;
export type SiteConfig = Tables<"site_config">;
export type ContentVersion = Tables<"content_versions">;
export type Lead = Tables<"leads">;
