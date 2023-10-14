import React, { useEffect, useState } from 'react'
import Display from './Display';
import DisplayOptions from './DisplayOptions';


const Main = () => {
  let grpby = localStorage.getItem("groupBy") ; 
  let ordby = localStorage.getItem("orderBy") ;
  const[groupBy, setGroupBy] = useState(grpby ? grpby : "status") ; 
  const[orderBy , setOrderBy]  = useState( ordby ? ordby : "title") ; 
  const[Data , setData]    = useState({"tickets" : [] , "users" : []}) ; 
  const[loaded , setLoaded] = useState(false) ; 
  const[filtered_data , setFilteredData] = useState([]) ; 
  const[userData , setUserData] = useState([]); 

  function filterDataFunc(){

    // returns filtered data according to grouping and ordering 

    // form array of grouped data step 1 
    // then each group is sorted according to ordering 
    let grouping = groupBy ; 
    let status_options = ["Backlog" , "Todo" , "In progress" , "Done" , "Canceled"] ; 
    let priority_options = [0 , 1 , 2 , 3 , 4] ; 
    // console.log(Data) ; 
    let grouped_data = {} ; 

    if(grouping === 'status')
    {
        status_options.map((option) => {
            grouped_data[option] = [] ; 
        })
    }
    else if(grouping === 'priority'){
        priority_options.map((option) => {
            grouped_data[option] = [] ; 
        })
    }
    else {
        grouping = "userId"; 
    }
    
    Data.tickets.map((ticket) =>
        {
        if(grouped_data[ticket[grouping]]){
            grouped_data[ticket[grouping]].push(ticket) ; 
        }
        else {
            grouped_data[ticket[grouping]] = [ticket]  ; 
        }
        })

    // console.log(grouped_data) ; 

    // sorting each group data based on ordering criteria ['title' -- > ascending  , 'priority' ---- > descending ]

    for (let [key, value] of Object.entries(grouped_data)) {
        if(orderBy === 'title'){
            grouped_data[key] = value.sort(function(a , b) {
                return a[orderBy].localeCompare(b[orderBy]); ; 
            })
            // string_a.localeCompare(string_b);
        }else {
        grouped_data[key] = value.sort(function(a , b) {
            return b[orderBy] - a[orderBy] ; 
        })
       }
    }

    // console.log(grouped_data)

    let final_data = []
    for (let [key, value] of Object.entries(grouped_data)) {
        final_data.push({[key] : value}) ; 
    }
    return final_data  ; 
    
  }

  function parseUsers(data_users){



      let users = {} ; 
      data_users.map((entry) => {
            users[entry.id] = entry ; 
      })

      setUserData(users); 

  }

  async function getData()
  {
      try{
      let response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment") ; 
      response = await response.json() ; 
    //   console.log(response);
      setData(response);
      setLoaded(true) ; 
      parseUsers(response.users)
      }
      catch{
        alert('error while fetching data')
        setData([]) ; 
      }
  }

  useEffect(() => {
      // call api to fetch data 
      // to be implemented 
      getData() ; 
    //   console.log(userData) ; 
  } , []) ; 

  useEffect(() => {
    setFilteredData(filterDataFunc(Data , groupBy , orderBy)) ; 
  }, [groupBy , orderBy , loaded])

  return (
    <div className='main_container'>
        <DisplayOptions  setGroupBy = {setGroupBy} setOrderBy = {setOrderBy} currValue = {groupBy} />
        <Display  data = {filtered_data} groupBy = {groupBy} userData={userData}/>
    </div>
  )
}

export default Main ; 