package PP_3_1_5.dto;

import PP_3_1_5.model.Role;

import javax.validation.constraints.Min;
import java.util.Set;

public class UserDTO {

    private int id;

    // @NotEmpty(message = "Имя пользователя не может быть пустым")
    // @Size(min = 2, max = 30, message = "Имя должно состоять от 2 до 30 символов")
    private String name;

    //  @NotEmpty(message = "Фамилия пользователя не может быть пустой")
    //  @Size(min = 2, max = 60, message = "Фамилия должна состоять от 2 до 60 символов")
    private String lastName;

//      @Min(value = 0, message = "Возраст не может быть меньше 0")
    private int age;

    // @NotEmpty(message = "Username пользователя не может быть пустой")
    private String username;

    //  @NotEmpty(message = "Password пользователя не может быть пустой")
    private String password;

    private Set<Role> roles;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
