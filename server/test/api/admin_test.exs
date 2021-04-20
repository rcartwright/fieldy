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
end
