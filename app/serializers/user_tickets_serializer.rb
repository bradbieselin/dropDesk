class UserTicketsSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :tickets
end
