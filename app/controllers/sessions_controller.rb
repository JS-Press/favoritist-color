class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_not_found_response
  # rescue_from BCrypt::Errors::InvalidHash, with: :render_not_found_response

  def create
    user = User.find_by(name: params[:name])
    # byebug
    if user && user.password === params[:password]
      session[:user_id] ||= user.id
      render json: user, status: :ok
    else
      errors = [" invalid username or password "]
      render json: { errors: errors}, status: :unauthorized
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, include: :ratings, status: :created
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def destroy
    session.clear
    # user = User.find_by(id: session[:user_id])  
    #   if user
    #     session.delete :user_id
    #     head :no_content
    #   else 
    #     render json: { errors: [ 1 , 2 ] }, status: :unauthorized
    #   end
  end

  private 

def render_not_found_response 
  render json: { errors: 'user or password invalid' }, status: :unauthorized
end

end
