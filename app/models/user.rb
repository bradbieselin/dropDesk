class User < ApplicationRecord
    has_many :tickets
    has_many :categories, through: :tickets

    validates :name, presence: true
    validates :name, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
