class CreateHighlights < ActiveRecord::Migration[6.1]
  def change
    create_table :highlights do |t|
      t.belongs_to :team
      t.string :media_url
      t.text :description
      t.string :win_or_loss
      t.timestamps
    end
  end
end
