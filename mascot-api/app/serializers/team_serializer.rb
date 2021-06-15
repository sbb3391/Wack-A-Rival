class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :school, :nickname, :shorthand_name, :description
  has_one :mascot 
end
