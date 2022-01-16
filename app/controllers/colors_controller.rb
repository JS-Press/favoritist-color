class ColorsController < ApplicationController
    def index 
        colors = Color.all
        render json: colors, include: :ratings, status: :ok
    end

    def show
        color = Color.find(params[:id])
          render json: color, status: :ok
      end

    def favorite
        colors = Color.all
        averages = colors.map { |color| 
           { name: color.name, average: color.ratings.map { |rating| rating.score }.inject(0.0) { |sum, el| sum + el } / color.ratings.size }
        }
        fav = averages.max_by do |element|
            element[:average]
        end
        render json: fav, status: :ok
    end

    def average 
        color = Color.find(params[:id])
        avg = color.ratings.map { |rating| rating.score }.inject(0.0) { |sum, el| sum + el } / color.ratings.size
        render json: avg, status: :ok
    end


end


#, include: :ratings