  defmodule Battleship.Mixfile do
  use Mix.Project

  def project do
    {<< git_sha::bytes-size(7) >> <> _rest, _exit_code} = System.cmd("git", ["rev-parse", "HEAD"])
    {commit_num, _exit_code} = System.cmd("git", ["rev-list", "HEAD", "--count"])
    commit_num = String.trim(commit_num)

    [app: :battleship,
     version: "0.2.1-#{commit_num}-#{git_sha}",
     elixir: "~> 1.3",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Battleship, []},
     applications: [:phoenix, :phoenix_pubsub, :phoenix_html, :cowboy, :logger, :gettext, :poison]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.2.0"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"},
     {:mix_test_watch, "~> 0.2", only: :dev},
     {:poison, "~> 2.0"},
     {:distillery, "~> 0.10"}]
  end
end
