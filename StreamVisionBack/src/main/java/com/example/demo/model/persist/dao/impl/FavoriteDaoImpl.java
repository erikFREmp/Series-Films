package com.example.demo.model.persist.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.entities.Favorite;
import com.example.demo.model.entities.FavoritePk;
import com.example.demo.model.entities.Product;
import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.dao.FavoriteDao;
import com.example.demo.model.persist.repository.FavoriteRepository;
import com.example.demo.model.persist.repository.ProductRepository;
import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.service.ProductExtractService;

@Service
public class FavoriteDaoImpl implements FavoriteDao {

	@Autowired
	private FavoriteRepository favoriteRep;

	@Autowired
	private ProductRepository productRep;

	@Autowired
	private UserRepository userRep;

	@Autowired
	private ProductExtractService productService;

	@Autowired
	private JwtUtils jwtUtils;

	@Override
	public Favorite createFavorite(Product savedProduct, Long loggedUserId) {

		UserEntity user = userRep.findById(loggedUserId)
				.orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

		Favorite favorite = Favorite.builder().favoritePk(new FavoritePk(loggedUserId, savedProduct.getProductId()))
				.product(savedProduct).user(user).isFavorite(false).build();

		Favorite createdFavorite = favoriteRep.save(favorite);
		return createdFavorite;
	}

	@Override
		
	public Favorite updateFavorite(InteractionDto interactionDto, String token, String action) {

		if (!"SAVE".equalsIgnoreCase(action) && !"UNSAVE".equalsIgnoreCase(action))
			throw new AppException("Unknown action", HttpStatus.BAD_REQUEST);
		
		token = token.substring(7);
		Long loggedUserId = jwtUtils.getUserIdFromToken(token);
		Product savedProduct = productRep.findProductByIsFilmAndTmdbId(interactionDto.isFilm(), interactionDto.tmdbId());
		if (savedProduct == null) {
			Product createdProduct = productService.extractProductFromTmdbJsonApi(interactionDto);
			savedProduct = productRep.save(createdProduct);
		}
		
		FavoritePk favoritePk = new FavoritePk(loggedUserId, savedProduct.getProductId());
		Favorite savedfavorite = favoriteRep.findById(favoritePk).orElse(null);
		if (savedfavorite == null)
			savedfavorite = createFavorite(savedProduct, loggedUserId);

		if ("SAVE".equalsIgnoreCase(action) && savedfavorite.isFavorite())
			throw new AppException("Product already saved", HttpStatus.FORBIDDEN);
		else if ("SAVE".equalsIgnoreCase(action) && savedfavorite.isFavorite() == false)
			savedfavorite.setFavorite(true);
		else if ("UNSAVE".equalsIgnoreCase(action) && savedfavorite.isFavorite() == false)
			throw new AppException("Product already unsaved", HttpStatus.FORBIDDEN);
		else if ("UNSAVE".equalsIgnoreCase(action) && savedfavorite.isFavorite())
			savedfavorite.setFavorite(false);

		Favorite updatedFavorite = favoriteRep.save(savedfavorite);
		return updatedFavorite;
	}

	@Override
	public List<Product> readFavoriteProductsByUserId(String token) {

		token = token.substring(7);
		Long loggedUserId = jwtUtils.getUserIdFromToken(token);

		List<Product> products = favoriteRep.findFavoriteProductByUserId(loggedUserId);
		return products;
	}

}
