class SessionsController < ApplicationController

  def index

    if session.include?(:user_id)
      render json: { user: "logged in"}
    else 
      render json: { user: "not logged in"}
    end
  end

  def login
    @user = User.find_by_username(params[:session][:username])

    user = @user.try(:authenticate, params[:session][:password])

    #redirect back to create_user form if they did not authenticate
    return redirect_to new_user_url unless user
  
    session[:user_id] = user.id

    redirect_to library_path(user.library)
  end

  # logout
  def logout
    session.delete(:user_id)
  end
end
