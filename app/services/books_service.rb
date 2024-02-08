class BooksService
    include HTTParty
  
    def initialize
        @base_url = Rails.application.credentials.BOOKS_API_URL
    end
  
    def search_books(search_value)
        self.class.get(
            "#{@base_url}#{search_value}",
        )
    end
  end
  