class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    return nil if session[:session_token].nil?

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login!
    @current_user = user

    session[:session_token] = user.session_token
  end

  def logout!
    current_user.try(:reset_session_token!)

    session[:session_token] = nil
  end

  def require_current_user!
    unless logged_in?
      render text: "You need to be logged in to do that.", status: 403
      return
    end
  end
end
