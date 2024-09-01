package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exceptions.AppException;
import com.example.demo.model.dto.ProductResponseDto;
import com.example.demo.service.ProductDtoService;
import com.example.demo.service.TmdbService;
import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("")
@Tag(name = "Endpoint peliculas")
public class TmdbController {
	
	private final AppException appException = new AppException("Api external error", HttpStatus.INTERNAL_SERVER_ERROR);
	
	@Autowired
	private TmdbService apiService;
	
	@Autowired
	private ProductDtoService productDtoService;

	@Operation(summary = "Obtencion de todos los generos de la categoria peliculas")
	// LISTA de GENEROS de películas
	@GetMapping("/movies/genrelist/{language}")
	public ResponseEntity<?> getMovieGenreList(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String genre = apiService.getMovieGenreList(language);
			responseContent.put("result", genre);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}
	
	

	@Operation(summary = "Obtencion de las peliculas de origen español")
	// Peliculas populares ESPAÑOLAS
	@GetMapping("/movies/spanish/{language}/{page}")
	public ResponseEntity<?> getSpanishMovie(@PathVariable String language,@PathVariable int page) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String spanishMovie = apiService.getSpanishMovie(page,language);
			responseContent.put("result", spanishMovie);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Hidden
	// Peliculas de ACCION
	@GetMapping("/movies/genre/action/{language}")
	public ResponseEntity<?> getActionMovie(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String actionMovies = apiService.getActionMovie(language);
			responseContent.put("result", actionMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Hidden
	// Peliculas de DRAMA
	@GetMapping("/movies/genre/drama/{language}")
	public ResponseEntity<?> getDramaMovie(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String dramaMovies = apiService.getDramaMovie(language);
			responseContent.put("result", dramaMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Operation(summary = "Obtencion de las peliculas mas populares")
	// Películas populares
	@GetMapping("/movies/popular/{language}")
	public ResponseEntity<?> getPopularMovies(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String popularMovies = apiService.getPopularMovies(language);
			responseContent.put("result", popularMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	
	@Operation(summary = "Obtencion de las películas en cartelera")
	// Películas en cartelera
	@GetMapping("/movies/current/{language}")
	public ResponseEntity<?> getCurrentMovies(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String currentMovies = apiService.getCurrentMovies(language);
			responseContent.put("result", currentMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Operation(summary = "Obtencion de las peliculas sin estrenar")
	// Películas próximas
	@GetMapping("/movies/upcoming/{language}")
	public ResponseEntity<?> getUpcomingMovies(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String upcomingMovies = apiService.getUpcomingMovies(language);
			responseContent.put("result", upcomingMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Operation(summary = "Obtencion de las peliculas mejor valoradas")
	// Películas mejor valoradas
	@GetMapping("/movies/toprated/{language}")
	public ResponseEntity<?> getTopRatedMovies(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String topRatedMovies = apiService.getTopRatedMovies(language);
			responseContent.put("result", topRatedMovies);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}

	
	@Operation(summary = "Obtencion de las películas de un genero a traves del id del genero")
	// Filtrar Películas por genero
	@GetMapping("/movies/genre/{language}/{id_genre}/{page}")
	public ResponseEntity<?> getMoviesByGenre(@PathVariable String language,@PathVariable int id_genre,@PathVariable int page) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String moviesByGenre = apiService.getMoviesByGenre(id_genre,page,language);
			responseContent.put("result", moviesByGenre);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	/*
	@Operation(summary = "Obtencion de una pelicula a traves de su id")
	@GetMapping("/movies/search/{id_movie}")
	public ResponseEntity<?> getMovieById(@PathVariable long id_movie) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String movieById = apiService.getMovieById(id_movie);
			responseContent.put("result", movieById);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}
	*/
	
	
	// Buscar Películas por ID
	@GetMapping("/movies/search/{language}/{movieId}")
	public ResponseEntity<?> getMovieById(@PathVariable String language,@PathVariable Long movieId, @RequestHeader(value = "Authorization", required = false) String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String movie = apiService.getMovieById(movieId,language);
			ProductResponseDto movieDto = productDtoService.createProductResponseDto(movie, token, movieId, true);
			responseContent.put("result", movieDto);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

//SERIES

	
	// LISTA de GENEROS de series
	@Operation(summary = "Obtencion de todos los generos de la categoria series")
	@GetMapping("/series/genrelist/{language}")
	public ResponseEntity<?> getSerieGenreList(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String serieGenreList = apiService.getSerieGenreList(language);
			responseContent.put("result", serieGenreList);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Operation(summary = "Obtencion de las series de origen español")
	// Series populares ESPAÑOLAS
	@GetMapping("/series/spanish/{language}/{page}")
	public ResponseEntity<?> getSpanishSerie(@PathVariable String language,@PathVariable int page) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String spanishSerie = 	apiService.getSpanishSerie(page,language);;
			responseContent.put("result", spanishSerie);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Hidden
	// Series de ACCION
	@GetMapping("/series/genre/action/{language}")
	public ResponseEntity<?> getActionSerie(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String actionSerie = apiService.getActionSerie(language);
			responseContent.put("result", actionSerie);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Hidden
	// Series de DRAMA
	@GetMapping("/series/genre/drama/{language}")
	public ResponseEntity<?> getDramaSerie(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String dramaSerie = apiService.getDramaSerie(language);
			responseContent.put("result", dramaSerie);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}

	@Operation(summary = "Obtencion de las peliculas populares")
	// Series populares
	@GetMapping("/series/popular/{language}")
	public ResponseEntity<?> getPopularSeries(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String popularSeries = apiService.getPopularSeries(language);
			responseContent.put("result", popularSeries);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}

	@Operation(summary = "Obtencion de las series que se emiten hoy")
	// Series que se emiten hoy
	@GetMapping("/series/today/{language}")
	public ResponseEntity<?> getSeriesAiringToday(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String seriesAiringToday = apiService.getSeriesAiringToday(language);
			responseContent.put("result", seriesAiringToday);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}

	 @Operation(summary = "Obtencion de las series en emision")
	// Series en emisión
	@GetMapping("/series/onair/{language}")
	public ResponseEntity<?> getSeriesOnAir(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String seriesOnAir = apiService.getSeriesOnAir(language);
			responseContent.put("result", seriesOnAir);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;

	}

	@Operation(summary = "Obtencion de las series mejor valoradas")
	// Series mejor valoradas
	@GetMapping("/series/toprated/{language}")
	public ResponseEntity<?> getTopRatedSeries(@PathVariable String language) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String topRatedSeries = apiService.getTopRatedSeries(language);
			responseContent.put("result", topRatedSeries);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}

	@Operation(summary = "Obtencion de las series de un genero a traves de la id del genero")
	// Filtrar Series por genero
	@GetMapping("/series/genre/{language}/{id_genre}/{page}")
	public ResponseEntity<?> getSeriesByGenre(@PathVariable String language,@PathVariable int id_genre,@PathVariable int page) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String seriesByGenre = apiService.getSeriesByGenre(id_genre,page,language);
			responseContent.put("result", seriesByGenre);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}
	
	
	/*
	@Operation(summary = "Obtencion de una serie a traves de su id")
	// Buscar serie por ID
	@GetMapping("/series/search/{serieId}")
	public ResponseEntity<?> getSeriesById(@PathVariable long serieId) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String seriesById = apiService.getSeriesById(serieId);;
			responseContent.put("result", seriesById);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}
	*/
	
	@GetMapping("/series/search/{language}/{serieId}")
	public ResponseEntity<?> getSeriesById(@PathVariable String language,@PathVariable Long serieId, @RequestHeader(value = "Authorization", required = false) String token) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			String serie = apiService.getSeriesById(serieId,language);
			ProductResponseDto serieDto = productDtoService.createProductResponseDto(serie, token, serieId, false);
			responseContent.put("result", serieDto);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response; 

	}

	 
	@Operation(summary = "Obtencion de peliculas por palabra clave")
	// Buscar películas o series por palabra clave
	@GetMapping("/search/{language}/{query}")
	public ResponseEntity<?> searchMulti(@PathVariable String language,@PathVariable String query) {
		ResponseEntity<?> response;
		Map<String, Object> responseContent = new HashMap<>();
		HttpStatus httpStatus;
		try {
			JsonNode multiSearch = apiService.multiSearch(query,language);
			responseContent.put("result", multiSearch);
			httpStatus = HttpStatus.OK;
			
		} catch (Exception e) {
			responseContent.put("message", appException.getMessage());
			httpStatus = appException.getHttpStatus();
		}
		
		response = new ResponseEntity<Map<String, Object>>(responseContent, httpStatus);
		return response;
	}
}
