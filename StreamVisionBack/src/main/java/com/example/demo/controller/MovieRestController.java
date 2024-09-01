package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.PostResponseDto;
import com.example.demo.model.entities.Post;
import com.example.demo.model.persist.dao.PostDao;
import com.example.demo.service.PostDtoService;

@RestController
@RequestMapping(path = "/movie")
public class MovieRestController {

	
	@Autowired
	private PostDao postDao;
	
	@Autowired
	private PostDtoService PostDtoService;
	

	
	
	@GetMapping(path = "/{tmdbId}",
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
			responseContent.put("message", "Error while getting posts: ".concat(e.getMessage()));
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
}
