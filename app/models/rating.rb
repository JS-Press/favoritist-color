class Rating < ApplicationRecord
    validates :score, presence: true, length: {minimum: 1,  maximum: 6}
    belongs_to :color
    belongs_to :user
end
