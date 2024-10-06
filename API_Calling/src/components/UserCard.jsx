import React from "react";

const UserCard = ({data}) =>{
    console.log(data,"userCarddata");
    return(
        <div className="user-card">
                <img className="user-img" />
                <h3>{data?.results[0]?.name?.first}</h3>
                <p>{data?.results[0]?.cell}</p>
                <p>{data?.results[0]?.location.street.number},{data?.results[0]?.location.street.name},{data?.results[0]?.location.city},{data?.results[0]?.location.state},{data?.results[0]?.location.postcode}</p>
        </div>
    )
}
export default UserCard;