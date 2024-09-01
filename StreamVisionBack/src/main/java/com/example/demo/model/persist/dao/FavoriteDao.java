package com.example.demo.model.persist.dao;

import java.util.List;

import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.entities.Favorite;
import com.example.demo.model.entities.Product;

public interface FavoriteDao {
	
	public Favorite createFavorite(Product savedProduct, Long loggedUserId);
	
	public List<Product> readFavoriteProductsByUserId(String token);
	
	//fav unfav para saber si se guarda
	public Favorite updateFavorite(InteractionDto interactDto, String token, String action);

}