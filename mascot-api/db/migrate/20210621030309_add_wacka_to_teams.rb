class AddWackaToTeams < ActiveRecord::Migration[6.1]
  def change
    add_column :teams, :wack_a, :string
  end
end
