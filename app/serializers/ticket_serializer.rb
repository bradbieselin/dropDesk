class TicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :username

  belongs_to :user
  belongs_to :category

  def username
    self.object.user.username
  end
end
