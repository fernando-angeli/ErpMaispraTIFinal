package com.erp.maisPraTi.service.validations;

import com.erp.maisPraTi.dto.ClientDto;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ClientInsertValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ClientInserValid {

    String message() default "Validation error.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}