package com.example.demo.model.entities;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
@Table(name="purchases")
public class Purchase {
	
	@EmbeddedId
	private PurchasePk purchasePk;

	@Column
	@CreationTimestamp
	private Date purchaseDate;

	@ManyToOne
	@MapsId("userId")
	@JsonIgnore
	private UserEntity user;

	@ManyToOne
	@MapsId("productId")
	@JsonIgnore
	@JoinColumn(name = "product_id")
	private Product product;
	
}