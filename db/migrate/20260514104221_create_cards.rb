class CreateCards < ActiveRecord::Migration[8.0]
  def change
    create_table :cards do |t|

      t.string :title, null: false

      t.text :description

      t.string :status, null: false

      t.decimal :position,
        precision: 20,
        scale: 10,
        null: false

      t.timestamps
    end

    add_index :cards, :status
    add_index :cards, :position
  end
end