defmodule APIWeb.OrganizationView do
  use APIWeb, :view
  alias APIWeb.OrganizationView

  def render("index.json", %{organizations: organizations}) do
    %{data: render_many(organizations, OrganizationView, "organization.json")}
  end

  def render("show.json", %{organization: organization}) do
    %{data: render_one(organization, OrganizationView, "organization.json")}
  end

  def render("organization.json", %{organization: organization}) do
    %{id: organization.id,
      name: organization.name,
      is_active: organization.is_active}
  end
end
