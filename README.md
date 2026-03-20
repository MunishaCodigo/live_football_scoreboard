# Football World Cup Scoreboard

A simple in-memory TypeScript library for tracking live football World Cup matches and their scores.

---

## Overview

This project provides a lightweight library to manage live football matches.  
It allows you to start matches, update scores, finish matches, and retrieve a summary of ongoing matches.

---

## Requirements Covered

The library supports the following operations:

- Start a new match (initial score is always `0 - 0`)
- Update match score using absolute values
- Finish a match (removes it from the scoreboard)
- Get a summary of matches ordered by:
  1. Total score (descending)
  2. Most recently started match first when scores are equal

---

## Assumptions

- A match is uniquely identified by `(homeTeam, awayTeam)`
- The same match cannot be started twice
- Team names are trimmed (e.g. `" Mexico "` → `"Mexico"`)
- Team names must not be empty
- A team cannot play against itself
- Scores must be zero or positive
- Update and finish operations apply only to existing matches

---

## Design Choices

- **In-memory storage**  
  Uses simple collections (arrays)

- **Separation of concerns**
  - `Scoreboard` manages match operations
  - `Match` encapsulates match state and validation

- **Deterministic ordering**  
  Uses an internal sequence number instead of timestamps to track match order

- **Test-driven development (TDD)**  
  Functionality was built incrementally using tests

---

## Public API

### `Scoreboard`

#### `startMatch(homeTeam: string, awayTeam: string): void`

Starts a new match with score `0 - 0`.

#### `updateScore(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void`

Updates the score of an existing match.

#### `finishMatch(homeTeam: string, awayTeam: string): void`

Finishes a match and removes it from the scoreboard.

#### `getSummary(): MatchSummary[]`

Returns matches ordered by total score and recency.

---

## MatchSummary

```ts
type MatchSummary = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
};
```
