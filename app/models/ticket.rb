class Ticket < ApplicationRecord
    belongs_to :user
    belongs_to :category

    validates :title, presence: true, length: { maximum: 35 }
    validates :description, presence: true
end
