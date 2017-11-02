FROM java:8-jre-alpine

COPY server/build/libs/reports-0.0.1-SNAPSHOT.jar /server.jar
COPY client/build /static

CMD ["java", "-jar", "/server.jar"]
