require 'json'

class BooksController < ApplicationController
  before_action :authenticate_user!
  # before_action :authorized_book_user, only: [:update, :destroy]

  def index
    puts search_params[:search]
    books_service = BooksService.new
    search_response = books_service.search_books(search_params[:search])
    puts search_response

    adapted_response = helpers.adapt_books_response(search_response)

    render json: adapted_response[:response], status: adapted_response[:statusCode]
  end

  def create
    unless books_to_create.empty?
      new_books = @current_user.books.create(books_to_create)

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
    params.permit(:search, :book)
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
