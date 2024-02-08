class SessionsController < ApplicationController
  def create
    supabase_service = SupabaseService.new
    supabase_response = supabase_service.sign_in(session_params[:email], session_params[:password])

    if supabase_response.success?
      user_data = supabase_response.parsed_response['user']

      @user = User.find_by(email: user_data["email"])
      session[:user_uuid] = @user.uuid

      respond_to do |format|
        format.json { render json: @user, status: :created }
      end
    else
      @login_error = supabase_response.parsed_response['error_description'] || 'Invalid email or password'

      respond_to do |format|
        format.json { render json: @login_error, status: :unauthorized }
      end
    end
  end

  def destroy
    session[:user_uuid] = nil
    head :no_content
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
