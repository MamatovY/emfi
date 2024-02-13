import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";


const App = () => {

  const [deals, setDeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1YTkwZTcwYzM0NmQzMGFiNjlmNzNjYjYwMDI5YjcyN2JjZjQzM2Q2YTA2NWE0MWVjYTM1MzhhNmI4MTEwMTUzZDc0N2U0OTEyM2U5ZDgyIn0.eyJhdWQiOiI4YzRlMmY1MC03ZjVlLTQ5NTktOGQ5ZC1hYjc5Y2QyYTUyZTQiLCJqdGkiOiJkNWE5MGU3MGMzNDZkMzBhYjY5ZjczY2I2MDAyOWI3MjdiY2Y0MzNkNmEwNjVhNDFlY2EzNTM4YTZiODExMDE1M2Q3NDdlNDkxMjNlOWQ4MiIsImlhdCI6MTcwNzgxMzMzNCwibmJmIjoxNzA3ODEzMzM0LCJleHAiOjE3MjUwNjI0MDAsInN1YiI6IjEwNjU3NDQyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTYxNDMwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNTBlZDk3NzktNWIxZS00YjA5LTg4NzYtOTk1OTQyNDk4MzI1In0.dZwYUzbpOwAoq12itkg3oEKsR4W4J0VthMc4YB7y4rh7r1-QiKP5n9ThpP-dIvFN0dekQl1k59MjZGA9XViVA3zasNSnSdQiHHhPCH-Az-kbfH1yVOgyLPIF_Pt44mY7HrsyhZdyxiK8isdu-yWr-En8Pbd0cRmo2iiFlPPN2fiakUdGzEDId5w1KqJIqebpOGqAlowpzuamNVYfvouJ7pPAzYIAbTgfir8B5Qiu82a12BJWgvVJyK3_Bx2YNzsO88ExIFpe1OXudAQrlhmcVenNfaa_IvRpBiJ25Era4qtk3vGN4yexcgvGhfvh5BObsdD0MXygYPMty7CuS4fQ_Q'

  const fetchDeals = async () => {
    const response = await fetch(`https://test.amocrm.ru/api/v4/leads?page=${currentPage}&per_page=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();


    setDeals(data);
  };

  //https://test.amocrm.ru/api/v4/leads?page=1&per_page=5&sort_by=дом&sort_order=asc
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };


  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };


  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };


  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-3">Deals</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="page-size" className="form-label">
              Page Size
            </label>
            <select
              className="form-select"
              id="page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="sort-by" className="form-label">
              Sort By
            </label>
            <select
              className="form-select"
              id="sort-by"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="name">Name</option>
              <option value="budget">Budget</option>
              <option value="created_at">Created At</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="sort-order" className="form-label">
              Sort Order
            </label>
            <select
              className="form-select"
              id="sort-order"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Budget</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{deal.name}</td>
                  <td>{deal.budget}</td>
                  <td>{deal.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={(event) => handlePageChange(event, currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={(event) => handlePageChange(event, currentPage + 1)}
                  disabled={currentPage === Math.ceil(deals.length / pageSize)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;