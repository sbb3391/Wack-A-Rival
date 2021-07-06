class SessionsController < ApplicationController

  def login
    user = User.find_by(username: params[:user][:username])
    if user && user.authenticate(params[:user][:password])
        payload = {user_id: user.id}
        token = encode_token(payload)
        user_json = UserSerializer.new(user).serializable_hash
        user_json[:jwt] = token
        render json: {
            user: user_json,               
            jwt: token}
    else
        render json: {status: "error", message: "We don't find such an user according to your information,please try again."}
    end
  end

  # def show
  #   if session_user
  #       render json: UserSerializer.new(user).serializable_hash
  #   else
  #       render json: {errors: "No User Logged In."}
  #   end   
  # end
                              

  def autologin
    if session_user
      render json: UserSerializer.new(session_user).serializable_hash
    else
      render json: {errors: "No User Logged In."}
    end 
  end

  def index
    if session.include?(:user_id)
      render json: { user: "logged in"}
    else 
      render json: { user: "not logged in"}
    end
  end

  # def login
  #   @user = User.find_by_username(params[:session][:username])

  #   user = @user.try(:authenticate, params[:session][:password])

  #   #redirect back to create_user form if they did not authenticate
  #   return redirect_to new_user_url unless user
  
  #   session[:user_id] = user.id

  #   redirect_to library_path(user.library)
  # end

  # # logout
  # def logout
  #   session.delete(:user_id)
  # end
end
