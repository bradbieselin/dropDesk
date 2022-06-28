class TicketSerializer < ActiveModel::Serializer
  attributes :id, :title

  belongs_to :user
  belongs_to :category
end
