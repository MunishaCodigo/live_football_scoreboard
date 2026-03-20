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

  public updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
  ): void {
    const match = this.matches.find(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (!match) {
      throw new Error("Match not found");
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  public finishMatch(homeTeam: string, awayTeam: string): void {
    const matchIndex = this.matches.findIndex(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (matchIndex === -1) {
      throw new Error("Match not found");
    }

    this.matches.splice(matchIndex, 1);
  }

  public getSummary(): Match[] {
    return [...this.matches];
  }
}
