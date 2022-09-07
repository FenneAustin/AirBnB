import {useDispatch} from "react-redux"
import login from "../../store/session"
import "./DemoAccount.css"

    const DemoAccount = () => {

        const dispatch = useDispatch();

        const handleClick = () => {
            dispatch(login('Demo@user.io', 'password'));
        }

        return (
            <button className="demo-login" onClick={() => handleClick()}>
                Login Demo
            </button>
        )

    }
