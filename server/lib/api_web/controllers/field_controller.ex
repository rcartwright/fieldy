defmodule APIWeb.FieldController do
  use APIWeb, :controller

  alias API.Admin
  alias API.Admin.Field

  action_fallback APIWeb.FallbackController

  def index(conn, %{"organization_id" => orgId}) do
    fields = Admin.list_fields(orgId)
    render(conn, "index.json", fields: fields)
  end

  def create(conn,  %{"field" => field_params, "organization_id" => orgId}) do
    IO.inspect(conn.body_params)

    fields = Map.merge(field_params, %{"organization_id" => orgId})
    IO.inspect(fields)
    with {:ok, %Field{} = field} <- Admin.create_field(fields) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.field_path(conn, :create, field))
      |> render("show.json", field: field)
    end
  end

  def show(conn, %{"id" => id}) do
    field = Admin.get_field!(id)
    render(conn, "show.json", field: field)
  end

  def update(conn, %{"id" => id, "field" => field_params}) do
    field = Admin.get_field!(id)

    with {:ok, %Field{} = field} <- Admin.update_field(field, field_params) do
      render(conn, "show.json", field: field)
    end
  end

  def delete(conn, %{"id" => id}) do
    field = Admin.get_field!(id)

    with {:ok, %Field{}} <- Admin.delete_field(field) do
      send_resp(conn, :no_content, "")
    end
  end
end
