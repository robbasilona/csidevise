class CreatePins < ActiveRecord::Migration[5.0]
  def change
    create_table :pins do |t|
      t.string :name
      t.string :classification
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end