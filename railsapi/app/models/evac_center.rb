include Geokit::Geocoders

class EvacCenter < ApplicationRecord
	acts_as_mappable :default_units => :kms, :default_formula => :sphere, :lat_column_name => :latitude, :lng_column_name => :longitude

  def score(src)
		self.dist = self.distance_to(src, :units => :kms).round(2)
		self.save
		per = self.quantity.to_f / self.capacity.to_f
		dist + per * dist
  end

	def self.rank(src)
		temp = self.all.sort { |x, y| x.score(src) <=> y.score(src) }
		temp[0..9]
	end

	def self.get_result(msg)
		loc = GoogleGeocoder.geocode(msg)
		src = EvacCenter.new(latitude: loc.lat, longitude: loc.lng, name: 'User')
		results =  EvacCenter.within(20, :origin=>[loc.lat, loc.lng]).sort { |x, y| x.score(src) <=> y.score(src) }
		response = 'We recommend you to take shelter on these areas: '
		if results == []
			response = "Sorry, we can't find any suitable location near you. Please contact your local government units. "
		else
			results[0..4].each do |res|
				response += res.name + ':' + res.quantity.to_s + '/' + res.capacity.to_s + ' - '
			end
		end
		response += 'Keep safe! RefuGeo'
	end
end
