package com.erp.maisPraTi.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {

        Object authoritiesClaim = jwt.getClaim("roles");

        if(authoritiesClaim instanceof List<?>){
            return ((List<?>) authoritiesClaim).stream()
                    .map(authority -> {
                        if(authority instanceof Map){
                            return new SimpleGrantedAuthority((String) ((Map<?, ?>) authority).get("authority"));
                        } else {
                            return new SimpleGrantedAuthority(authority.toString());
                        }
                    })
                    .collect(Collectors.toList());
        }
        return List.of();
    }
}
