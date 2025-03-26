export interface Hero {
  id: number;
  name: string;
  localizedName: string;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  legs: number;
}

// {
//   "id": 23,
//   "name": "npc_dota_hero_kunkka",
//   "localized_name": "Kunkka",
//   "primary_attr": "str",
//   "attack_type": "Melee",
//   "roles": [
//       "Carry",
//       "Support",
//       "Disabler",
//       "Initiator",
//       "Durable",
//       "Nuker"
//   ],
//   "legs": 2
// },
