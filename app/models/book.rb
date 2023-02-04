class Book < ApplicationRecord
  validates :book_id, presence: true
  validates :shelf, presence: true
  validates :user_id, presence: true

  belongs_to :user
end
