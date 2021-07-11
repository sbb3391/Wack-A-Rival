class HighlightsController < ApplicationController

  def team_highlights
    all_team_highlights = Highlight.all.where(team_id: params[:team_id], highlight_type: params[:highlight_type])
    highlight_ids_for_this_user = UserHighlight.all.where(user_id: params[:user_id]).map { |uh| uh.highlight_id }
    locked_team_highlights = all_team_highlights.reject { |h| highlight_ids_for_this_user.include?(h.id) }
    
    if !locked_team_highlights.empty?
      render json: HighlightSerializer.new(locked_team_highlights).serializable_hash
    else
      render json: HighlightSerializer.new(all_team_highlights).serializable_hash
    end

  end

  def index 
    highlights = Highlight.all

    render json: HighlightSerializer.new(highlights).serializable_hash
  end

  def show
    highlight = Highlight.find_by_id(params[:id])

    options =  { include: [:comments] }
   
    
    render json: HighlightSerializer.new(highlight, options).serializable_hash
  end

  def create
    highlight = Highlight.create(highlight_params)

    render json: highlight
  end


  private 

  def highlight_params
    params.require(:highlight).permit(:description, :media_url, :highlight_type, :team_id, :user_id)
  end
end
