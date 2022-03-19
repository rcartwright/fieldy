defmodule API.Admin.Field do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "fields" do
    field :address, :string
    field :address1, :string
    field :city, :string
    field :is_active, :boolean, default: false
    field :name, :string
    field :state, :string
    field :zip, :string
    #field :organization_id, :string
    belongs_to(:organization, Organization)

    timestamps()
  end

  @doc false
  def changeset(field, attrs) do
    field
    |> cast(attrs, [:name, :address, :address1, :city, :state, :zip, :is_active, :organization_id])
    |> validate_required([:name, :address, :address1, :city, :state, :zip, :is_active, :organization_id])
  end
end
