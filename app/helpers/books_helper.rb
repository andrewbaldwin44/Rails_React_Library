module BooksHelper
  BOOK_FIELDS_SELECTION = [
    'title',
    'authors',
    'published_date',
    'description',
    'imageLinks',
    'categories'
  ]

  private

  def safe_format_list(list)
    if list then list.join(", ") else "" end
  end

  public

  def adapt_books_response(search_response)
    if search_response[:error] && search_response[:error][:code] > 400
      return helpers.error_response(search_response[:error][:code], search_response[:error][:message])
    end

    adapted_response = search_response["items"].map do |book|
      volume_info = book["volumeInfo"]
      short_description = if book["searchInfo"] then book["searchInfo"]["textSnippet"] else "" end

      adapted_volume_info = volume_info
        .select { |book_field, book_data| BOOK_FIELDS_SELECTION.include?(book_field) }
        .merge({
          "id": book["id"],
          "shortDescription": short_description,
          "authors": safe_format_list(volume_info["authors"]),
          "categories": safe_format_list(volume_info["categories"])
        })

      adapted_volume_info
    end

    {response: {"result": adapted_response}, "statusCode": 200}
  end
end
