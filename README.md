# Real-time Leaderboard

A backend system for a real-time leaderboard service allowing users to compete in games or activities, submit scores, and view rankings instantly.

## Features

- **User Authentication:** Secure registration and login.
- **Score Submission:** Users submit scores for various games or activities.
- **Real-time Leaderboard Updates:** Global leaderboard displays top users across games.
- **User Rankings:** Instantly view individual rankings and positions.
- **Score History Tracking:** Track and review player scores over time.
- **Top Players Report:** Generate reports for the top performers for specific periods.

## Architecture Used

- **Redis Sorted Sets:**  
  - Store and manage leaderboards efficiently.
  - Provide fast, real-time updates and queries.
  - Use Redis commands to fetch user ranks and leaderboard positions.

## Getting Started

1. Clone the repository and set up dependencies.
2. Configure Redis and environment variables as needed.
3. Run the backend server.

## License

MIT
