class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :school, :nickname, :shorthand_name, :description, :id, :wack_a
  has_one :mascot 
end
