class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  validates :user_id, presence: true, uniqueness: true
  validates :username, presence: true
  validates :avatar, presence: true

  has_many :books
end
