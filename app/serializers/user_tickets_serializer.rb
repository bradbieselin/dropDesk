class UserTicketsSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :tickets
end
