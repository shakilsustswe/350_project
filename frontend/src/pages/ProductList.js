import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from "mdb-react-ui-kit";
import './style/productList.css';
export default function ProductList() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");

  const sortOptions = ["name", "email", "phone", "address", "status"];

  useEffect(() => {
    loadUsersData(0, 4, 0);

  }, []);

  const loadUsersData = async (start, end, increase, optType = null, filterOrSortValue) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(`http://localhost:8000/data?q=${value}&_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage+increase);
            //setValue("");
          })
          .catch((err) => console.log(err));
      case "sort":
          setOperation(optType);
          setSortFilterValue(filterOrSortValue);
          return await axios
            .get(`http://localhost:8000/data?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
            .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage+increase);
            })
            .catch((err) => console.log(err));
      case "filter":
        setOperation(optType);
          setSortFilterValue(filterOrSortValue);
          return await axios
            .get(`http://localhost:8000/data?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
            .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage+increase);
            })
            .catch((err) => console.log(err));
        
      default:
        return await axios
          .get(`http://localhost:8000/data?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }

  }

  console.log("data : ", data);

  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");

    /*
    return await axios
      .get(`http://localhost:8000/data?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));

    */
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0,4,0, "sort", value);
    /*
    return await axios
      .get(`http://localhost:8000/data?_sort=${value}&_order=asc`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
    */
  };

  const handleFilter = async (value) => {
    loadUsersData(0, 4, 0, "filter", value);
     /*
     return await axios
     
        .get(`http://localhost:8000/data?status=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
      */
  };

  const renderPagination = () => {
    if(data.length <4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData(4, 8, 1, operation, sortFilterValue)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData((currentPage - 1) * 4, currentPage * 4, -1, operation, sortFilterValue)}>Prev</MDBBtn>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>


          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData((currentPage + 1) * 4, (currentPage + 2) * 4, 1, operation, sortFilterValue)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else {
      return (
        <MDBPagination className='mb-0'>

          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUsersData((currentPage-1)*4, currentPage*4,-1, operation, sortFilterValue)}>Prev</MDBBtn>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }


  return (
    <MDBContainer className='container'>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className='form-control'
          placeholder='Search Product...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />


        <MDBBtn type="submit" color="dark">Search</MDBBtn>
        <MDBBtn className='mx-2' color="info" onClick={() => handleReset()}>Reset</MDBBtn>



      </form>
      <div style={{ marginTop: "100px" }}>
        <h2 className='text-center'>search , filter, sort, pagination</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>NO.</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Status</th>
                </tr>
              </MDBTableHead>
              {
                data.length === 0 ? (
                  <MDBTableBody>
                    <tr>
                      <td colSpan={8} className="text-center mb-0">No Data Found</td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  data.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.status}</td>
                      </tr>
                    </MDBTableBody>
                  ))
                )
              }
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "250px",
          alignContent: "center"
        }}>
          {renderPagination()}
        </div>
      </div>
      {
        data.length>0 &&(
          <MDBRow>
        <MDBCol size={8}>
          <h5>
            Sort By:
          </h5>

          <select style={{ width: "50", borderRadius: "2px", height: "35px" }} onChange={handleSort}
            value={sortValue}>
            <option>Please Select Value</option>
            {
              sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))
            }
          </select>
        </MDBCol>
        <MDBCol size={4}>
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn color="success" onClick={() => handleFilter("Active")}>Active</MDBBtn>
            <MDBBtn color="danger" style={{ marginLeft: "2px" }} onClick={() => handleFilter("Inactive")}>Inactive</MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
        )
      }
      
    </MDBContainer>
  )
}
