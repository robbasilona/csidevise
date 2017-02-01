class AddDistToEvacCenter < ActiveRecord::Migration[5.0]
  def change
    add_column :evac_centers, :dist, :float
  end
end
