package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.entities.Product;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductExtractService {
	
	@Autowired
	private TmdbService tmdbService;

	
	public Product extractProductFromTmdbJsonApi(InteractionDto interactDto) {
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		Product extractedProduct = null;

		String json = null;
		if (interactDto.isFilm() == true)
			json = tmdbService.getMovieById(interactDto.tmdbId(),"es");
		else
			json = tmdbService.getSeriesById(interactDto.tmdbId(),"es");
		
		if (json == null)
			throw new AppException("Error loading external api information", HttpStatus.INTERNAL_SERVER_ERROR);
		
        try {
			extractedProduct = objectMapper.readValue(json, Product.class);
			/*
			if (interactDto.isFilm() == true)
				extractedProduct.setOfficialName(extractedProduct.getTitle());
			else
				extractedProduct.setOfficialName(extractedProduct.getName());
			*/
			//json = tmdbService.getSeriesById(interactDto.tmdbId());
			System.out.println("Aqui lo que buscas" + extractedProduct);
			
			extractedProduct.setFilm(interactDto.isFilm());
			extractedProduct.setTmdbId(interactDto.tmdbId());
		} catch (Exception e) {
			throw new AppException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
        
		return extractedProduct;
	}
	
}