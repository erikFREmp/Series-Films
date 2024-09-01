package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.entities.Purchase;
import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.dto.PurchaseResponseDto;
import com.example.demo.model.entities.Product;
import com.example.demo.model.persist.dao.PurchaseDao;
import com.example.demo.service.InteractionDtoService;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/purchases")
@Tag(name="Endpoint compras")
public class PurchaseRestController {
	
	
	@Autowired
	private PurchaseDao purchaseDao;
	
	@Autowired
	private InteractionDtoService interactionDtoService;
	
	//REGISTRAR UNA COMPRA
	@Operation(summary = "Compra de producto a traves del token")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> purchase(@RequestBody InteractionDto interactDto, @RequestHeader("Authorization") String token) {
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Purchase savedPurchase = purchaseDao.createPurchase(interactDto, token);
			PurchaseResponseDto savedPurchaseDto = interactionDtoService.createPurchaseResponseDto(savedPurchase);
			responseContent.put("result", savedPurchaseDto);
			httpStatus = HttpStatus.ACCEPTED;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		} catch (Exception e) {
			responseContent.put("message", "Error while purchasing: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Compra de producto con monedas a traves del token")
	@PostMapping("/coins")
	public ResponseEntity<?> purchaseWithCoins(@RequestBody InteractionDto interactDto, @RequestHeader("Authorization") String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Purchase savedPurchase = purchaseDao.purcharseWithCoins(interactDto, token);
			PurchaseResponseDto savedPurchaseDto = interactionDtoService.createPurchaseResponseDto(savedPurchase);
			responseContent.put("result", savedPurchaseDto);
			httpStatus = HttpStatus.ACCEPTED;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		} catch (Exception e) {
			responseContent.put("message", "Error while purchasing: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Obtencion de productos comprados por un usuario a traves del token")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> findProducts(@RequestHeader("Authorization") String token) {
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			List<Product> purchasedProducts = purchaseDao.readPurchasesByUserId(token);
			responseContent.put("result", purchasedProducts);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while purchasing: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Hidden
	@GetMapping("/check")
	public ResponseEntity<?> checkPurcharse(@RequestHeader("Authorization") String token, @RequestBody InteractionDto interactDto){
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			boolean purchased = purchaseDao.checkPurchase(token, interactDto);
			responseContent.put("result", purchased);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while purchasing: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
}
