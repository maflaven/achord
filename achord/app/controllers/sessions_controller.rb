class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(session_params)

    if @user.nil?
      render json: "Invalid username and/or password", status: :unprocessable_entity
    else
      login!(@user)
      render json: @user.id
    end
  end

  def destroy
    logout!
    render json: "Successfully logged out"
  end

  private

  def session_params
    params.require(:user).permit(:username, :password)
  end
end
