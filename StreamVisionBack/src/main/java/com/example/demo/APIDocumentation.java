package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class APIDocumentation {
	@Value("${proyecto.openapi.dev-url}")
    private String devUrl;



@Bean
public OpenAPI myOpenAPI() {
      Server devServer = new Server();
      devServer.setUrl(devUrl);
      devServer.setDescription("Server URL in Development environment");

    


      License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

      Info info = new Info()
          .title("API REST STREAMVISION")
          .version("1.0")
          .license(mitLicense);

      return new OpenAPI().info(info).servers(List.of(devServer));
    }
}
