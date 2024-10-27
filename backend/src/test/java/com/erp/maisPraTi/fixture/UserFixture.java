package com.erp.maisPraTi.fixture;

import com.erp.maisPraTi.model.Role;
import com.erp.maisPraTi.model.User;

import java.time.LocalDateTime;

public class UserFixture {

    public static Role roleAdmin(){
        Role role = new Role();
        role.setId(1L);
        role.setAuthority("ROLE_ADMIN");
        return role;
    }

    public static Role roleOperator(){
        Role role = new Role();
        role.setId(2L);
        role.setAuthority("ROLE_OPERATOR");
        return role;
    }

    public static User userAdmin (){
        User user = new User();
        user.setId(1L);
        user.setFirstName("Admin");
        user.setLastName("Amin");
        user.setEmail("admin@admin.com");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(null);
        user.setPassword("12345");
        user.getRoles().add(roleAdmin());
        return user;
    }
    public static User userOperator (){
        User user = new User();
        user.setId(1L);
        user.setFirstName("Operator");
        user.setLastName("Operatos");
        user.setEmail("operator@operator.com");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(null);
        user.setPassword("12345");
        user.getRoles().add(roleOperator());
        return user;
    }

}
