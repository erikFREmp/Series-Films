package com.example.demo.model.dto;
 
import lombok.Builder;
 
@Builder
public record UserResponseDto(
		
		Long id,
		String username,
		String email,
		int coins,
		boolean active,
		String language
		
) { }