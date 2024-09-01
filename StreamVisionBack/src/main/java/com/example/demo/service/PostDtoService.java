package com.example.demo.service;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.PostResponseDto;
import com.example.demo.model.entities.Post;

@Service
public class PostDtoService {

	public PostResponseDto createPostResponseDto(Post post) {
		
		Timestamp currentDate = new Timestamp(System.currentTimeMillis());
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		String dateString = dateFormat.format(currentDate);
		PostResponseDto postResponseDto = PostResponseDto.builder()
				.localRating(post.getLocalRating())
				.content(post.getContent())
				.author(post.getUser().getUsername())
				.id(post.getId())
				.postDate(post.getPostDate())
				.build();
		return postResponseDto;
	}
	
	public Page<PostResponseDto> postListToPostResponseDtoList(Page<Post> posts) {
		
		Page<PostResponseDto> postResponseDtos = posts
				.map(post -> createPostResponseDto(post)); 
		return postResponseDtos;
	}
	
}