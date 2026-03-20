import { Scoreboard } from "../src/domain/Scoreboard";

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

console.log(scoreboard.getSummary());
