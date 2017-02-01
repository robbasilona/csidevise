include Geokit::Geocoders

class EvacCentersController < ApplicationController
  before_action :set_evac_center, only: [:show, :update, :destroy]

  # GET /evac_centers
  # GET /evac_centers.json
  def index
    @evac_centers = EvacCenter.all
    render json: @evac_centers
  end

  def rank
    src = EvacCenter.new(name: 'User', latitude: params[:lat], longitude: params[:lon])
    @evac_centers = EvacCenter.rank(src, params[:limit])
    render json: @evac_centers
  end

  def near
    render text: EvacCenter.get_result(params[:place])
  end

  # GET /evac_centers/1
  # GET /evac_centers/1.json
  def show
    render json: @evac_center
  end

  # POST /evac_centers
  # POST /evac_centers.json
  def create
    @evac_center = EvacCenter.new(evac_center_params)

    if @evac_center.save
      render :show, status: :created, location: @evac_center
    else
      render json: @evac_center.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /evac_centers/1
  # PATCH/PUT /evac_centers/1.json
  def update
    if @evac_center.update(evac_center_params)
      render :show, status: :ok, location: @evac_center
    else
      render json: @evac_center.errors, status: :unprocessable_entity
    end
  end

  # DELETE /evac_centers/1
  # DELETE /evac_centers/1.json
  def destroy
    @evac_center.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evac_center
      @evac_center = EvacCenter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def evac_center_params
      params.fetch(:evac_center, {}).permit(:name, :capacity, :quantity, :latitude, :longitude)
    end
end
