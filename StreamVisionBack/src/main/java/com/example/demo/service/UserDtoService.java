package com.example.demo.service;
 
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entities.UserEntity;
 
@Service
public class UserDtoService {
 
	public UserResponseDto createUserResponseDto(UserEntity user) {
		UserResponseDto userDto = UserResponseDto.builder()
				.id(user.getId())
				.username(user.getUsername())
				.email(user.getEmail())
				.coins(user.getCoins())
				.language(user.getLanguage())
				.active(user.isActive())
				.build();
		return userDto;
	}
}