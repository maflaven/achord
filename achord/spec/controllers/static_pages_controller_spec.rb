require 'rails_helper'

RSpec.describe StaticPagesController, type: :controller do
  describe "GET #root" do
    it "renders the root page" do
      # this line simulates a "GET" request to the LinksController that hits the #new method, passing in `{link: {}}` as params.
      get :root, params: {}, flash: {}

      # here we check to make sure that the response renders back the new template
      expect(response).to render_template("root")
      expect(response).to have_http_status(200)
    end
  end
end
