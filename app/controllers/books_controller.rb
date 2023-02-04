require 'json'

class BooksController < ApplicationController
  # before_action :logged_in, only: [:create]
  # before_action :authorized_book_user, only: [:update, :destroy]

  BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

  def index
    search_value = search_params[:search]
    search_url = URI("#{BASE_URL}#{search_value}")
    search_response = helpers.fetch(search_url)

    adapted_response = helpers.adapt_books_response(search_response)

    render json: adapted_response[:response],status: adapted_response[:statusCode]
  end

  def create
    user = User.find_by_user_id(book_params[:userID])

    unless books_to_create.empty?
      new_books = user.books.create(books_to_create)

      if new_books
        render json: new_books
      else
        render json: new_books.errors
      end
    else
      render json: { message: 'No new books to create', status: 200 }
    end
  end

  # def update
  #   if book.update(book_params)
  #     render json: book
  #   else
  #     render json: book.errors
  #   end
  # end
  #
  # def destroy
  #   book.destroy
  #
  #   render json: {"status": "201"}
  # end

  private

  def search_params
    params.permit(:search, :books, :book, "books", "book")
  end

  def book_params
    params.require(:userID)
    params.require(:books)
    params.permit(:userID, books: [:book_id, :shelf, :user_id])
  end

  def books_to_create
    book_params[:books].reject { |book| Book.exists?(book_id: book[:book_id]) }
  end
end
