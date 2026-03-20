type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startedOrder: number;
};

export class Scoreboard {
  private readonly matches: Match[] = [];
  private startSequence = 0;

  public startMatch(homeTeam: string, awayTeam: string): void {
    if (homeTeam === awayTeam) {
      throw new Error("Teams must be different");
    }

    const existingMatch = this.matches.find(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (existingMatch) {
      throw new Error("Match already exists");
    }

    this.startSequence += 1;

    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startedOrder: this.startSequence,
    });
  }

  public updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
  ): void {
    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Scores cannot be negative");
    }

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

  public getSummary(): Array<Omit<Match, "startedOrder">> {
    return [...this.matches]
      .sort((a, b) => {
        const scoreDiff =
          b.homeScore + b.awayScore - (a.homeScore + a.awayScore);

        if (scoreDiff !== 0) {
          return scoreDiff;
        }

        return b.startedOrder - a.startedOrder;
      })
      .map(({ startedOrder, ...rest }) => rest);
  }
}
