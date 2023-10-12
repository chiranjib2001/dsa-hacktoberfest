import React from 'react'
import { useState,useEffect } from 'react';

import Shimmer from "../shimmer";
import { useParams } from 'react-router-dom';

function Menu() {
    const resID = useParams();
    console.log(useParams());
    const [menuData, setmenuData] = useState([]);
    const [resName, setResName] = useState("");
    const [loading, setloading] = useState(true);
    useEffect(() => {
        fetchMenuDetailJSON();
    }, [])
   
    async function fetchMenuDetailJSON() {
        const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0653205&lng=72.542296&restaurantId=${resID.id}&catalog_qa=undefined&submitAction=ENTER`);
        const menuData = await response.json();
        console.log(menuData);
        setResName( menuData.data?.cards[0]?.card?.card?.info?.name);
        console.log(resName)
       
        const finalData =  menuData.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards?.map(element => element.card.info)  ;
        setmenuData(finalData);
        console.log(finalData)
        setloading(false)
      }


      return (loading)?<Shimmer/>:(
        <>
          <h1>Welcome to the {resName} </h1>
          <div className='MenuItem'>
            <ul>
              {menuData?.map((element, index) => (
                <li key={index}>{element.name }  Price : <strong>{element.price}</strong></li>
              ))}
            </ul>
          </div>
        </>
      );
      
}

export default Menu
