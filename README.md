# RefuGeo
## up-csi x DevCon-Devise
RefuGeo is an application that aims to help people manage their resources, promote effective people relocation by providing evacuation recommendations, and provide insights with regards to disaster preparedness and public safety.

DevCon Devise 2016

UP CSI: Rob, Vince, Joseph, Sean

Before you proceed: make sure you already installed *rbenv* and *nvm*. Refer to our [stash](https://gitlab.com/up-csi/dev-resources/blob/master/learn_ruby_on_rails.md) if you didn't installed them yet and get resources for tutorials.

### Install Rails 5 and Ionic
```
rbenv install 2.3.0
gem install bundler
gem install rails
```

### RailsAPI Setup
```
git pull origin master
cd csidevise/railsapi
bundle install
sudo service postgresql start
sudo -su postgres psql #to start psql cli
CREATE ROLE csidevise WITH LOGIN CREATEDB PASSWORD 'csidevise';
\q #to quit psql
bundle exec rails db:create db:migrate db:seed
bundle exec rails s
```

Might need to execute *bundle install* and *bundle exec rails db:reset* if there are changes in Gemfile and seeds.rb.

### Ionic Setup
```
#no need to change working directory
nvm install stable
nvm use stable
npm install -g cordova ionic
cd csidevise/mobile
npm install
ionic plugin add cordova-plugin-geolocation
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAnesP8EwTMBecjSmPBzeMp1hP3sG3IPgE" --variable API_KEY_FOR_IOS="AIzaSyAnesP8EwTMBecjSmPBzeMp1hP3sG3IPgE"
ionic plugin add cordova-plugin-inappbrowser
npm install @types/google-maps
cordova telemetry on
ionic serve
```

Might need to execute *npm install* to install other packages.

### Some API credentials
Rails Deployed App
```
https://fast-cove-98117.herokuapp.com/
```

Node Messenger App
```
https://pacific-everglades-10344.herokuapp.com/
```

Google Maps API keys
```
AIzaSyAnesP8EwTMBecjSmPBzeMp1hP3sG3IPgE
AIzaSyDwCB5OuH2bl37BlHL9hyCWmN9tmobombo
AIzaSyCX0aSEKjuihv_6GTOVQ4ZMpPX4I_XxMrY
```
Chikka API
```
shortcode: 29290469148
clientID: f3be0f5b7d2abc0ce6fc0dccf7ecc049272af5679fbf5a547429cbaddb0391ff
secret: 757f94e11c41b07a8eb846c20ad1db7fcb98b07a57b85ebe7092c3e4c457f87b
```

### Test Cases
**Application Services: Resource Locator, Evacuation Recommender, Graphical Representation of Trends**
Install necessary dependencies (see instructions above)

*Messaging Services* (via Chikka Messenger API x Your Phone's Messaging App) - Evacuation Recommender
Send your current location as message content and send message to 29290469148
You can try the following: 'Krus na Ligas', 'University of the Philippines Diliman Palma Hall'

*Facebook Messenger Services* (via Facebook Messenger Bot x Your FB Messenger app) - Evacuation Recommender
Message RefuGeo via Facebook (https://facebook.com/refugeo) with your current location.
You can try the following: 'Marikina City', 'Miriam College'

*Development Status*: Currently, only evacuations near UP Diliman have been encoded.
