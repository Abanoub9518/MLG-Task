export interface Item {
  id: string;
  name: string;
  data: any;
  dataKey?: string[];
}

export interface AddItem {
  name: string;
  data: {
    year: number;
    price: number;
    "CPU model": string;
    "Hard disk size": string;
  };
}
