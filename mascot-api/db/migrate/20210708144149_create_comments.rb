class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :comment_text
      t.string :username
      t.belongs_to :highlight
      t.belongs_to :user

      t.timestamps
    end
  end
end
