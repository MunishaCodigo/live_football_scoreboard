import { describe, it, expect } from "vitest";
import { Scoreboard } from "../src/domain/Scoreboard";

describe("Scoreboard", () => {
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

  it("returns matches ordered by total score descending and then by most recently started", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 0, 5);

    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore("Spain", "Brazil", 10, 2);

    scoreboard.startMatch("Germany", "France");
    scoreboard.updateScore("Germany", "France", 2, 2);

    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);

    scoreboard.startMatch("Argentina", "Australia");
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

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

  it("throws when updating a match that does not exist", () => {
    const scoreboard = new Scoreboard();

    expect(() => scoreboard.updateScore("Mexico", "Canada", 1, 1)).toThrow(
      "Match not found",
    );
  });

  it("throws when finishing a match that does not exist", () => {
    const scoreboard = new Scoreboard();

    expect(() => scoreboard.finishMatch("Mexico", "Canada")).toThrow(
      "Match not found",
    );
  });

  it("does not allow starting the same match twice", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Mexico", "Canada");

    expect(() => scoreboard.startMatch("Mexico", "Canada")).toThrow(
      "Match already exists",
    );
  });

  it("does not allow negative scores", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Mexico", "Canada");

    expect(() => scoreboard.updateScore("Mexico", "Canada", -1, 2)).toThrow(
      "Scores cannot be negative",
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
