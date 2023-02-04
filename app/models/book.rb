class Book < ApplicationRecord
  validates :bookID, presence: true
  validates :shelf, presence: true

  belongs_to :user
end
