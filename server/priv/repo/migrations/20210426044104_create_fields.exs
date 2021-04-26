defmodule API.Repo.Migrations.CreateFields do
  use Ecto.Migration

  def change do
    create table(:fields, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :address, :string
      add :address1, :string
      add :city, :string
      add :state, :string
      add :zip, :string
      add :is_active, :boolean, default: false, null: false

      timestamps()
    end

  end
end
