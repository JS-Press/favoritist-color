class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true, length: {minimum: 2,  maximum: 12}
    has_secure_password
    belongs_to :color
    has_many :ratings
end
