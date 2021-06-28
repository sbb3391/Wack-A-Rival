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

  def create
    highlight = Highlight.create(highlight_params)
  end


  private 

  def highlight_params
    params.require(:highlight).permit(:description, :media_url, :highlight_type, :team_id)
  end
end
