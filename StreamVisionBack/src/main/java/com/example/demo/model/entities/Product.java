package com.example.demo.model.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name="products")
public class Product {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;
	private Long tmdbId;

	@Column
	private String title;
	//private String name;
	//private String officialName;
	private String poster_path;
	private boolean isFilm;
	
	//AL DEVOLVER LOS PRODUCTOS FAVORITOS DE UN USUARIO SE GENERA JSON INFINITO
	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<Post> posts;

}