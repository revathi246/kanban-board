class ChangeActivityCardNull < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :activities, :cards

    change_column_null :activities,
      :card_id,
      true

    add_foreign_key :activities,
      :cards,
      on_delete: :nullify
  end
end
