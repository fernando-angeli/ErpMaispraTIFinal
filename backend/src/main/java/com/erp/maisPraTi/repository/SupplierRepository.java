package com.erp.maisPraTi.repository;

import com.erp.maisPraTi.enums.TypePfOrPj;
import com.erp.maisPraTi.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    boolean existsByCpfCnpj(String cpfCnpj);
    boolean existsByStateRegistration(String stateRegistration);

    Supplier findByCpfCnpjAndStateRegistrationAndTypePfOrPj(String cpfCnpj, String stateRegistration, TypePfOrPj typePfOrPj);

    boolean existsByCpfCnpjAndStateRegistrationAndTypePfOrPj(String number, String number1, String pj);
}
