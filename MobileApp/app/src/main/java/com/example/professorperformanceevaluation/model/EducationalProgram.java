package com.example.professorperformanceevaluation.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class EducationalProgram implements Serializable {

    @SerializedName("idEducationalProgram")
    @Expose
    public int idEducationalProgram;
    @SerializedName("name")
    @Expose
    public String name;
    @SerializedName("idFaculty")
    @Expose
    public int idFaculty;

    public EducationalProgram() {
    }

    public EducationalProgram(int idEducationalProgram) {
        this.idEducationalProgram = idEducationalProgram;
    }

    public int getIdEducationalProgram() {
        return idEducationalProgram;
    }

    public void setIdEducationalProgram(int idEducationalProgram) {
        this.idEducationalProgram = idEducationalProgram;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIdFaculty() {
        return idFaculty;
    }

    public void setIdFaculty(int idFaculty) {
        this.idFaculty = idFaculty;
    }

    @Override
    public String toString() {
        return getName();
    }

}