class UserHighlightsController < ApplicationController
  
  def index
    user = User.find(params[:user_id])
    user_highlights = UserHighlight.all.where(user_id: user.id)

    render json: user_highlights.to_json
  end

  def create 
    user = User.find(params[:user_highlight][:user_id])

    new_user_highlight = UserHighlight.new(user_highlight_params)

    if new_user_highlight.save
      user_highlights = UserHighlight.all.where(user_id: user.id)
      render json: user_highlights.to_json
    else
      render json: { errors: new_user_highlight.errors.messages }
    end
   
  end


  private 

  def user_highlight_params
    params.require(:user_highlight).permit(:user_id, :highlight_id)
  end

end
