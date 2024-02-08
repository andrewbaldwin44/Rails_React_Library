class UsersController < ApplicationController
    before_action :validate_profile_picture, only: [:create]
  
    # POST /users or /users.json
    def create
      profile_picture = user_params[:profile_picture]
  
      supabase_service = SupabaseService.new
  
      supabase_response = supabase_service.sign_up(user_params[:email], user_params[:password])

      new_user_params = {
        email: user_params[:email],
        display_name: user_params[:display_name],
        uuid: supabase_response.parsed_response["user"]["id"],
      }
  
      if supabase_response.success?
        @user = User.new(new_user_params)
  
        respond_to do |format|
          if @user.save
            session[:user_uuid] = @user.uuid
  
            if profile_picture
              profile_picture_public_url = supabase_service.upload_image(profile_picture, user_params[:username])
              @user.update({profile_picture: profile_picture_public_url})
            end
  
            format.json { render json: @user, status: :created }
          else
            format.json { render json: @user.errors, status: :unprocessable_entity }
          end
        end
      else
        @login_error = supabase_response.parsed_response["msg"] || "Something went wrong. Please try again."
  
        respond_to do |format|
          format.json { render json: {"message": @login_error}, status: :unauthorized }
        end
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:display_name, :password, :email, :profile_picture)
    end
  
    def validate_profile_picture
      allowed_content_types = ['image/jpeg', 'image/png']
  
      if user_params.key?(:profile_picture) && allowed_content_types.exclude?(user_params[:profile_picture].content_type)
        @login_error = 'Invalid file format. Please upload a valid image.'
  
        respond_to do |format|
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @login_error, status: :unprocessable_entity }
        end
      end
    end     
end
