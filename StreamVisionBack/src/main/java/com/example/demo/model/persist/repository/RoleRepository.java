package com.example.demo.model.persist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.entities.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long>{

}
