# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

pin = Pin.create(name: "UP Infirmary", classification: "hospital", latitude: "14.6598184", longitude: "121.0710435")
pin = Pin.create(name: "Mercury Drug", classification: "drugstore", latitude: "14.645578", longitude: "121.052709")
pin = Pin.create(name: "Bizfrend Pharmacy", classification: "drugstore", latitude: "14.644182", longitude: "121.064335")
pin = Pin.create(name: "UP Town Center", classification: "mall", latitude: "14.6508739", longitude: "121.075268")
pin = Pin.create(name: "UP Ayala Land Technohub", classification: "mall", latitude: "14.6573685", longitude: "121.0562461")
pin = Pin.create(name: "Puregold Jr", classification: "grocery", latitude: "14.645622", longitude: "121.053441")
pin = Pin.create(name: "Shopping Center", classification: "grocery", latitude: "14.659627", longitude: "121.0698509")
pin = Pin.create(name: "Ministop", classification: "grocery", latitude: "14.6465035", longitude: "121.0592415")
pin = Pin.create(name: "KNL Minimart", classification: "grocery", latitude: "14.646785", longitude: "121.063975")
pin = Pin.create(name: "Rustans", classification: "grocery", latitude: "14.642811", longitude: "121.074164")
pin = Pin.create(name: "Ministop", classification: "grocery", latitude: "14.632353", longitude: "121.07448")
pin = Pin.create(name: "7-11", classification: "grocery", latitude: "14.632383", longitude: "121.073988")

EvacCenter.create(name: "KNL Court", capacity: 1000, quantity: 235, latitude: "14.6441207", longitude: "121.052709")
EvacCenter.create(name: "UP CHK", capacity: 3000, quantity: 1625, latitude: "14.6592182", longitude: "121.0628019")
EvacCenter.create(name: "UP DMST", capacity: 300, quantity: 70, latitude: "14.6587981", longitude: "121.0642797")
EvacCenter.create(name: "UPIS", capacity: 800, quantity: 400, latitude: "14.6530735", longitude: "121.0735027")
EvacCenter.create(name: "Krus Na Ligas Covered Court", capacity: 1000, quantity: 235, latitude: "15.6441207", longitude: "121.052709")
EvacCenter.create(name: "Holy Family School", capacity: 2000, quantity: 900, latitude: "14.6466", longitude: "121.058998")
EvacCenter.create(name: "San Vicente E/S", capacity: 1200, quantity: 500, latitude: "14.653498", longitude: "121.0573")
EvacCenter.create(name: "Claret", capacity: 1800, quantity: 1400, latitude: "14.6470557", longitude: "121.055905")

supply = Supply.create(name: "Canned Goods", category: "Food")
supply = Supply.create(name: "Biscuits", category: "Food")
supply = Supply.create(name: "Bottled Water", category: "Food")
supply = Supply.create(name: "Antiseptic", category: "Medicine")
supply = Supply.create(name: "Paracetamol", category: "Medicine")
supply = Supply.create(name: "Bandage", category: "Medicine")
supply = Supply.create(name: "Battery", category: "Utility")
supply = Supply.create(name: "Flashlight", category: "Utility")
supply = Supply.create(name: "Pocket Knife", category: "Utility")
supply = Supply.create(name: "Rope", category: "Utility")

Pin.all.each do |pin|
  if pin.classification === 'hospital'
    pin.supplies << Supply.find(4)
    pin.supplies << Supply.find(5)
    pin.supplies << Supply.find(5)
  elsif pin.classification === 'drugstore'
    pin.supplies << Supply.find(1)
    pin.supplies << Supply.find(2)
    pin.supplies << Supply.find(3)
    pin.supplies << Supply.find(4)
    pin.supplies << Supply.find(5)
    pin.supplies << Supply.find(6)
  elsif pin.classification === 'grocery'
    pin.supplies << Supply.find(1)
    pin.supplies << Supply.find(2)
    pin.supplies << Supply.find(3)
    pin.supplies << Supply.find(4)
    pin.supplies << Supply.find(7)
  elsif pin.classification === 'mall'
    pin.supplies << Supply.find(1)
    pin.supplies << Supply.find(2)
    pin.supplies << Supply.find(3)
    pin.supplies << Supply.find(4)
    pin.supplies << Supply.find(5)
    pin.supplies << Supply.find(6)
    pin.supplies << Supply.find(7)
    pin.supplies << Supply.find(8)
    pin.supplies << Supply.find(9)
    pin.supplies << Supply.find(10)
  end
end



Stock.find(1).update_attributes(quantity: "100")
Stock.find(2).update_attributes(quantity: "90")
Stock.find(3).update_attributes(quantity: "80")
Stock.find(4).update_attributes(quantity: "70")
Stock.find(5).update_attributes(quantity: "60")
Stock.find(6).update_attributes(quantity: "50")
Stock.find(7).update_attributes(quantity: "40")
