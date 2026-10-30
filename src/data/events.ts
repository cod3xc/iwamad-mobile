export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'Halyk OIY Tech',
    date: '2026-10-29',
    place: 'Independence Hall',
    seats: 50,
  },
  {
    id: 2,
    title: 'BCL Halloween Party',
    date: '2026-11-07',
    place: 'Atrium Hall',
    seats: 40,
  },
  {
    id: 3,
    title: 'KBTU Chess Evening',
    date: '2026-11-12',
    place: 'Coworking 2F',
    seats: 16,
  },
  {
    id: 4,
    title: 'ACM ICPC Mock Contest',
    date: '2026-11-18',
    place: 'Room 214',
    seats: 3,
  },
];
