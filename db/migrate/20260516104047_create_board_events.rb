class CreateBoardEvents < ActiveRecord::Migration[8.1]
   def change

    create_table :board_events do |t|

      t.string :event_type,
        null: false

      t.jsonb :payload,
        default: {}

      t.timestamps
    end
  end
end
