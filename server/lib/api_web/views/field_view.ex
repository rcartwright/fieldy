defmodule APIWeb.FieldView do
  use APIWeb, :view
  alias APIWeb.FieldView

  def render("index.json", %{fields: fields}) do
    %{data: render_many(fields, FieldView, "field.json")}
  end

  def render("show.json", %{field: field}) do
    %{data: render_one(field, FieldView, "field.json")}
  end

  def render("field.json", %{field: field}) do
    %{id: field.id,
      name: field.name,
      address: field.address,
      address1: field.address1,
      city: field.city,
      state: field.state,
      zip: field.zip,
      is_active: field.is_active}
  end
end
