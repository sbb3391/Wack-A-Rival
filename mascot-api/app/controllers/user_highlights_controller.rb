class UserHighlightsController < ApplicationController
  
  def index
    user = User.find(params[:user_id])
    user_highlights = UserHighlight.all.where(user_id: user.id)
    byebug

    render json: user_highlights.to_json
  end

end
