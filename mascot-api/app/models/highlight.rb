class Highlight < ApplicationRecord
  belongs_to :team
  has_many :comments
  belongs_to :user
end