class User < ApplicationRecord
    # has_secure_password
    # validates :name, presence: true
    # validates :password, presence: true
    belongs_to :color
    has_many :ratings
end
