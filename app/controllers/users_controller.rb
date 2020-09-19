class UsersController < ApplicationController
  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

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

  private

  def user_params
    params.permit(:email, :username, :userID)
  end

  def user
    @user ||= User.find_by(email: params[:email])
  end

  def user_exists
    User.exists?(email: params[:email])
  end
end
