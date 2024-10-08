package com.example.demo.model.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	 @Query("SELECT p FROM Product p WHERE p.isFilm = ?1 AND p.tmdbId = ?2")
	 public Product findProductByIsFilmAndTmdbId(boolean isFilm,  Long tmdbId);
	 
}