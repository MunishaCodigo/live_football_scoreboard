import { Match } from "./Match";
import { DomainError } from "../errors/DomainError";
import { MatchSummary } from "./MatchSummary";

export class Scoreboard {
  private readonly matches: Match[] = [];
  private startSequence = 0;

  public startMatch(homeTeam: string, awayTeam: string): void {
    const existingMatch = this.matches.find(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (existingMatch) {
      throw new DomainError("Match already exists");
    }

    this.startSequence += 1;
    this.matches.push(new Match(homeTeam, awayTeam, this.startSequence));
  }

  public updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
  ): void {
    const match = this.findMatch(homeTeam, awayTeam);
    match.updateScore(homeScore, awayScore);
  }

  public finishMatch(homeTeam: string, awayTeam: string): void {
    const matchIndex = this.matches.findIndex(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (matchIndex === -1) {
      throw new DomainError("Match not found");
    }

    this.matches.splice(matchIndex, 1);
  }

  public getSummary(): MatchSummary[] {
    return [...this.matches]
      .sort((left, right) => {
        if (right.totalScore !== left.totalScore) {
          return right.totalScore - left.totalScore;
        }

        return right.startedOrder - left.startedOrder;
      })
      .map((match) => match.toSummaryItem());
  }

  private findMatch(homeTeam: string, awayTeam: string): Match {
    const match = this.matches.find(
      (item) => item.homeTeam === homeTeam && item.awayTeam === awayTeam,
    );

    if (!match) {
      throw new DomainError("Match not found");
    }

    return match;
  }
}
