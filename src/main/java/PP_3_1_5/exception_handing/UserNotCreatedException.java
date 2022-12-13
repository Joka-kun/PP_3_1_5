package PP_3_1_5.exception_handing;

public class UserNotCreatedException extends RuntimeException{
    public UserNotCreatedException(String msg){
        super(msg);
    }
}
