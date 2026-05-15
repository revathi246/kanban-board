class Activity < ApplicationRecord
  belongs_to :card,
    optional: true
end
