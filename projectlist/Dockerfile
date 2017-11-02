FROM java:8-jre-alpine

COPY server/build/libs/projectlist-0.0.1-SNAPSHOT.jar /server.jar
COPY client/build /static

CMD ["java", "-jar", "/server.jar"]
