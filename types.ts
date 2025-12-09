import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  category: 'Audio' | 'Translation' | 'Editorial' | 'Reporting' | 'Visuals' | 'Digital' | 'HR';
  tags: string[];
  requiresVpn?: boolean;
  httpWarning?: boolean;
}

export type Category = 'All' | Tool['category'];