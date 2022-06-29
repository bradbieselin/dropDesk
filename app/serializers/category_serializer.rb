class CategorySerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :tickets, serializer: TicketSerializer
end
