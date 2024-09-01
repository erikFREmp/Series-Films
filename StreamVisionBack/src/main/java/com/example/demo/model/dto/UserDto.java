package com.example.demo.model.dto;


import jakarta.validation.constraints.Pattern;
import lombok.Builder;


@Builder
public record UserDto (
	String username,
	
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message="Password must be 8 characters long and contain a lower case letter, an upper case letter and a number")	
	String password,
	String email,
	String language
) {}
