export interface Hero {
  id: number;
  name: string;
  localizedName: string;
  winRate: number;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  legs: number;
}
