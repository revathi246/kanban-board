class Card < ApplicationRecord

  validates :title, presence: true

  STATUSES = [
    "Backlog",
    "To Do",
    "In Progress",
    "In Review",
    "Done"
  ]

  validates :status,
    inclusion: {
      in: STATUSES
    }
end