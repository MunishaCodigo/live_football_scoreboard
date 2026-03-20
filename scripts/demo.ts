import { Scoreboard } from "../src/domain/Scoreboard";

const scoreboard = new Scoreboard();

scoreboard.startMatch("Mexico", "Canada");
scoreboard.updateScore("Mexico", "Canada", 0, 5);

scoreboard.startMatch("Spain", "Brazil");
scoreboard.updateScore("Spain", "Brazil", 10, 2);

console.log(scoreboard.getSummary());
