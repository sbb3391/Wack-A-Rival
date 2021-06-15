class CreateMascots < ActiveRecord::Migration[6.1]
  def change
    create_table :mascots do |t|
      t.string :name 
      t.text :origin_description
      t.string :cartoon_image_location
      t.string :real_life_image_location
      t.belongs_to :team
      t.timestamps
    end
  end
end
