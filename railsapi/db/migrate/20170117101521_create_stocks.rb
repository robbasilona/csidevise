class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.integer :quantity
      t.belongs_to :pin, index: true
      t.belongs_to :supply, index: true

      t.timestamps
    end
  end
end