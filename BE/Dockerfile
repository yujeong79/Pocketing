# 1. Base image
FROM openjdk:17-jdk-slim

# 2. Work directory
VOLUME /tmp

# 3. 복사할 jar 파일
COPY build/libs/pocketing-0.0.1-SNAPSHOT.jar app.jar

# 4. 실행 명령어
ENTRYPOINT ["java","-jar","/app.jar"]
