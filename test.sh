#!/bin/bash

# Enable IPV4 on Virtual Wall
echo "Init IPv4..."
wget -O - -q https://www.wall2.ilabt.iminds.be/enable-nat.sh | sudo bash

echo "Cloning repo..."
if [ ! -d "live-open-data-benchmark-experiment1-client" ]; then
    git clone https://github.com/DylanVanAssche/live-open-data-benchmark-experiment1-client
fi
cd live-open-data-benchmark-experiment1-client
git pull

echo "Install NodeJS and NPM..."
sudo apt update
sudo apt install -y nodejs npm
npm install

# Mode selection
export MODE=polling # HTTP polling
#export MODE=pubsub # SSE

# Spawn clients
echo "Spawning 100 processes"
for i in {1..100} ;
do
    ( node client.js > /dev/null 2>&1 & ); 
done

# End
echo "DONE!"
