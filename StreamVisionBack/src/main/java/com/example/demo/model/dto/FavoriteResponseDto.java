package com.example.demo.model.dto;

import lombok.Builder;

@Builder
public record FavoriteResponseDto (
		
		String username,
		String title,
		boolean saved
		
) { }
