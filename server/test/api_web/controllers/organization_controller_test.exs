defmodule APIWeb.OrganizationControllerTest do
  use APIWeb.ConnCase

  alias API.Admin
  alias API.Admin.Organization

  @create_attrs %{
    is_active: true,
    name: "some name"
  }
  @update_attrs %{
    is_active: false,
    name: "some updated name"
  }
  @invalid_attrs %{is_active: nil, name: nil}

  def fixture(:organization) do
    {:ok, organization} = Admin.create_organization(@create_attrs)
    organization
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all organizations", %{conn: conn} do
      conn = get(conn, Routes.organization_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create organization" do
    test "renders organization when data is valid", %{conn: conn} do
      conn = post(conn, Routes.organization_path(conn, :create), organization: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.organization_path(conn, :show, id))

      assert %{
               "id" => id,
               "is_active" => true,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.organization_path(conn, :create), organization: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update organization" do
    setup [:create_organization]

    test "renders organization when data is valid", %{conn: conn, organization: %Organization{id: id} = organization} do
      conn = put(conn, Routes.organization_path(conn, :update, organization), organization: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.organization_path(conn, :show, id))

      assert %{
               "id" => id,
               "is_active" => false,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, organization: organization} do
      conn = put(conn, Routes.organization_path(conn, :update, organization), organization: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete organization" do
    setup [:create_organization]

    test "deletes chosen organization", %{conn: conn, organization: organization} do
      conn = delete(conn, Routes.organization_path(conn, :delete, organization))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.organization_path(conn, :show, organization))
      end
    end
  end

  defp create_organization(_) do
    organization = fixture(:organization)
    %{organization: organization}
  end
end
