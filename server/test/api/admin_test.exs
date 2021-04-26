defmodule API.AdminTest do
  use API.DataCase

  alias API.Admin

  describe "organizations" do
    alias API.Admin.Organization

    @valid_attrs %{is_active: true, name: "some name"}
    @update_attrs %{is_active: false, name: "some updated name"}
    @invalid_attrs %{is_active: nil, name: nil}

    def organization_fixture(attrs \\ %{}) do
      {:ok, organization} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_organization()

      organization
    end

    test "list_organizations/0 returns all organizations" do
      organization = organization_fixture()
      assert Admin.list_organizations() == [organization]
    end

    test "get_organization!/1 returns the organization with given id" do
      organization = organization_fixture()
      assert Admin.get_organization!(organization.id) == organization
    end

    test "create_organization/1 with valid data creates a organization" do
      assert {:ok, %Organization{} = organization} = Admin.create_organization(@valid_attrs)
      assert organization.is_active == true
      assert organization.name == "some name"
    end

    test "create_organization/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_organization(@invalid_attrs)
    end

    test "update_organization/2 with valid data updates the organization" do
      organization = organization_fixture()
      assert {:ok, %Organization{} = organization} = Admin.update_organization(organization, @update_attrs)
      assert organization.is_active == false
      assert organization.name == "some updated name"
    end

    test "update_organization/2 with invalid data returns error changeset" do
      organization = organization_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_organization(organization, @invalid_attrs)
      assert organization == Admin.get_organization!(organization.id)
    end

    test "delete_organization/1 deletes the organization" do
      organization = organization_fixture()
      assert {:ok, %Organization{}} = Admin.delete_organization(organization)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_organization!(organization.id) end
    end

    test "change_organization/1 returns a organization changeset" do
      organization = organization_fixture()
      assert %Ecto.Changeset{} = Admin.change_organization(organization)
    end
  end

  describe "fields" do
    alias API.Admin.Field

    @valid_attrs %{address: "some address", address1: "some address1", city: "some city", is_active: true, name: "some name", state: "some state", zip: "some zip"}
    @update_attrs %{address: "some updated address", address1: "some updated address1", city: "some updated city", is_active: false, name: "some updated name", state: "some updated state", zip: "some updated zip"}
    @invalid_attrs %{address: nil, address1: nil, city: nil, is_active: nil, name: nil, state: nil, zip: nil}

    def field_fixture(attrs \\ %{}) do
      {:ok, field} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_field()

      field
    end

    test "list_fields/0 returns all fields" do
      field = field_fixture()
      assert Admin.list_fields() == [field]
    end

    test "get_field!/1 returns the field with given id" do
      field = field_fixture()
      assert Admin.get_field!(field.id) == field
    end

    test "create_field/1 with valid data creates a field" do
      assert {:ok, %Field{} = field} = Admin.create_field(@valid_attrs)
      assert field.address == "some address"
      assert field.address1 == "some address1"
      assert field.city == "some city"
      assert field.is_active == true
      assert field.name == "some name"
      assert field.state == "some state"
      assert field.zip == "some zip"
    end

    test "create_field/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_field(@invalid_attrs)
    end

    test "update_field/2 with valid data updates the field" do
      field = field_fixture()
      assert {:ok, %Field{} = field} = Admin.update_field(field, @update_attrs)
      assert field.address == "some updated address"
      assert field.address1 == "some updated address1"
      assert field.city == "some updated city"
      assert field.is_active == false
      assert field.name == "some updated name"
      assert field.state == "some updated state"
      assert field.zip == "some updated zip"
    end

    test "update_field/2 with invalid data returns error changeset" do
      field = field_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_field(field, @invalid_attrs)
      assert field == Admin.get_field!(field.id)
    end

    test "delete_field/1 deletes the field" do
      field = field_fixture()
      assert {:ok, %Field{}} = Admin.delete_field(field)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_field!(field.id) end
    end

    test "change_field/1 returns a field changeset" do
      field = field_fixture()
      assert %Ecto.Changeset{} = Admin.change_field(field)
    end
  end
end
