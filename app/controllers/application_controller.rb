class ApplicationController < ActionController::Base
  def logged_in
    unless user
      return false
    end
  end
end
