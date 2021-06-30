class AddImageToTeams < ActiveRecord::Migration[6.1]
  def change
    add_column :teams, :image, :string
  end
end
