class Card < ApplicationRecord

  validates :title, presence: true
  has_many :activities
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