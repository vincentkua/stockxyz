// package nus.iss.stockserver.configs;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// public class SecurityConfig {
    
//     @Bean
// 	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// 		http
// 			.authorizeHttpRequests((requests) -> requests
// 				.requestMatchers("/api/**","/").permitAll()  //allow all access from /api
// 				.anyRequest().authenticated()
// 			);

// 		return http.build();
// 	}
    
// }
