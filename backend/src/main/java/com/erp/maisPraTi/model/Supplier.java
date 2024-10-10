package com.erp.maisPraTi.model;

import com.erp.maisPraTi.enums.SupplierStatus;
import com.erp.maisPraTi.enums.TypePfOrPj;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_suppliers")
@Entity
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private TypePfOrPj typePfOrPj;

    @Column(unique = true)
    private String cpfCnpj;

    @Column(unique = true)
    private String stateRegistration;  // Inscrição Estadual

    private String phoneNumber;
    private String email;
    private String address;
    private String number;
    private String district;
    private String zipCode;
    private String city;
    private String state;
    private String country;
    private BigDecimal creditLimit;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    private SupplierStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}