class Board < ActiveRecord::Base
	validates :name,  :presence => true
end
