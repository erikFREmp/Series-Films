package com.example.demo.model.persist.dao;

import java.util.List;

import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entities.UserEntity;

public interface UserDao {

	public UserEntity createUser(UserDto userDto);
	
	public UserEntity readUserByToken(String token);

	public UserEntity deleteUserByToken(String token);
	
	public UserResponseDto deleteUserById(Long id);

	UserEntity updateUser(UserDto userDto, String token);
	
	public UserEntity readUserById(Long userId);
	
	public List<UserEntity> readAllUsers();
	
	public boolean readUserByUsernameOREmail(String string);
	
	public UserResponseDto enableUserById(long userId);

}
