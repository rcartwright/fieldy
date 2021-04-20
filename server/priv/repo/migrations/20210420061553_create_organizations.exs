defmodule API.Repo.Migrations.CreateOrganizations do
  use Ecto.Migration

  def change do
    create table(:organizations, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :is_active, :boolean, default: false, null: false

      timestamps()
    end

  end
end
