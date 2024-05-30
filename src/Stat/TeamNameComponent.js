import '../Styles/TablePageStyle.css';

function TeamNameComponent({teamName}){
    return(
        <h1 id={"teamNameTitle"}>
            {teamName}
        </h1>
    )
}

export default TeamNameComponent;