package com.erp.maisPraTi.repository;

import com.erp.maisPraTi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    <Optional>User findByEmail(String email);

}
