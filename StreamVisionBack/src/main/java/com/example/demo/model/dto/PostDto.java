package com.example.demo.model.dto;


import java.sql.Timestamp;

import lombok.Builder;

@Builder
public record PostDto (
		
		Long id,
		int localRating,
		String content,
		String postDate
) { }