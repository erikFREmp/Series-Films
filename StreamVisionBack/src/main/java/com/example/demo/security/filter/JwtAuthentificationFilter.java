package com.example.demo.security.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthentificationFilter extends UsernamePasswordAuthenticationFilter{
	private JwtUtils jwtutils;
	
	private UserRepository userRepository;
	
	public JwtAuthentificationFilter(JwtUtils Jwtutils, UserRepository userRepository) {
		this.jwtutils = Jwtutils;
		this.userRepository = userRepository;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
												HttpServletResponse response) throws AuthenticationException {
		UserEntity userEntity =null;
		String username = "";
		String password= "";
		
		try {
			userEntity = new ObjectMapper().readValue(request.getInputStream(), UserEntity.class);
			username = userEntity.getUsername();
			password = userEntity.getPassword();
		} catch (StreamReadException e) {
			throw new RuntimeException(e);
		} catch (DatabindException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
	
		
		return getAuthenticationManager().authenticate(authenticationToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, 
	                                        HttpServletResponse response, 
	                                        FilterChain chain,
	                                        Authentication authResult) throws IOException, ServletException {

	    User user = (User) authResult.getPrincipal();
	    Optional<UserEntity> userEntityOptional = userRepository.findByUsername(user.getUsername());

	    Map<String, Object> httpResponse = new HashMap<>();
	    response.setContentType(MediaType.APPLICATION_JSON_VALUE);

	    if (userEntityOptional.isPresent()) {
	        UserEntity userEntity = userEntityOptional.get();

	        if (userEntity.isActive()) {
	        	String token = jwtutils.generateAccessToken(userEntity.getUsername(), userEntity.getId(), userEntity.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()),userEntity.getLanguage());
	            response.addHeader("Authorization", token);
	            httpResponse.put("token", token);
	            httpResponse.put("Message", "Authentication successful");
	            httpResponse.put("Username", user.getUsername());
	            response.setStatus(HttpStatus.OK.value());
	        } else {
	            httpResponse.put("Message", "User is not active and can not log in");
	            response.setStatus(HttpStatus.FORBIDDEN.value());
	        }
	    } else {
	        httpResponse.put("Message", "User not found");
	        response.setStatus(HttpStatus.UNAUTHORIZED.value());
	    }

	    response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
	    response.getWriter().flush();
	    super.successfulAuthentication(request, response, chain, authResult);
	}
}
