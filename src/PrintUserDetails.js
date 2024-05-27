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
                        {parseFloat(user.balance).toFixed(2)}$
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default PrintUserDetails