class UsersController < ApplicationController

  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      byebug

      render json: UserSerializer.new(user).serializable_hash
    else
      render json: user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
