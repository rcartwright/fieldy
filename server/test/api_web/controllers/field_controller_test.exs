defmodule APIWeb.FieldControllerTest do
  use APIWeb.ConnCase

  alias API.Admin
  alias API.Admin.Field

  @create_attrs %{
    address: "some address",
    address1: "some address1",
    city: "some city",
    is_active: true,
    name: "some name",
    state: "some state",
    zip: "some zip"
  }
  @update_attrs %{
    address: "some updated address",
    address1: "some updated address1",
    city: "some updated city",
    is_active: false,
    name: "some updated name",
    state: "some updated state",
    zip: "some updated zip"
  }
  @invalid_attrs %{address: nil, address1: nil, city: nil, is_active: nil, name: nil, state: nil, zip: nil}

  def fixture(:field) do
    {:ok, field} = Admin.create_field(@create_attrs)
    field
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all fields", %{conn: conn} do
      conn = get(conn, Routes.field_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create field" do
    test "renders field when data is valid", %{conn: conn} do
      conn = post(conn, Routes.field_path(conn, :create), field: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.field_path(conn, :show, id))

      assert %{
               "id" => id,
               "address" => "some address",
               "address1" => "some address1",
               "city" => "some city",
               "is_active" => true,
               "name" => "some name",
               "state" => "some state",
               "zip" => "some zip"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.field_path(conn, :create), field: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update field" do
    setup [:create_field]

    test "renders field when data is valid", %{conn: conn, field: %Field{id: id} = field} do
      conn = put(conn, Routes.field_path(conn, :update, field), field: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.field_path(conn, :show, id))

      assert %{
               "id" => id,
               "address" => "some updated address",
               "address1" => "some updated address1",
               "city" => "some updated city",
               "is_active" => false,
               "name" => "some updated name",
               "state" => "some updated state",
               "zip" => "some updated zip"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, field: field} do
      conn = put(conn, Routes.field_path(conn, :update, field), field: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete field" do
    setup [:create_field]

    test "deletes chosen field", %{conn: conn, field: field} do
      conn = delete(conn, Routes.field_path(conn, :delete, field))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.field_path(conn, :show, field))
      end
    end
  end

  defp create_field(_) do
    field = fixture(:field)
    %{field: field}
  end
end
