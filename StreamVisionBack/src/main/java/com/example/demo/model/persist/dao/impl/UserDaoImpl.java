package com.example.demo.model.persist.dao.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entities.ERole;
import com.example.demo.model.entities.RoleEntity;
import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.dao.UserDao;
import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;

import jakarta.validation.Valid;

@Service
public class UserDaoImpl implements UserDao {

	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
    private UserRepository userRep;
	
	@Autowired
	private JwtUtils jwtUtils;
    
    @Override
    public UserEntity createUser(UserDto userDto) {
    	
        RoleEntity role = RoleEntity.builder()
                .name(ERole.valueOf("USER"))
                .build();
        
        Set<RoleEntity> roles = new HashSet<>();
        roles.add(role);
        
        UserEntity user = UserEntity.builder()
                .username(userDto.username())
                .password(passwordEncoder.encode(userDto.password()))
                .email(userDto.email())
                .coins(100)
                .active(true)
                .language("es")
                .roles(roles)
                .build();
        
        UserEntity createdUser = userRep.save(user);
        return createdUser;
    }
    
    @Override
    public UserEntity readUserByToken(String token) {
    	token= token.substring(7);
    	Long id = jwtUtils.getUserIdFromToken(token);
        UserEntity user = userRep.findById(id)
        		.orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
        
        return user;
    }
    
    @Override
    public UserEntity readUserById(Long userId) {
    	UserEntity user = userRep.findById(userId)
        		.orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
        return user;
    }

    @Override
    public UserEntity deleteUserByToken(String token) {
    	token= token.substring(7);
    	Long userId = jwtUtils.getUserIdFromToken(token);
    	UserEntity savedUser = userRep.findById(userId).orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
    	savedUser.setActive(false);
    	return userRep.save(savedUser);
    }

    @Override
    public UserResponseDto deleteUserById(Long userId) {
    	UserEntity savedUser = userRep.findById(userId).orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
    	savedUser.setActive(false);
    	UserResponseDto savedUserResponseDto = UserResponseDto.builder()
    			.id(savedUser.getId())
    			.username(savedUser.getUsername())
    			.email(savedUser.getEmail())
    			.coins(savedUser.getCoins())
    			.language(savedUser.getLanguage())
    			.active(savedUser.isActive())
    			.build();
    	userRep.save(savedUser);
    	return savedUserResponseDto;
    }
    
    @Override
    public UserResponseDto enableUserById(long userId) {
    	UserEntity savedUser = userRep.findById(userId).orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));
    	savedUser.setActive(true);
    	UserResponseDto savedUserResponseDto = UserResponseDto.builder()
    			.id(savedUser.getId())
    			.username(savedUser.getUsername())
    			.email(savedUser.getEmail())
    			.coins(savedUser.getCoins())
    			.language(savedUser.getLanguage())
    			.active(savedUser.isActive())
    			.build();
    	userRep.save(savedUser);
    	return savedUserResponseDto;
    	
    }
    
 
    @Override
    public List<UserEntity> readAllUsers() {
        List<UserEntity> savedUsers = userRep.findAll();
        List<UserEntity> normalUsers = new ArrayList<>();
        
        for (UserEntity user : savedUsers) {
            Set<RoleEntity> roles = user.getRoles();
            for (RoleEntity role : roles) {
                if (role.getName() != ERole.ADMIN) {
                	normalUsers.add(user);
                    break; // No need to continue checking roles once ADMIN role is found
                }
            }
        }
        
        return normalUsers;
    }
    
    @Override
    public UserEntity updateUser(UserDto userDto, String token) {
    	token = token.substring(7);
    	String password;
    	String email;
    	String language;
    	Long userId = jwtUtils.getUserIdFromToken(token);
        UserEntity savedUser = userRep.findById(userId)
        		.orElseThrow( () -> new AppException("Could not find original user", HttpStatus.NOT_FOUND));
        if(userDto.email() == null)
        	email = savedUser.getEmail();
        else
        	email = userDto.email();
        if (userDto.password() == null)
        	password = savedUser.getPassword();
        else
        	password = passwordEncoder.encode(userDto.password());
        if (userDto.language() == null)
        	language = savedUser.getLanguage();
        else
        	language = userDto.language();
        	
        savedUser = UserEntity.builder()
        		.id(savedUser.getId())
        		.username(savedUser.getUsername())
                .password(password)
                .email(email)
                .coins(savedUser.getCoins())
                .language(language)
                .active(savedUser.isActive())
                .roles(savedUser.getRoles())
                .build();
        
        
        UserEntity updatedUser = userRep.save(savedUser);
        return updatedUser;
    }
    public boolean readUserByUsernameOREmail(String string) {
    	Optional<UserEntity> savedUser = userRep.findByUsername(string);
    	if (savedUser.isEmpty() || !savedUser.isPresent()) 
    		savedUser= userRep.findByEmail(string);	
    	
    	return savedUser.isPresent();
    }	

}