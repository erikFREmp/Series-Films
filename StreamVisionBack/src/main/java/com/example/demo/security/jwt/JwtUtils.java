package com.example.demo.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	@Value("${jwt.secret.key}")
	private String secretkey;
	@Value("${jwt.time.expiration}")
	private String timeExpiration;
	
	//Generar token de acceso
	public String generateAccessToken(String username, Long id, Set<String> roles,String language) {
		return Jwts.builder()
				.setSubject(username)
				.claim("userId", id)
				.claim("roles", roles)
				.claim("language", language)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
				.signWith(gentSignatureKey(), SignatureAlgorithm.HS256)
				.compact();
	}
	
	//Validar token de acceso
	
	public boolean isTokenValid(String token) {
		try {
			Jwts.parser()
			.setSigningKey(gentSignatureKey())
			.build()
			.parseClaimsJws(token)
			.getBody();
			return true;
		} catch (Exception e) {
			log.error("invalid token, error: " + e );
			return false;
		}
	}
	
	public Long getUserIdFromToken(String token) {
	    return getClaim(token, claims -> claims.get("userId", Long.class));
	}

	
	//Obtener el username del token
	public String getUsernameFromToken(String token) {
		return getClaim(token, Claims::getSubject);
	}
	
	//Obtener un solo claim
	public <T> T getClaim(String token, Function<Claims, T> claimsTFunction) {
		Claims claims = extractAllClaims(token);
		return claimsTFunction.apply(claims);
	}
 	//Obtener todos los claims del token
	public Claims extractAllClaims(String token) {
		return Jwts.parser()
		.setSigningKey(gentSignatureKey())
		.build()
		.parseClaimsJws(token)
		.getBody();
		
	}
	
	//Obtener firma del token
	public Key gentSignatureKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secretkey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
