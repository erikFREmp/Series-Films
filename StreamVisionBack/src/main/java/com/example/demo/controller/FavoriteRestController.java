package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.FavoriteResponseDto;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.entities.Favorite;
import com.example.demo.model.entities.Product;
import com.example.demo.model.persist.dao.FavoriteDao;
import com.example.demo.service.InteractionDtoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/favorites")
@Tag(name="Endpoint favoritos")
public class FavoriteRestController {

	@Autowired
	private FavoriteDao favoriteDao;
	
	@Autowired
	private InteractionDtoService favoriteDtoService;

	// SAVE UNSAVE
	@Operation(summary = "Manejo de favoritos a traves del token", description = "El endpoint permite añadir o eliminar favoritos.'SAVE' para añadir y 'UNSAVE' para eliminar")
	@PostMapping(path = "/{action}", 
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> favoriteInteractionHandler(@RequestBody InteractionDto interactDto, @RequestHeader("Authorization") String token, @PathVariable String action) {

		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;

		try {
			Favorite updatedFavorite = favoriteDao.updateFavorite(interactDto, token, action);
			FavoriteResponseDto favoriteResponseDto = favoriteDtoService.createFavoriteResponseDto(updatedFavorite);
			responseContent.put("result", favoriteResponseDto);
			httpStatus = HttpStatus.OK;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		} catch (Exception e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}

	/*
	 * NO CONTENT NO ES UNA EXCEPCIÓN, HA TERMIANDO CON ÉXITO PERO EL USUARIO NO
	 * TIENE COMPRAS HABLARLO CON EL FRONT
	 */
	@Operation(summary = "Obtencion de los favoritos de un usuario a traves del token")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> searchProduct(@RequestHeader("Authorization") String token) {

		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;

		try {
			List<Product> userProducts = favoriteDao.readFavoriteProductsByUserId(token);
			responseContent.put("result", userProducts);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}

}
