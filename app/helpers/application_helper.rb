require 'json'

module ApplicationHelper
  def fetch(url)
    JSON.parse(Net::HTTP.get(url))
  end

  def error_response(message, code)
    JSON.generate({
      "response": {
        "message": message,
      },
      "statusCode": code
    })
  end
end
