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
});
