package com.erp.maisPraTi.model;

import com.erp.maisPraTi.enums.PartyStatus;
import com.erp.maisPraTi.enums.Gender;
import com.erp.maisPraTi.enums.TypePfOrPj;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_clients")
@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private TypePfOrPj typePfOrPj;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(unique = true)
    private String cpfCnpj;

    @Column(unique = true)
    private String rgIe;

    private String phoneNumber;
    private String email;
    private String address;
    private String number;
    private String district;
    private String zipCode;
    private String city;
    private String state;
    private String country;
    private LocalDate birthDate;
    private BigDecimal creditLimit;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    private PartyStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
