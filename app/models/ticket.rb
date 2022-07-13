class Ticket < ApplicationRecord
    belongs_to :user
    belongs_to :category

    validates :title, presence: true, length: { maximum: 25 }
    validates :description, presence: true
end
