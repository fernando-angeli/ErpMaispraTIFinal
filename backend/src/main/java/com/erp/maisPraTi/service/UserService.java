package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.UserDto;
import com.erp.maisPraTi.dto.UserUpdateDto;
import com.erp.maisPraTi.model.User;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.erp.maisPraTi.util.EntityMapper.convertToDto;
import static com.erp.maisPraTi.util.EntityMapper.convertToEntity;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserDto insert(UserDto userDto) {
        User newUser = convertToEntity(userDto, User.class);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        newUser = userRepository.save(convertToEntity(userDto, User.class));
        return convertToDto(newUser, UserDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        verifyExistsId(id);
        Optional<User> user = userRepository.findById(id);
        return Optional.of(convertToDto(user, UserDto.class));
    }

    @Transactional(readOnly = true)
    public Page<UserDto> findAll(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> convertToDto(user, UserDto.class));
    }

    @Transactional
    public UserDto update(Long id, UserUpdateDto userUpdateDto){
        verifyExistsId(id);
        User user = userRepository.getReferenceById(id);
        convertToEntity(userUpdateDto, user);
        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.save(user);
        return convertToDto(user, UserDto.class);
    }

    @Transactional
    public void deleteById(Long id){
        verifyExistsId(id);
        try{
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível excluir este usuário.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Usuário não encontrado: " + email);
        }
        return user;
    }

    private void verifyExistsId(Long id){
        if(!userRepository.existsById(id)){
            throw new ResourceNotFoundException("Id [" + id + "] não localizado.");
        }
    }

}
