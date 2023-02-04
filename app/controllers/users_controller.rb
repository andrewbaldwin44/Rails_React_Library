class UsersController < ApplicationController
  def create
    if user_exists
      render json: user
    else
      new_user = User.create!(user_params)

      if new_user
        render json: new_user
      else
        render json: new_user.errors
      end
    end
  end

  def update
    respond_to do |format|
      if user.update(user_params)
        render json: user
      else
        render json: user.errors
      end
    end
  end

  private

  def user_params
    params.permit(:email, :username, :avatar, :userID)
  end

  def user
    @user ||= User.find_by(email: params[:email])
  end

  def user_exists
    User.exists?(email: params[:email])
  end
end
