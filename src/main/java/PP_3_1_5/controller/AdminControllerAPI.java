package PP_3_1_5.controller;


import PP_3_1_5.dto.UserDTO;
import PP_3_1_5.exception_handing.UserErrorResponse;
import PP_3_1_5.exception_handing.UserNotCreatedException;
import PP_3_1_5.exception_handing.UserNotFoundException;
import PP_3_1_5.model.Role;
import PP_3_1_5.model.User;
import PP_3_1_5.service.RoleService;
import PP_3_1_5.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminControllerAPI {
    private final UserService userService;

    private final ModelMapper modelMapper;

    public AdminControllerAPI(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public ModelAndView adminPanel() {
        return new ModelAndView("usersAPI/adminPanel");
    }

    @GetMapping("/api/info")
    public ResponseEntity<UserDTO> showUser(Principal principal) {
        UserDTO userDTO = convertToUserDTO(userService.findByUsername(principal.getName()));
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> usersDTO = userService.getAllUsers().stream().map(this::convertToUserDTO).collect(Collectors.toList());
        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<UserDTO> showUser(@PathVariable("id") int id) {
        UserDTO userDTO = convertToUserDTO(userService.getUserById(id));
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/api")
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ")
                        .append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotCreatedException(errorMsg.toString());
        }
        userService.saveUser(convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/api/{id}")
    public ResponseEntity<HttpStatus> update(@PathVariable("id") int id,
                                             @RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        userService.getUserById(id); //вшита проверка на UserNotFoundException
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ")
                        .append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotCreatedException(errorMsg.toString());
        }
        userService.updateUser(id, convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/api/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        userService.getUserById(id); //вшита проверка на UserNotFoundException
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    public User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    public UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}

