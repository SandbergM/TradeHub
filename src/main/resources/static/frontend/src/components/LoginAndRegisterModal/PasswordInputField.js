import React, { useState } from 'react'
import { Label, Input } from "reactstrap";

const PasswordInputField = (props) => {

    const [showPassword, setShowPassword ] = useState( false )

    return (
        <div>
                <Label
                    for="password"
                    className="tradeHub-dark-grey font-weight-bold col-12 custom-password-label"
                > Lösenord 
                </Label>
                <div className="custom-password-container ">
                    <Input
                        required
                        className="light-grey-background tradeHub-input col-10 noBorder"
                        type={ showPassword ? "text" : "password" }
                        placeholder="Lösenord"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                        />
                    <span 
                        className="col-2 light-grey-background material-icons custom-password-eye pointer"
                        style={{ color : `${ !showPassword ? "orange" : "black" }` }}
                        onClick={ ()  => { setShowPassword(!showPassword) }}
                        >  remove_red_eye 
                    </span>
                </div>
        </div>
    )
}


export default PasswordInputField;