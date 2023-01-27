class BooksController < ApplicationController
  BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

  def index
    search_value = search_params[:search]
    search_url = URI("#{BASE_URL}#{search_value}")
    search_response = helpers.fetch(search_url)

    adapted_response = helpers.adapt_books_response(search_response)
    puts adapted_response
    render json: adapted_response[:response],status: adapted_response[:statusCode]
  end

  def show
  end

  private

  def search_params
    params.permit(:search)
  end
end
