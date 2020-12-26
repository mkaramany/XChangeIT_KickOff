package com.projectx.xchangeit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.projectx.xchangeit.security.RestAuthenticationEntryPoint;
import com.projectx.xchangeit.security.TokenAuthenticationFilter;
import com.projectx.xchangeit.security.oauth2.CustomOAuth2UserService;
import com.projectx.xchangeit.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.projectx.xchangeit.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.projectx.xchangeit.security.oauth2.OAuth2AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService xChangeItUserDetailsService;

//	@Autowired
//	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

	@Autowired
	private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
	
	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;
	
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

	/*
	 * By default, Spring OAuth2 uses
	 * HttpSessionOAuth2AuthorizationRequestRepository to save the authorization
	 * request. But, since our service is stateless, we can't save it in the
	 * session. We'll save the request in a Base64 encoded cookie instead.
	 */
	@Bean
	public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
		return new HttpCookieOAuth2AuthorizationRequestRepository();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(xChangeItUserDetailsService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http
         .cors()
             .and()
         .sessionManagement()
             .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
             .and()
         .csrf()
             .disable()
         .formLogin()
             .disable()
         .httpBasic()
             .disable()
         .exceptionHandling()
             .authenticationEntryPoint(new RestAuthenticationEntryPoint())
             .and()
         .authorizeRequests()
             .antMatchers("/authenticate")
                 .permitAll()
             .antMatchers("/items/permitAll/**")
                 .permitAll()
             .antMatchers("/auth/**","/authenticate","/verify", "/signUp", "/users", "/oauth2/**")
                 .permitAll()
				.antMatchers("/admin/**").hasRole("ADMIN")
             .anyRequest()
                 .authenticated()
             .and()
         .oauth2Login()
             .authorizationEndpoint()
                 .baseUri("/oauth2/authorize")
                 .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                 .and()
             .redirectionEndpoint()
                 .baseUri("/oauth2/callback/*")
                 .and()
             .userInfoEndpoint()
                 .userService(customOAuth2UserService)
                 .and()
             .successHandler(oAuth2AuthenticationSuccessHandler)
             .failureHandler(oAuth2AuthenticationFailureHandler);
		http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}

}
