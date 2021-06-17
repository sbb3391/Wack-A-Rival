class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :school, :nickname, :shorthand_name, :description, :id
  has_one :mascot 
end
