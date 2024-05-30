import {DIGITS_AFTER_POINT} from "../Constants/Constants";

function PrintUserDetails({user}){

    return(
        <div>
            <table id={"show-details-table"}>
                <thead>
                <tr>
                    <th>
                        USERNAME
                    </th>
                    <th>
                        EMAIL
                    </th>
                    <th>
                        BALANCE
                    </th>
                </tr>
                </thead>

                <tbody>
                <tr>

                    <td>
                        {user.username}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {parseFloat(user.balance).toFixed(DIGITS_AFTER_POINT)}$
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default PrintUserDetails