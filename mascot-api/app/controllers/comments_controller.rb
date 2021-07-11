class CommentsController < ApplicationController

  def create
    new_comment = Comment.new(comments_params)

    new_comment.username = User.find_by(id: comments_params[:user_id]).username

    if new_comment.save 
      render json: new_comment
    end
  end

  private 

  def comments_params
    params.require(:comment).permit(:user_id, :highlight_id, :comment_text)
  end
end
