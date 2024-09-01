package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.UserTokenDto;
import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;

@Service
public class UserService {
	@Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtils jwtUtils;

    public List<UserTokenDto> getAllUserTokens() {
        List<UserTokenDto> userTokens = new ArrayList<>();
        List<UserEntity> users = userRepository.findAll();
        
        for (UserEntity user : users) {
            String token = jwtUtils.generateAccessToken(user.getUsername(), user.getId(), user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()),user.getLanguage());
            UserTokenDto userTokenDTO = new UserTokenDto(user.getUsername(), token);
            userTokens.add(userTokenDTO);
        }
        
        return userTokens;
    }
}
