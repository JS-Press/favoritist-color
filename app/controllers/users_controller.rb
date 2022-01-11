class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_found_response

def index 
        users = User.all
        render json: users, include: :ratings, status: :created
end

def create 
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
end

def show
    render json: User.find(params[:id]), status: :ok
end

  private 

def user_params 
    params.permit( :username, :password_digest )
end
  
def render_not_found_response 
    render json: { errors: 'not_found' }, status: :unauthorized
end

end
