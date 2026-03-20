import { describe, expect, it } from "vitest";
import { Scoreboard } from "../src/domain/Scoreboard";

function startMatchWithScore(
  scoreboard: Scoreboard,
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
): void {
  scoreboard.startMatch(homeTeam, awayTeam);
  scoreboard.updateScore(homeTeam, awayTeam, homeScore, awayScore);
}

describe("Scoreboard", () => {
  describe("startMatch", () => {
    it("starts a new match with an initial score of 0 - 0", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("Mexico", "Canada");

      const summary = scoreboard.getSummary();

      expect(summary).toHaveLength(1);
      expect(summary[0]).toMatchObject({
        homeTeam: "Mexico",
        awayTeam: "Canada",
        homeScore: 0,
        awayScore: 0,
      });
    });

    it("does not allow starting the same match twice", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("Mexico", "Canada");

      expect(() => scoreboard.startMatch("Mexico", "Canada")).toThrow(
        "Match already exists",
      );
    });

    it("does not allow the same team to play against itself", () => {
      const scoreboard = new Scoreboard();

      expect(() => scoreboard.startMatch("Mexico", "Mexico")).toThrow(
        "Teams must be different",
      );
    });

    it("does not allow blank team names", () => {
      const scoreboard = new Scoreboard();

      expect(() => scoreboard.startMatch("   ", "Canada")).toThrow(
        "Team names must be provided",
      );

      expect(() => scoreboard.startMatch("Mexico", "   ")).toThrow(
        "Team names must be provided",
      );
    });

    it("normalizes team names by trimming surrounding whitespace", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("  Mexico  ", "  Canada  ");

      const summary = scoreboard.getSummary();

      expect(summary).toHaveLength(1);
      expect(summary[0]).toMatchObject({
        homeTeam: "Mexico",
        awayTeam: "Canada",
        homeScore: 0,
        awayScore: 0,
      });
    });
  });

  describe("updateScore", () => {
    it("updates the score of an ongoing match", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore("Mexico", "Canada", 0, 5);

      const summary = scoreboard.getSummary();

      expect(summary).toHaveLength(1);
      expect(summary[0]).toMatchObject({
        homeTeam: "Mexico",
        awayTeam: "Canada",
        homeScore: 0,
        awayScore: 5,
      });
    });

    it("throws when updating a match that does not exist", () => {
      const scoreboard = new Scoreboard();

      expect(() => scoreboard.updateScore("Mexico", "Canada", 1, 1)).toThrow(
        "Match not found",
      );
    });

    it("does not allow negative scores", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("Mexico", "Canada");

      expect(() => scoreboard.updateScore("Mexico", "Canada", -1, 2)).toThrow(
        "Scores cannot be negative",
      );
    });
  });

  describe("finishMatch", () => {
    it("finishes an existing match and removes it from the scoreboard", () => {
      const scoreboard = new Scoreboard();

      scoreboard.startMatch("Mexico", "Canada");
      scoreboard.startMatch("Spain", "Brazil");

      scoreboard.finishMatch("Mexico", "Canada");

      const summary = scoreboard.getSummary();

      expect(summary).toHaveLength(1);
      expect(summary[0]).toMatchObject({
        homeTeam: "Spain",
        awayTeam: "Brazil",
        homeScore: 0,
        awayScore: 0,
      });
    });

    it("throws when finishing a match that does not exist", () => {
      const scoreboard = new Scoreboard();

      expect(() => scoreboard.finishMatch("Mexico", "Canada")).toThrow(
        "Match not found",
      );
    });
  });

  describe("getSummary", () => {
    it("returns matches ordered by total score descending and then by most recently started", () => {
      const scoreboard = new Scoreboard();

      startMatchWithScore(scoreboard, "Mexico", "Canada", 0, 5);
      startMatchWithScore(scoreboard, "Spain", "Brazil", 10, 2);
      startMatchWithScore(scoreboard, "Germany", "France", 2, 2);
      startMatchWithScore(scoreboard, "Uruguay", "Italy", 6, 6);
      startMatchWithScore(scoreboard, "Argentina", "Australia", 3, 1);

      const summary = scoreboard.getSummary();

      expect(
        summary.map(
          (match) =>
            `${match.homeTeam} ${match.homeScore} - ${match.awayTeam} ${match.awayScore}`,
        ),
      ).toEqual([
        "Uruguay 6 - Italy 6",
        "Spain 10 - Brazil 2",
        "Mexico 0 - Canada 5",
        "Argentina 3 - Australia 1",
        "Germany 2 - France 2",
      ]);
    });
  });
});
