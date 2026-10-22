# Backend

Spring Boot 4.1 (Java 21, Maven wrapper). Package root: `com.etfmonitor.backend`. Opened in IntelliJ IDEA. The IntelliJ MCP server is registered in personal (local-scope) Claude Code config, not in the repo.

## Commands

Run from `backend/`. In PowerShell use `.\mvnw.cmd` instead of `./mvnw`.

- `./mvnw spring-boot:run`: start the API on :8080
- `./mvnw test`: tests
- `./mvnw -B verify`: full build, same as CI

## Spring Boot 4

- Starters were renamed in Boot 4. Use `spring-boot-starter-webmvc`, `spring-boot-starter-webmvc-test` and `spring-boot-starter-data-jpa-test`, not the Boot 3 names.
- Use constructor injection, not field `@Autowired`.

## Database

- Now: H2 in-memory (`jdbc:h2:mem:etfmonitor`) with `ddl-auto=create-drop`. Tests use their own `src/test/resources/application.properties`.
- Later: PostgreSQL. The driver in `pom.xml` and the properties in `application.properties` are commented out; re-enable both together.
- Config comes from environment variables (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`). Spring does not load `.env` files; they are set in the IntelliJ run configuration or the shell. `application-local.*` files are gitignored.

## Money and rounding

- Prices, amounts and rates are `BigDecimal`. Never `double`/`float`.
- Store prices exactly as received from the data provider; don't round when saving. Database columns: `NUMERIC(19, 6)` for prices and amounts.
- Calculate at full precision. When dividing, pass an explicit scale and rounding mode (e.g. `divide(x, 10, RoundingMode.HALF_EVEN)`); a bare `divide` throws on non-terminating results.
- Round only when sending values out of the API: EUR amounts to 2 decimals, percentages to 2 decimals, prices to the precision the provider gives. Always use `RoundingMode.HALF_EVEN`.
- Compare `BigDecimal` values with `compareTo`, not `equals` (`equals` also compares scale: 1.0 is not equal to 1.00).

## Style

- 2-space indentation, LF line endings (root `.editorconfig`).
