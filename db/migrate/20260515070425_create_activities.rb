class CreateActivities < ActiveRecord::Migration[8.1]
  def change
    create_table :activities do |t|

      t.string :action

      t.text :message

      t.references :card,
        foreign_key: true

      t.timestamps
    end

    add_index :activities, :created_at
  end
end
