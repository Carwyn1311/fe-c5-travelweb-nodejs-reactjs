import { destinationList } from "../../Admin/Destination/listdest";

export interface Inputdata {
  name: string;
  url: string;
}

export const itemsWithUrls: Inputdata[] = destinationList.map((dest) => ({
  name: dest.name,
  url: `/destination/${dest.id}`,
}));