import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#778DA9',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1B263B',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Bookmark = () => {
  const Initial = []
  const [problems, setProblems] = useState(Initial);

  // Get Notes
  const getProblems = async () => {

    const response = await fetch(`http://localhost:5000/api/bookmark/fetchallbookmarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    setProblems(json)
  }

  const deleteProblem = async (id) => {

    const response = await fetch(`http://localhost:5000/api/bookmark/deletebookmark/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)


    console.log("Deleting Problem with id " + id)
    const newProblems = problems.filter((problem) => { return problem._id !== id })
    setProblems(newProblems);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      getProblems();
    }
  }, [])

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#415A77', maxWidth: 600, borderRadius: 20, maxHeight: 300, overflowY: 'hidden'}}>
      <Table sx={{ maxWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Index</StyledTableCell>
            <StyledTableCell align="left">Bookmarks</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem, index) => (
            <StyledTableRow key={problem.index}>
              <StyledTableCell component="th" scope="row">
                {problem.index}
              </StyledTableCell>
              <StyledTableCell align="left">{problem.name}</StyledTableCell>
              <StyledTableCell align="left">
                <Link onClick={() => deleteProblem(problem._id)} className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500 cursor-pointer"><Button style={{ backgroundColor: '#0D1B2A' }} variant="contained">Remove</Button></Link>
              </StyledTableCell>
              <StyledTableCell align="left">
                <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500" rel="noreferrer"><Button style={{ backgroundColor: '#0D1B2A' }} variant="contained">Solve</Button></a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default Bookmark
