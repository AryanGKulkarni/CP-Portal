import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import { useGlobalContext } from '../context/Context';
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

const Unsolved = (props) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const { globalVariable } = useGlobalContext();
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = globalVariable;

                if (apiResponse.status === "OK" && apiResponse.result) {
                    // Filter submissions with verdict "WRONG_ANSWER" and extract problems
                    const wrongAnswerSubmissions = apiResponse.result.filter(submission => submission.verdict === "WRONG_ANSWER");
                    const uniqueProblemNames = new Set(wrongAnswerSubmissions.map(submission => submission.problem.name));
                    const wrongAnswerProblems = Array.from(uniqueProblemNames).map(problemName => {
                        // Find the corresponding problem object based on the unique name
                        return wrongAnswerSubmissions.find(submission => submission.problem.name === problemName).problem;
                    });

                    // Set the filtered problems in the state
                    setProblems(wrongAnswerProblems);
                } else {
                    console.error("Error in API response");
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [globalVariable]);


    return (
        <div>

            <TableContainer component={Paper} style={{ backgroundColor: '#415A77', width: '45vw', height: 300, borderRadius: 20, overflowY: 'hidden' }} onClick={handleOpen}>
                <Table sx={{ width: '45vw' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell align="left">Unsolved Problems</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {problems.map((problem, index) => (
                            <StyledTableRow key={problem.name}>
                                <StyledTableCell component="th" scope="row">
                                    {problem.index}
                                </StyledTableCell>
                                <StyledTableCell align="left">{problem.name}</StyledTableCell>
                                <StyledTableCell align="left">
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
                                <StyledTableCell align="left">Unsolved Problems</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problems.map((problem, index) => (
                                <StyledTableRow key={problem.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {problem.index}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{problem.name}</StyledTableCell>
                                    <StyledTableCell align="left">
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
    )
}

export default Unsolved
