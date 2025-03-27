export interface Item {
  abilities?: {
    type: string;
    title: string;
    description: string;
  }[];
  hint?: any[];
  id: number;
  img: string;
  dname: string;
  qual: string;
  cost: number;
  behavior?: string;
  dispellable?: string;
  target_team?: string;
  target_type?: string[];
  notes?: string;
  attrib?: {
    key: string;
    display?: string;
    value: string;
  }[];
  mc?: number;
  hc?: boolean;
  cd?: number;
  lore?: string;
  components?: string[];
  created?: boolean;
  charges?: boolean;
}
