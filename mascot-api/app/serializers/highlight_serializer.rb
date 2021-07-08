class HighlightSerializer
  include FastJsonapi::ObjectSerializer
  attributes :media_url, :description, :highlight_type
  belongs_to :team
  has_many :comments
end
