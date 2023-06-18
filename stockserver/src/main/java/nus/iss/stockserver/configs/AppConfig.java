package nus.iss.stockserver.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
// import org.springframework.http.HttpMethod;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
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

    // @Bean
	// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	// 	http
	// 		.authorizeHttpRequests((requests) -> requests
	// 			.requestMatchers("/api/**","/**").permitAll()  //allow all access
    //             .requestMatchers(HttpMethod.POST, "**").permitAll()
	// 			.anyRequest().permitAll()
	// 		);

	// 	return http.build();


}
