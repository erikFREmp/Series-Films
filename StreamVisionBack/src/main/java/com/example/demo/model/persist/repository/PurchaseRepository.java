package com.example.demo.model.persist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entities.Purchase;
import com.example.demo.model.entities.PurchasePk;
import com.example.demo.model.entities.Product;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, PurchasePk> {

	@Query("SELECT p FROM Product p JOIN Purchase pur ON p.productId = pur.product.productId WHERE pur.user.id = ?1")
	public List<Product> findPurchasedProductsByUserId(Long userId);

	public Purchase findPurchaseByPurchasePk(PurchasePk purchasePk);
	
}