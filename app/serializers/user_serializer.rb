class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :tickets
end
