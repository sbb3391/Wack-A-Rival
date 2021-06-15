class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :school
      t.string :nickname
      t.string :shorthand_name
      t.string :real_life_record_vs_arkansas
      t.integer :wins_in_game
      t.integer :losses_in_game
      t.text :description
      t.timestamps
    end
  end
end
