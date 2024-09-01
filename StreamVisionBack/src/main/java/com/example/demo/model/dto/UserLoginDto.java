package com.example.demo.model.dto;

import lombok.Builder;

@Builder
public record UserLoginDto (
	String username,
	String password
) {}
