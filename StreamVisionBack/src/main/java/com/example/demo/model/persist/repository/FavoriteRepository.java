package com.example.demo.model.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entities.Favorite;
import com.example.demo.model.entities.FavoritePk;
import com.example.demo.model.entities.Product;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoritePk> {

	public Favorite findFavoriteByFavoritePk(FavoritePk favoritePk);

	@Query("SELECT p FROM Product p JOIN Favorite f ON p.id = f.product.productId WHERE f.isFavorite = true AND f.user.id = ?1")
	public List<Product> findFavoriteProductByUserId(Long userId);
}