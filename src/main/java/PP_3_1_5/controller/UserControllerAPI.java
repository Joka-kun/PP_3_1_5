package PP_3_1_5.controller;

import PP_3_1_5.dto.UserDTO;
import PP_3_1_5.model.Role;
import PP_3_1_5.model.User;
import PP_3_1_5.service.RoleService;
import PP_3_1_5.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserControllerAPI {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserControllerAPI(UserService userService, RoleService roleService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public ModelAndView adminPanel() {
        return new ModelAndView("usersAPI/userPanel");
    }

    @GetMapping("/api/info")
    public ResponseEntity<UserDTO> showUser(Principal principal) {
        UserDTO user = convertToUserDTO(userService.findByUsername(principal.getName()));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    public UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
