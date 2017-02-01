class CreateEvacCenters < ActiveRecord::Migration[5.0]
  def change
    create_table :evac_centers do |t|
      t.string :name
      t.integer :capacity
      t.integer :quantity
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end