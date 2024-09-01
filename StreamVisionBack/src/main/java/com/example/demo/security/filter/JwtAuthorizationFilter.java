package com.example.demo.security.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.model.entities.UserEntity;

import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthorizationFilter  extends OncePerRequestFilter{
	@Autowired
	private JwtUtils JwtUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private UserRepository userRep;

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, 
									@NonNull HttpServletResponse response, 
									@NonNull FilterChain filterChain) throws ServletException, IOException {
		String tokenHeader= request.getHeader("Authorization");
		boolean continueFilterChain = true;
		if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
			String token = tokenHeader.substring(7);

			if(JwtUtil.isTokenValid(token)) {
				String username = JwtUtil.getUsernameFromToken(token);
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				Optional<UserEntity> savedOptionalUser = userRep.findByUsername(username); 
				UserEntity savedUser = savedOptionalUser.get();
				if(!savedUser.isActive()) {
					continueFilterChain = false;
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    Map<String, Object> httpResponse = new HashMap<>();
                    httpResponse.put("Message", "User is not active");
                    response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
                    response.getWriter().flush();
				}
				else {
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());
					 
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				}
				
				
			}
			
		}
	    if (continueFilterChain) {
	        filterChain.doFilter(request, response);
	    }
	}
}
