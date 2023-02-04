class User < ApplicationRecord
  validates :email, presence: true
  validates :userID, presence: true
  
  has_many :books
end
