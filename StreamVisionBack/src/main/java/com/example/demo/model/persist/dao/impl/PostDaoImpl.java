package com.example.demo.model.persist.dao.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.dto.PostDto;
import com.example.demo.model.entities.Post;
import com.example.demo.model.entities.Product;
import com.example.demo.model.entities.UserEntity;
import com.example.demo.model.persist.dao.PostDao;
import com.example.demo.model.persist.repository.PostRepository;
import com.example.demo.model.persist.repository.ProductRepository;
import com.example.demo.model.persist.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.service.ProductExtractService;

@Service
public class PostDaoImpl implements PostDao {
	
	@Autowired
	private PostRepository postRep;
	
	@Autowired
	private ProductRepository productRep;
	
	@Autowired
	private UserRepository userRep;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private ProductExtractService productService;
	
	@Override
	public Post createPost(InteractionDto interactDto, PostDto postDto, String token) {
		
		token = token.substring(7);
		
		Long loggedUserId = jwtUtils.getUserIdFromToken(token);
		Product product = productRep.findProductByIsFilmAndTmdbId(interactDto.isFilm(), interactDto.tmdbId());
		try {
			if (product == null) {
				Product createdProduct = productService.extractProductFromTmdbJsonApi(interactDto);
				product = productRep.save(createdProduct);
				
			}
		} catch (Exception e) {
			throw new AppException("Error creando producto", HttpStatus.NO_CONTENT);
		}

		UserEntity user = userRep.findById(loggedUserId)
				.orElseThrow(() -> new AppException("Logged user not found", HttpStatus.NOT_FOUND));
		
		Timestamp curDate = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		String dateString = dateFormat.format(curDate);
		Post creatingPost = Post.builder()
				.content(postDto.content())
				.localRating(postDto.localRating())
				.product(product)
				.id(postDto.id())
				.user(user)
				.postDate(dateString)
				.build();
		
		Post savedPost = postRep.save(creatingPost);
		return savedPost;
	}

	@Override
	public Post updatePost(PostDto postDto) {
		
		Post savedPost = postRep.findById(postDto.id())
				.orElseThrow(() -> new AppException("Post not found", HttpStatus.NOT_FOUND));
		savedPost.setLocalRating(postDto.localRating());
		savedPost.setContent(postDto.content());
		
		Post updatedPost = postRep.save(savedPost);
		return updatedPost;
	}

	@Override
	public void deletePostById(Long postId) {
		
		postRep.findById(postId)
			.orElseThrow(() -> new AppException("Post not found", HttpStatus.NOT_FOUND));
		
		postRep.deleteById(postId);
	}


	@Override
	public Page<Post> readPostsByUserId(Pageable pageable, Long userId) {
		
		Page<Post> userPosts = postRep.findPostsByUserId(pageable, userId);

		return userPosts;
	}

	@Override
	public Page<Post> readPostsByProductId(Pageable pageable, Long productId) {
		
		Page<Post> productPosts = postRep.findPostsByProductId(pageable, productId);

		return productPosts;
	}

	@Override
	public Page<Post> readMoviePostsByTmdbId(Pageable pageable, Long tmdbId) {
		
		Product product = productRep.findProductByIsFilmAndTmdbId(true, tmdbId);
		Page<Post> productPosts = postRep.findPostsByProductId(pageable, product.getProductId());

		return productPosts;
	}
	
	@Override
	public Page<Post> readSeriesPostsByTmdbId(Pageable pageable, Long tmdbId) {
		
		Product product = productRep.findProductByIsFilmAndTmdbId(false, tmdbId);
		Page<Post> productPosts = postRep.findPostsByProductId(pageable, product.getProductId());

		return productPosts;
	}
	
	@Override
	public Post readPostById(Long postId) {
		
		Post foundPost = postRep.findById(postId)
				.orElseThrow(() -> new AppException("Post not found", HttpStatus.NOT_FOUND));
		
		return foundPost;
	}
	
}
