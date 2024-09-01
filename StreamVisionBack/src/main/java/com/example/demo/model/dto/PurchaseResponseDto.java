package com.example.demo.model.dto;

import lombok.Builder;

@Builder
public record PurchaseResponseDto (
		
		String username,
		String title,
		boolean purchased
		
) { }