package com.exception;


public class SubjectNotFoundException extends RuntimeException{
    public SubjectNotFoundException(Long id){
        super("Could not found the user with id "+ id);
    }
}
