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
    if books_exist
      render json: books
    else
      new_books = Book.create!(book_params["books"])

      if new_books
        render json: new_books
      else
        render json: new_books.errors
      end
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
    params.permit("books", "book", "user", :books, :book)
  end

  def books
    books_to_add = params["books"].reject { |book| Book.exists?(book["id"]) }.map { |book| book[:id] }

    @books ||= Book.find_all(books_to_add)
  end

  def books_exist
    params["books"].all? { |book|
      Book.exists?(bookID: book["id"])
    }
  end
end
