# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_15_072013) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "action"
    t.bigint "card_id"
    t.datetime "created_at", null: false
    t.text "message"
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_activities_on_card_id"
    t.index ["created_at"], name: "index_activities_on_created_at"
  end

  create_table "cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.decimal "position", precision: 20, scale: 10, null: false
    t.string "status", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["position"], name: "index_cards_on_position"
    t.index ["status"], name: "index_cards_on_status"
  end

  add_foreign_key "activities", "cards", on_delete: :nullify
end
