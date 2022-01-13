class User < ApplicationRecord
    # validates :name, presence: true
    # has_secure_password
    belongs_to :color
    has_many :ratings
end
