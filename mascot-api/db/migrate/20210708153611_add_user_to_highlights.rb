class AddUserToHighlights < ActiveRecord::Migration[6.1]
  def change
    add_reference :highlights, :user, null: true, foreign_key: true
  end
end
