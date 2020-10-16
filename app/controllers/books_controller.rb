class BooksController < ApplicationController
  BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q='

  def index
    search_value = search_params[:search]
    search_url = URI("https://www.googleapis.com/books/v1/volumes?q=#{search_value}")
    search_data = Net::HTTP.get(search_url)

    render json: search_data
  end

  def show
  end

  private

  def search_params
    params.permit(:search)
  end
end
