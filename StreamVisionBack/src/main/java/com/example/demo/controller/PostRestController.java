package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.dto.PostCreationDto;
import com.example.demo.model.dto.PostDto;
import com.example.demo.model.dto.PostResponseDto;
import com.example.demo.model.entities.Post;
import com.example.demo.model.entities.Product;
import com.example.demo.model.persist.dao.PostDao;
import com.example.demo.service.InteractionDtoService;
import com.example.demo.service.PostDtoService;
import com.example.demo.service.TmdbService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(path = "/posts")
public class PostRestController {
	
	private final Long loggedUserId = 1L;
	
	@Autowired
	private PostDao postDao;
	
	@Autowired
	private PostDtoService PostDtoService;
	
	@Autowired
	private InteractionDtoService interactionDtoService;
	
	@Autowired
	private TmdbService tmdbService;
	
	@Operation(summary = "Creacion de un post a traves del token")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createPost(@RequestBody PostCreationDto postCreationDto, @RequestHeader("Authorization") String token){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Post createdPost = postDao.createPost(postCreationDto.getInteractionDto(), postCreationDto.getPostDto(), token);
			PostResponseDto createdPostDto = interactionDtoService.createPostResponseDto(createdPost);
			responseContent.put("result", createdPostDto);
			httpStatus = HttpStatus.CREATED;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		} catch (Exception e) {
			responseContent.put("message", "Error while creating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Borrado de un post")
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(path = "/{id}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deletePost(@PathVariable Long id){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			postDao.deletePostById(id);
			responseContent.put("message", "Post removed");
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while removing post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Edicion de un post a traves del token")
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> updatePost(@RequestBody PostDto postDto,  @RequestHeader("Authorization") String token){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Post updatedPost = postDao.updatePost(postDto);
			PostResponseDto updatedPostDto = PostDtoService.createPostResponseDto(updatedPost);
			responseContent.put("result", updatedPostDto);
			httpStatus = HttpStatus.CREATED;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		}  catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	/*
	@GetMapping(path = "/product/{id}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> productPosts(@PathVariable Long id, Pageable pageable){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Page<Post> forumPosts = postDao.readPostsByProductId(pageable, id);
			Page<PostResponseDto> forumPostsDtos = PostDtoService.postListToPostResponseDtoList(forumPosts);
			responseContent.put("result", forumPostsDtos);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	*/
	
	@Operation(summary = "Obtencion de todos los posts de un usuario")
	@GetMapping(path= "/user/{id}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> userPosts(@PathVariable Long id, Pageable pageable){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Page<Post> userPosts = postDao.readPostsByUserId(pageable, id);
			Page<PostResponseDto> userPostDtos = PostDtoService.postListToPostResponseDtoList(userPosts);
			responseContent.put("result", userPostDtos);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@Operation(summary = "Obtencion de un post a traves del id")
	@GetMapping(path = "/{id}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> postById(@PathVariable Long id){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Post foundPost = postDao.readPostById(id);
			PostResponseDto foundPostDto = PostDtoService.createPostResponseDto(foundPost);
			responseContent.put("result", foundPostDto);
			httpStatus = HttpStatus.OK;
		} catch (AppException e) {
			responseContent.put("message", "Error while processing request: ".concat(e.getMessage()));
			httpStatus = e.getHttpStatus();
		}  catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	/*
	
	@GetMapping(path = "/product/movie/{tmdbId}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> moviePostsByTmdbId(@PathVariable Long tmdbId, Pageable pageable){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			
			Page<Post> forumPosts = postDao.readMoviePostsByTmdbId(pageable, tmdbId);
			Page<PostResponseDto> forumPostsDtos = PostDtoService.postListToPostResponseDtoList(forumPosts);
			responseContent.put("result", forumPostsDtos);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
	
	@GetMapping(path = "/product/series/{tmdbId}",
			consumes = MediaType.APPLICATION_JSON_VALUE, 
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> seriesPostsByTmdbId(@PathVariable Long tmdbId, Pageable pageable){
		
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		
		try {
			Page<Post> forumPosts = postDao.readSeriesPostsByTmdbId(pageable, tmdbId);
			Page<PostResponseDto> forumPostsDtos = PostDtoService.postListToPostResponseDtoList(forumPosts);
			responseContent.put("result", forumPostsDtos);
			httpStatus = HttpStatus.OK;
		} catch (Exception e) {
			responseContent.put("message", "Error while updating post: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
*/
}
