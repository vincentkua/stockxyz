package nus.iss.stockserver.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import org.springframework.http.HttpMethod;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Value("${mongo.url}")
    private String mongoUrl;

    @Bean
    public MongoTemplate createMongoTemplate() {
        MongoClient client = MongoClients.create(mongoUrl);
        return new MongoTemplate(client, "stockdb");
    }

    // @Bean
    // public WebMvcConfigurer configureCors() {
    // return new WebMvcConfigurer() {
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    // registry.addMapping("/api/**").allowedOrigins("*");
    // }
    // };
    // }

    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
            .csrf(csrf -> csrf.disable())
			.authorizeHttpRequests((requests) -> requests
				.requestMatchers("/api/**","**").permitAll()  //allow home page and all api access
				.anyRequest().authenticated()
			);
            

		return http.build();
    }
}
