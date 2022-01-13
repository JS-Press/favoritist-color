class ColorsController < ApplicationController
    def index 
        colors = Color.all
        render json: colors, include: :ratings, status: :ok
    end

    def favorite
        colors = Color.all
        # colors.each { |c| puts c.ratings}
        byebug
    end


end


#, include: :ratings