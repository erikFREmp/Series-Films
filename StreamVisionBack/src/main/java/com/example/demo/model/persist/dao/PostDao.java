package com.example.demo.model.persist.dao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.dto.PostDto;
import com.example.demo.model.entities.Post;

public interface PostDao {

	public Post createPost (InteractionDto interactDto, PostDto postDto, String token);
	
	public Post updatePost (PostDto postDto);
	
	public void deletePostById(Long postId);
	
	public Page<Post> readPostsByUserId(Pageable pageable, Long userId);
	
	public Page<Post> readPostsByProductId(Pageable pageable, Long productId);
		
	public Page<Post> readMoviePostsByTmdbId(Pageable pageable, Long tmdbId);
	
	public Page<Post> readSeriesPostsByTmdbId(Pageable pageable, Long tmdbId);


	public Post readPostById(Long postId);
	
}