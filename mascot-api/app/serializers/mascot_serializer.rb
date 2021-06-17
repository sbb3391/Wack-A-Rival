class MascotSerializer
  include FastJsonapi::ObjectSerializer
  attributes :cartoon_image_location, :name, :team_id
  belongs_to :team
end
