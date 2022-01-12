class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_not_found_response

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      errors = [" user does not exist "]
      render json: { errors: errors}, status: :unauthorized
    end
  end

  def destroy
    user = User.find_by(id: session[:user_id])  
      if user
        session.delete :user_id
        head :no_content
      else 
        render json: { errors: [ 1 , 2 ] }, status: :unauthorized
      end
  end

  private 

def render_not_found_response 
  render json: { errors: 'not_found' }, status: :unauthorized
end

end
