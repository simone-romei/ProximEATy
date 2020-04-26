# Structure

The project code is structured in two main folder:
- [ng-sm] Adaptive Framework: based on Angular technologies.
- [docker-sm] Adaptive Infrastructure: based on Solr technologies.

## Install Adaptive Framework

Required Tools:
```
ng --version
Angular CLI: 9.0.4
Node: 12.4.0
OS: linux x64
```

Enter in the angular project folder:
```
cd ng-sm
```

Serve a local version of the project:
```
ng serve
```

Connect to "http://localhost:4200/":
```
ng serve

chunk {main} main.js, main.js.map (main) 2.83 MB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 140 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
chunk {scripts} scripts.js, scripts.js.map (scripts) 139 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 918 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 4.19 MB [initial] [rendered]
Date: 2020-04-26T19:00:32.845Z - Hash: 10a7dbd8a0ee674d3a9f - Time: 13245ms
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
: Compiled successfully.
```

Stop the local version:
```
./kill.sh
```

## Install Adaptive Infrastructure [DRAFT]

Required Tools:
```
docker-compose -v
docker-compose version 1.21.0, build unknown
```

Enter in the docker-compose folder:
```
cd docker-sm
cd dev
```

Build the docker infrastructure:
```
sudo docker-compose up
```

Stop the infrastructure:
```
sudo docker-compose down
```
