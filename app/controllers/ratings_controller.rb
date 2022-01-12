class RatingsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_found_response

    def index 
        byebug
        render json: Rating.all, status: :ok
    end


    def create 
        user = User.find_by(id: session[:user_id])  
        if user
            new_rating = Rating.new( rate_params )
            new_rating.user_id = user.id
            if new_rating.save
                render json: new_ratings, status: :created
            else
                render json: { errors: new_rating.errors.full_messages }, status: :unprocessable_entity
            end
        else 
            render json: { errors: ["must login"] }, status: :unauthorized
        end
    end


    def show 
        rating = Rating.find( params[:id] )
        if rating
            render json: rating, status: :created
        else
            render json: {errors: "rating does not exist."}, status: :unprocessable_entity
        end
    end


    def update 
        user = User.find_by(id: session[:user_id])  
        if user
            updated_rating = Rating.update( rate_params )
            if updated_rating.save
                render json: updated_rating, status: :created
            else
                render json: { errors: updated_rating.errors.full_messages }, status: :unprocessable_entity
            end
        else 
            render json: { errors: ["must login"] }, status: :unauthorized
        end
    end


    def delete 
        user = User.find_by(id: session[:user_id])  
        if user
            Rating.destroy( params[:id] )
            head :no_content
         else 
            render json: { errors: [ 1 , 2 ] }, status: :unauthorized
      end
    end


    private 

    def rate_params
        params.permit( :score, :color_id )
    end

    def render_not_found_response 
        render json: { errors: 'not_found' }, status: :unauthorized
    end

end
