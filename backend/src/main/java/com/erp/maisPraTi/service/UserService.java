package com.erp.maisPraTi.service;

import com.erp.maisPraTi.dto.users.RoleDto;
import com.erp.maisPraTi.dto.users.UserDto;
import com.erp.maisPraTi.dto.users.UserUpdateDto;
import com.erp.maisPraTi.model.Role;
import com.erp.maisPraTi.model.User;
import com.erp.maisPraTi.repository.UserRepository;
import com.erp.maisPraTi.service.exceptions.DatabaseException;
import com.erp.maisPraTi.service.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.erp.maisPraTi.util.EntityMapper.convertToDto;
import static com.erp.maisPraTi.util.EntityMapper.convertToEntity;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Transactional
    public UserDto insert(UserDto userDto) {
        User newUser = convertToEntity(userDto, User.class);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        insertOrUpdateRoles(userDto.getRoles(), newUser);
        newUser = userRepository.save(newUser);
        return convertToDto(newUser, UserDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id não localizado: " + id));
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
        try{
            User user = userRepository.getReferenceById(id);
            user.getRoles().clear();
            convertToEntity(userUpdateDto, user);
            user.setUpdatedAt(LocalDateTime.now());
            insertOrUpdateRoles(userUpdateDto.getRoles(), user);
            user = userRepository.save(user);
            return convertToDto(user, UserDto.class);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível fazer a alteração neste usuário.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar atualizar o usuário.");
        }
    }

    @Transactional
    public void deleteById(Long id){
        verifyExistsId(id);
        try{
            userRepository.deleteById(id);
        } catch (DataIntegrityViolationException e){
            throw new DatabaseException("Não foi possível excluir este usuário. Ele pode estar vinculado a outros registros.");
        } catch (Exception e) {
            throw new DatabaseException("Erro inesperado ao tentar excluir o usuário.");
        }
    }

    private void insertOrUpdateRoles(List<RoleDto> roleDtos, User user) {
        user.getRoles().clear();
        roleDtos.forEach(roleDto -> {
            Role role = convertToEntity(roleService.findById(roleDto.getId()), Role.class);
            user.getRoles().add(role);
        });
    }

    private void verifyExistsId(Long id){
        if(!userRepository.existsById(id)){
            throw new ResourceNotFoundException("Id não localizado: " + id);
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
}
