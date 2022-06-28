class User < ApplicationRecord
    has_many :tickets
    has_many :categories, through: :tickets

    has_secure_password

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
