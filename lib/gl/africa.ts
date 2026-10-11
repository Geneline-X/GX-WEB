// Africa as scanline runs, generated from Natural Earth 1:50m (world-atlas)
// on an equirectangular grid. Each row is "start,length,start,length…";
// rows are separated by ";". 106×110 cells, ~5.7k land cells.
export const AFRICA = {
  cols: 106,
  rows: 110,
  // [west lon, north lat, east lon, south lat]
  bounds: [-18.5, 38.2, 52.5, -35.2] as const,
  runs: ";41,1;30,14;19,1,28,16;18,5,25,19;18,25;17,26;15,30;14,35,58,4;13,38,58,7;13,40,58,11,72,4;13,42,57,22;13,63,77,3;12,68;11,66,78,1;8,70;8,70;7,72;6,73;5,75;5,75;4,77;4,77;3,79;2,81;2,81;3,80;3,81;3,81;4,81;4,82;3,83;3,83;3,84;2,86;2,88;3,87;3,89;3,90;5,87,103,1;5,88,100,4;6,88,95,10;7,97;8,96;8,95;8,94;10,92;11,90;13,16,35,66;14,7,22,4,36,64;16,1,36,2,41,59;42,57;43,55;42,55;42,53;42,52;42,51;42,50;41,50;41,49;42,47;43,45;44,44;45,42;46,40;46,40;46,41;47,40;47,40;48,39;48,39;47,40;48,40;48,41;48,40;48,40,101,1;47,41,101,1;47,42,100,3;46,43,99,4;46,43,99,4;46,42,97,5;45,43,95,7;45,41,94,8;45,39,94,8;46,37,94,8;46,36,94,7;47,34,94,7;47,33,94,7;48,32,94,6;48,32,93,7;49,32,93,7;49,32,93,6;49,32,93,6;49,32,93,6;50,29,94,4;50,27,95,1;50,27;50,27;51,26;52,24;53,23;53,22;54,20;54,19;55,17;55,16;54,16;55,13;56,5;",
}

export type Hub = { id: string; name: string; lon: number; lat: number; live?: boolean }

// A handful of widely spoken languages, placed at a city where each is
// spoken. Krio is the one GenelineX serves in production today.
export const HUBS: Hub[] = [
  { id: "kri", name: "Krio", lon: -13.23, lat: 8.48, live: true },
  { id: "wol", name: "Wolof", lon: -17.2, lat: 14.69 },
  { id: "bam", name: "Bambara", lon: -8.0, lat: 12.64 },
  { id: "twi", name: "Twi", lon: -1.62, lat: 6.69 },
  { id: "yor", name: "Yorùbá", lon: 3.9, lat: 7.38 },
  { id: "hau", name: "Hausa", lon: 8.52, lat: 12.0 },
  { id: "lin", name: "Lingala", lon: 15.27, lat: -4.32 },
  { id: "amh", name: "Amharic", lon: 38.75, lat: 9.03 },
  { id: "som", name: "Somali", lon: 45.34, lat: 2.05 },
  { id: "swa", name: "Kiswahili", lon: 39.28, lat: -6.79 },
  { id: "zul", name: "isiZulu", lon: 31.02, lat: -29.86 },
  { id: "mlg", name: "Malagasy", lon: 47.52, lat: -18.88 },
]
