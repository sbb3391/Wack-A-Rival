class HighlightSerializer
  include FastJsonapi::ObjectSerializer
  attributes :media_url, :description, :win_or_loss
  belongs_to :team
end
