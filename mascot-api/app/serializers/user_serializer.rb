class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :email
  has_many :highlights
  has_many :comments
end
