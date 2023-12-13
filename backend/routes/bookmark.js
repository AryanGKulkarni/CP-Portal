const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Bookmark = require('../models/Bookmark');
const {body, validationResult} = require('express-validator');

//ROUTE 1: GET all Bookmarks using: GET "/api/bookmark/fetchallbookmarks". Login required
router.get('/fetchallbookmarks', fetchuser ,async (req,res)=>{
    try {
        const bookmarks = await Bookmark.find({user: req.user.id});
        res.json(bookmarks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
    
})

//ROUTE 2: Add Bookmarks using: POST "/api/bookmark/addbookmark". Login required
router.post('/addbookmark', fetchuser ,[
    body('contestId'),
    body('index'),
    body('name'),
    body('type'),
    body('rating'),
    body('tags'),
] ,async (req,res)=>{

    try {
        const {contestId,index,name,type,rating,tags} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const existingBookmark = await Bookmark.findOne({
            contestId,
            index,
            user: req.user.id
        });

        if (existingBookmark) {
            return res.status(400).json({ errors: [{ msg: 'Bookmark already exists' }] });
        }

        const bookmark= new Bookmark({
            contestId,index,name,type,rating,tags,user: req.user.id
        })
        const savedBookmark = await bookmark.save();
        res.json(savedBookmark);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

    
})

//ROUTE 4: Delete an existing Bookmark using: DELETE "/api/bookmark/deletebookmark/id:". Login required
router.delete('/deletebookmark/:id', fetchuser, async (req,res)=>{
    try {
        const {contestId,index,name,type,rating,tags} = req.body;

        let bookmark = await Bookmark.findById(req.params.id);
        if(!bookmark){
            return res.status(404).send("Not Found");
        }
        
        if(bookmark.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        bookmark = await Bookmark.findByIdAndDelete(req.params.id);
        res.json({"Succes": "Your Bookmark Has been Deleted", bookmark:bookmark});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }   

})

module.exports = router;