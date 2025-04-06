package com.kite_and_key.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BeerRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float boilingTemp;
    private Float firstRest;
    private Float grainTemp; 
    private Float waterRatio;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Float getBoilingTemp() { return this.boilingTemp; }
    public void setBoilingTemp(Float boilingTemp) { this.boilingTemp = boilingTemp; }
    public Float getFirstRest() { return this.firstRest; }
    public void setFirstRest(Float firstRest) { this.firstRest = firstRest; }
    public Float getGrainTemp() { return this.grainTemp; }
    public void setGrainTemp(Float grainTemp) { this.grainTemp = grainTemp; }
    public Float getWaterRatio() { return waterRatio; }
    public void setWaterRatio(Float waterRatio) { this.waterRatio = waterRatio; }
}