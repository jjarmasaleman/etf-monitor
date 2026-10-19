[![Backend CI](https://github.com/jjarmasaleman/etf-monitor/actions/workflows/backend.yml/badge.svg?branch=master&event=push)](https://github.com/jjarmasaleman/etf-monitor/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/jjarmasaleman/etf-monitor/actions/workflows/frontend.yml/badge.svg?branch=master&event=push)](https://github.com/jjarmasaleman/etf-monitor/actions/workflows/frontend.yml)

# ETF Monitor

A personal ETF portfolio tracker with a Spring Boot backend and an Angular frontend.

> **Status:** early development.

## About

ETF Monitor tracks the daily prices of selected ETFs, stores their history, and shows returns and portfolio value in a web dashboard.

It is a **personal project**: a chance to play around with Java backend development alongside an Angular frontend, while satisfying my curiosity about ETFs.

## Tech stack

| Part | Technology |
|---|---|
| Backend | Java 21, Spring Boot, Maven |
| Database | PostgreSQL (planned) |
| Frontend | Angular 22, TypeScript, Chart.js, Vitest, Node.js, npm |
| Market data | Alpha Vantage API (planned) |
| Infrastructure | Docker (planned) |

### Tooling

| Purpose | Tool |
|---|---|
| Backend IDE | IntelliJ IDEA |
| Frontend IDE | Visual Studio Code |

## Project structure

```
etf-monitor/
├── backend/     Spring Boot application (Maven)
│   └── src/
├── frontend/    Angular application
│   └── src/
├── .github/     CI workflows (backend, frontend, conventions)
└── .githooks/   Git hooks (commit-msg)
```

## Getting started

### Backend

Requirements: JDK 21 or newer.

```
cd backend
./mvnw spring-boot:run
```

On Windows, use `mvnw.cmd` instead of `./mvnw`. Alternatively, run `EtfMonitorApplication` from IntelliJ IDEA. The API listens on `http://localhost:8080`.

Run the tests (from `backend/`):

```
./mvnw test
```

#### Configuration

Once PostgreSQL is enabled, the database settings will be read from environment variables (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).

For local development, copy `backend/.env.template` to `backend/.env` and fill in the values. Spring Boot does not load `.env` files by itself, so define these variables in your IntelliJ run configuration (or export them in your shell) before starting the application.

### Frontend

Requirements: Node.js 22 and npm 8 or newer.

```
cd frontend
npm install
npm start
```

The app is served at `http://localhost:4200`. Requests to `/api` are proxied to the backend on port 8080 (see `frontend/proxy.conf.json`), so start the backend first.

Run the tests (from `frontend/`):

```
npm test
```

## Roadmap

- [x] Backend project skeleton
- [x] Frontend project skeleton
- [ ] Data ingestion: fetch daily prices on a schedule and store them
- [ ] Business logic: return over a period, moving average
- [ ] REST API
- [ ] Angular dashboard: price chart, comparison, portfolio value
- [ ] Production setup: PostgreSQL, Docker Compose, authentication, logging, CI

## Disclaimer

This is a personal project, provided as is, without warranty of any kind. It has not been audited, and nothing in it is guaranteed to be correct, secure or fit for any purpose. Use it at your own risk: the author accepts no responsibility for any damage or loss resulting from its use.

Nothing in this repository, including any data, calculation or output, is financial, investment or tax advice, and it should not be treated as a reliable source of information about ETFs or any other financial product. Do not base financial decisions on it.
