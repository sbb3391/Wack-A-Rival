class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :school, :nickname, :shorthand_name, :description, :id, :wack_a, :image, :real_life_record_vs_arkansas
  has_one :mascot 
end
