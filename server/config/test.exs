use Mix.Config

# Configure your database

#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :api, API.Repo,
  username: "postgres",
  password: "postgres",
  database: "api_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: System.get_env("PGHOST"),
  pool: Ecto.Adapters.SQL.Sandbox

  

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :api, APIWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
# Relax crypto strength a bit during testing
config :bcrypt_elixir, :log_rounds, 4