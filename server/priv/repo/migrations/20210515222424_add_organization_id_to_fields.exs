defmodule API.Repo.Migrations.AddOrganizationIdToFields do
  use Ecto.Migration

  def change do
    alter table(:fields) do
      add :organization_id, references(:organizations, type: :binary_id, column: :id, on_delete: :delete_all)
    end
  end
end
