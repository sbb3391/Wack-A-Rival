class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, length: {minimum: 3, maximum: 25}, uniqueness: true
  validates :email, presence: true
  validates_confirmation_of :password
  has_many :comments
  has_many :highlights
end
