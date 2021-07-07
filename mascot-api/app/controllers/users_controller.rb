class UsersController < ApplicationController

  def create
    user = User.new(user_params)

    if user.save
      payload = {user_id: user.id}
      token = encode_token(payload)
      user_json = UserSerializer.new(user).serializable_hash
      user_json[:jwt] = token
      render json: {
        user: user_json,               
        jwt: token
      }
    else
      render json: user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
