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
});
