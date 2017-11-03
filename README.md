# mean-example

Run mongo by `docker run -d -p 27017:27017 --name mongodb mongo`

build docker image by `docker build -t kevinkoolwhip/nodeapp .`

push to docker repo by `docker push kevinkoolwhip/nodeapp`

Run docker image by `docker run -p 8081:8081 -d --name nodeApp --link mongodb:mongo kevinkoolwhip/nodeapp`