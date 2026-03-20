import { DomainError } from "../errors/DomainError";

export class Match {
  public readonly homeTeam: string;
  public readonly awayTeam: string;
  public readonly startedOrder: number;

  private _homeScore: number;
  private _awayScore: number;

  public constructor(homeTeam: string, awayTeam: string, startedOrder: number) {
    const normalizedHomeTeam = homeTeam.trim();
    const normalizedAwayTeam = awayTeam.trim();

    if (normalizedHomeTeam.length === 0 || normalizedAwayTeam.length === 0) {
      throw new DomainError("Team names must be provided");
    }

    if (normalizedHomeTeam === normalizedAwayTeam) {
      throw new DomainError("Teams must be different");
    }

    this.homeTeam = normalizedHomeTeam;
    this.awayTeam = normalizedAwayTeam;
    this.startedOrder = startedOrder;
    this._homeScore = 0;
    this._awayScore = 0;
  }

  public updateScore(homeScore: number, awayScore: number): void {
    if (homeScore < 0 || awayScore < 0) {
      throw new DomainError("Scores cannot be negative");
    }

    this._homeScore = homeScore;
    this._awayScore = awayScore;
  }

  public get homeScore(): number {
    return this._homeScore;
  }

  public get awayScore(): number {
    return this._awayScore;
  }

  public get totalScore(): number {
    return this._homeScore + this._awayScore;
  }

  public toSummaryItem(): {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  } {
    return {
      homeTeam: this.homeTeam,
      awayTeam: this.awayTeam,
      homeScore: this.homeScore,
      awayScore: this.awayScore,
    };
  }
}
