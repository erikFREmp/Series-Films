 package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.ProductResponseDto;
import com.example.demo.model.entities.Favorite;
import com.example.demo.model.entities.FavoritePk;
import com.example.demo.model.entities.Product;
import com.example.demo.model.entities.Purchase;
import com.example.demo.model.entities.PurchasePk;
import com.example.demo.model.persist.repository.FavoriteRepository;
import com.example.demo.model.persist.repository.ProductRepository;
import com.example.demo.model.persist.repository.PurchaseRepository;
import com.example.demo.security.jwt.JwtUtils;

@Service
public class ProductDtoService {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private PurchaseRepository purchaseRep;
	
	@Autowired
	private FavoriteRepository favoriteRep;
	
	@Autowired
	private ProductRepository productRep;
	
	public ProductResponseDto createUninteractedProductResponseDto(String product) {
		ProductResponseDto responseDto = ProductResponseDto.builder()
				.product(product)
				.isPurchased(false)
				.isSaved(false)
				.build();
		return responseDto;
	}
	
	public ProductResponseDto createProductResponseDto(String product, String token, Long tmdbId, boolean isFilm) {
		ProductResponseDto productResponseDto = createUninteractedProductResponseDto(product);

		Product savedProduct = productRep.findProductByIsFilmAndTmdbId(isFilm, tmdbId);
		if (token != null && savedProduct != null) {

				token = token.substring(7);
				Long loggedUserId = jwtUtils.getUserIdFromToken(token);

				FavoritePk favoritePk = new FavoritePk(loggedUserId, savedProduct.getProductId());
				Favorite favorite = favoriteRep.findById(favoritePk).orElse(null);
				if(favorite != null)
					productResponseDto.setSaved(favorite.isFavorite());
				
				PurchasePk purchasePk = new PurchasePk(loggedUserId,savedProduct.getProductId());
				Purchase purchase = purchaseRep.findById(purchasePk).orElse(null);
				if(purchase != null)
					productResponseDto.setPurchased(true);
			}
		
		return productResponseDto;
	}
}