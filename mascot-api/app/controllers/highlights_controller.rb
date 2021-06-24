class HighlightsController < ApplicationController

  def team_highlights
    highlights = Highlight.all.where(team_id: params[:team_id])

    render json: HighlightSerializer.new(highlights).serializable_hash
  end
end
