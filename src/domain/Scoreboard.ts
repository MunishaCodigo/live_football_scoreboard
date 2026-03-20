type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};

export class Scoreboard {
  private readonly matches: Match[] = [];

  public startMatch(homeTeam: string, awayTeam: string): void {
    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
    });
  }

  public getSummary(): Match[] {
    return [...this.matches];
  }
}
