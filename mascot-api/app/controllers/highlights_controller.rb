class HighlightsController < ApplicationController

  def team_highlights
    highlights = Highlight.all.where(team_id: params[:team_id])

    render json: HighlightSerializer.new(highlights).serializable_hash
  end

  def index 
    highlights = Highlight.all

    render json: HighlightSerializer.new(highlights).serializable_hash
  end

  def show
    highlight = Highlight.find_by_id(params[:id])
    
    render json: HighlightSerializer.new(highlight).serializable_hash
  end
end
