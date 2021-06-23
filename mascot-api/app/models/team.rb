class Team < ApplicationRecord
  has_one :mascot
  has_many :highlights
end
