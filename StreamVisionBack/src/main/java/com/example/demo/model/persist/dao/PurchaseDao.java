package com.example.demo.model.persist.dao;

import java.util.List;

import com.example.demo.model.dto.InteractionDto;
import com.example.demo.model.entities.Product;
import com.example.demo.model.entities.Purchase;

public interface PurchaseDao {

	public Purchase createPurchase(InteractionDto interactDto, String token);
	
	public List<Product> readPurchasesByUserId(String token);
	
	public boolean checkPurchase(String token,InteractionDto interactDto );
	
	public Purchase purcharseWithCoins(InteractionDto interactDto, String token);
}
