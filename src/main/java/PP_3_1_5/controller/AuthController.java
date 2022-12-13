package PP_3_1_5.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

@GetMapping
    public String loginPage() {
        return "login";
    }
}
