package PP_3_1_5.service;

import PP_3_1_5.model.Role;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface RoleService {
    List<Role> getAllRoles();
}
