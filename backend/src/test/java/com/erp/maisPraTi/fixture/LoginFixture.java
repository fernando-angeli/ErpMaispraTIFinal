package com.erp.maisPraTi.fixture;

import com.erp.maisPraTi.dto.login.LoginRequest;
import com.erp.maisPraTi.dto.login.LoginResponse;

public class LoginFixture {

    public static LoginRequest loginRequest(){
        LoginRequest request = new LoginRequest();
        request.setEmail("admin@admin.com");
        request.setPassword("12345");
        return request;
    }

    public static LoginRequest invalidLoginRequest(){
        LoginRequest request = new LoginRequest();
        request.setEmail("admin@admin.com");
        request.setPassword("");
        return request;
    }

    public static LoginResponse loginResponse(){
        LoginResponse response = new LoginResponse();
        response.setToken("token");
        return response;
    }

    public static LoginResponse invalidLoginResponse(){
        LoginResponse response = new LoginResponse();
        return response;
    }
}
