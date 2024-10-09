package com.erp.maisPraTi.dto;

import com.erp.maisPraTi.enums.SupplierStatus;
import com.erp.maisPraTi.enums.TypePfOrPj;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierUpdateDto {

    @NotBlank(message = "O campo nome é obrigatório.")
    private String fullName;

    @Enumerated(EnumType.STRING)
    private TypePfOrPj typePfOrPj;

    private String cpfCnpj;

    private String stateRegistration;  // Inscrição Estadual

    private String phoneNumber;

    @Email(message = "E-mail inválido.")
    @NotBlank(message = "E-mail é obrigatório.")
    private String email;

    private String address;

    private String number;

    private String district;

    private String zipCode;

    private String city;

    private String state;

    private String country;

    private BigDecimal creditLimit;

    private String notes;

    @Enumerated(EnumType.STRING)
    private SupplierStatus status;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDateTime updatedAt;
}
