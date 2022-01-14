class RatingsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_found_response

    def index 
        
        render json: Rating.all, status: :ok
    end


    def create 
        user = User.find_by(id: session[:user_id])  
        if user
            new_rating = Rating.new( rate_params )
            color = Color.find_by(name: params[:color])
            new_rating.color_id = color.id
            if new_rating.save
                render json: new_rating, status: :created
            else
                render json: { errors: new_rating.errors.full_messages }, status: :unprocessable_entity
            end
        else 
            puts "not in that session hash yo"
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
            rating = Rating.find_by(id: params[:id])
            rating.score = params[:score]
            if rating.save
                render json: rating, include: :user, status: :created
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
        params.permit( :score, :user_id )
    end

    def render_not_found_response 
        render json: { errors: 'not_found' }, status: :unauthorized
    end

end
