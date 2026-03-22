export interface Ranking {
  categoryName: string;
  champion: { championName: string; id: string };
  fighters: [{ id: string; name: string }];
}
