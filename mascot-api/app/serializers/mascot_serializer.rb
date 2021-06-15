class MascotSerializer
  include FastJsonapi::ObjectSerializer
  attributes :cartoon_image_location, :name, :id
  belongs_to :team
end
