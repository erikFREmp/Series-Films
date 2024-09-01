package com.example.demo.model.persist.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{

	@Query("SELECT p FROM Post p WHERE p.user.id =?1")
	public Page<Post> findPostsByUserId(Pageable pageable, Long userId);
	
	@Query("SELECT p FROM Post p WHERE p.product.productId =?1 ORDER BY p.postDate DESC")
	public Page<Post> findPostsByProductId(Pageable pageable, Long productId);
	
}