class CreateUserHighlights < ActiveRecord::Migration[6.1]
  def change
    create_table :user_highlights do |t|

      t.belongs_to :user
      t.belongs_to :highlight
      t.timestamps
    end
  end
end
