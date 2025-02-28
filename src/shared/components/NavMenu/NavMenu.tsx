import React from "react"
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom"

interface NavMenuProps {
    isAuth: Function;
}

const NavMenuComponent = ({isAuth}: NavMenuProps) => {
    const cookies = new Cookies();
    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/user"}>Профиль</Link>
                </li>
                <li>
                    <Link to={"/authors"}>Авторы</Link>
                </li>
                <li>
                    <Link to={"/posts"}>Посты</Link>
                </li>
                <li>
                    <Link onClick={() => {
                        cookies.remove('accessToken')
                        cookies.remove('refreshToken')
                        isAuth()
                    }} to={"/login"}>Выход</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavMenuComponent;