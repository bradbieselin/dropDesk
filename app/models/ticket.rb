class Ticket < ApplicationRecord
    belongs_to :user
    belongs_to :category

    validates :title, presence: true
    validates :description, presence: true
end
