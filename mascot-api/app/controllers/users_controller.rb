class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      byebug
      session[:user_id] = @user.id

      render json: { aMessage: "successfully created new user" }
      byebug
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
