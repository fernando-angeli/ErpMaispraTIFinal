# Usando a imagem do OpenJDK como base
FROM openjdk:17-jdk-slim

# Diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo JAR da aplicação para dentro do container
COPY target/api_erpMaisPraTi.jar app.jar

# Expor a porta da aplicação
EXPOSE 8080

# Comando para rodar a aplicação Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]