package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.UserDto;
import com.example.demo.model.dto.UserLoginDto;
import com.example.demo.model.dto.UserResponseDto;
import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.dao.UserDao;
import com.example.demo.service.UserDtoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@Tag(name = "Endpoint Usuarios")
public class UserRestController {

	@Autowired
	private UserDao userDao;
	@Autowired
	private UserDtoService userDtoService;

	@Operation(summary = "Inicio de sesion y creacion del token a traves de JWT")
	@GetMapping("/login")
	public void login(@RequestBody UserLoginDto user) {
	}
	
	
	@Operation(summary = "Creacion de un usuario")
	@PostMapping
	public ResponseEntity<?> createUser(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			Map<String, Object> responseContent = new HashMap<>();
			bindingResult.getFieldErrors()
					.forEach(fieldError -> responseContent.put(fieldError.getField(), fieldError.getDefaultMessage()));
			return new ResponseEntity<>(responseContent, HttpStatus.BAD_REQUEST);
		}
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserEntity createdUser = userDao.createUser(userDto);
			responseContent.put("result", createdUser);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Obtencion de los datos de un usuario a traves de la id. Solo administrador")
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{userId}")
	public ResponseEntity<?> searchUserById(@PathVariable Long userId) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserEntity savedUser = userDao.readUserById(userId);
			UserResponseDto userDto = userDtoService.createUserResponseDto(savedUser);
			responseContent.put("result", userDto);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Desactivacion de un usuario a traves de la id. Solo administrador")
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUserById(@PathVariable Long userId){
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserResponseDto deletedUser = userDao.deleteUserById(userId);
			responseContent.put("result", deletedUser);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Obtencion de los datos de todos los usuarios. Solo administrador")
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/all")
	public ResponseEntity<?> searchAllUsers(){
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			List<UserEntity> savedUsers = userDao.readAllUsers();
			List<UserResponseDto> userDtos = new ArrayList<>();
			for (int i = 0; i < savedUsers.size(); i++)
			{
				userDtos.add(userDtoService.createUserResponseDto(savedUsers.get(i)));
			}
			responseContent.put("result", userDtos);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Activacion de usuario a traves de la id. Solo administrador")
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/enable/{userId}")
	public ResponseEntity<?> enableUser(@RequestHeader("Authorization") String token,@PathVariable Long userId){
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserResponseDto savedUsers = userDao.enableUserById(userId);
			responseContent.put("result", savedUsers);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	
	@Operation(summary = "Obtencion de los datos de un usuario a traves del token")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> searchUserByToken(@RequestHeader("Authorization") String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserEntity user = userDao.readUserByToken(token);
			UserResponseDto userDto = userDtoService.createUserResponseDto(user);
			responseContent.put("result", userDto);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("messager", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}

	@Operation(summary = "Edicion de los datos de un usuario a traves del token")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updateUser(@Valid @RequestBody UserDto userDto, @RequestHeader("Authorization") String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserEntity updatedUser = userDao.updateUser(userDto, token);
			UserResponseDto updatedUserDto = userDtoService.createUserResponseDto(updatedUser);
			responseContent.put("result", updatedUserDto);
			httpStatus = HttpStatus.CREATED;
		} catch (Exception e) {
			responseContent.put("message", "Error while updating user: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}
	@Operation(summary = "Obtencion de la existencia de un usuario con unos datos concretos en el correo o username")
	@GetMapping("/{founded}")
	public ResponseEntity<?> getUser(@RequestBody String dato){
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		boolean founded;
		try {
			founded = userDao.readUserByUsernameOREmail(dato);
			responseContent.put("result", founded);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("messager", e.getMessage());
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}	
		
	@Operation(summary = "Desactivacion de un usuario a traves del token")
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			UserEntity deletedUser = userDao.deleteUserByToken(token);
			responseContent.put("message",
					"User " + deletedUser.getUsername() + " with id " + deletedUser.getId() + " has been deleted");
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while deleting user ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}

}