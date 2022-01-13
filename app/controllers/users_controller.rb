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
      Rating.create(user_id: user.id, color_id: user.color_id, score: 6)
      render json: user, status: :created
      else
        puts 'noooooo'
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
end

def show
    render json: User.find(params[:id]), status: :ok
end

  private 

def user_params 
    params.permit( :name, :password_digest, :color_id )
end
  
def render_not_found_response 
    render json: { errors: 'not_found' }, status: :unauthorized
end

end
