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
import Modal from '@mui/material/Modal';

const style = {
  backgroundColor: '#415A77',
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',  // Adjust the width as needed
  maxHeight: '70%',  // Adjust the height as needed
  overflowY: 'auto',
  borderTopLeftRadius: 30,  
  // borderTopRightRadius: 30,
};

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    // console.log(json)
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


    // console.log("Deleting Problem with id " + id)
    const newProblems = problems.filter((problem) => { return problem._id !== id })
    setProblems(newProblems);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // console.log(localStorage.getItem('token'))
      getProblems();
    }
  }, [])

  return (
    <div>

      <TableContainer component={Paper} style={{ backgroundColor: '#415A77', width: '45vw', borderRadius: 20, maxHeight: 300, overflowY: 'hidden', cursor: 'pointer' }} onClick={handleOpen}>
        <Table sx={{ width: '45vw' }} aria-label="customized table">
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer component={Paper} sx={style}>
          <Table sx={{ width: '100%' }} aria-label="customized table">
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
      </Modal>
    </div>
  );

}



export default Bookmark
