const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql'); 
const { response } = require('express');

const app=express();
app.use(cors());
app.use(bodyparser.json());


//database connection
const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'rakhi@123',
    database:'bms',
    port:3306

});

//check database connection
db.connect(err=>{
    if(err){console.log('err');}
    console.log("database connected...");
})

//get all data

app.get('/books',(req,res)=>{
    // console.log("Get all books list")

   /*  let qry ="select * from books where Book_status='active'"; */

   

   let qry="select b.Book_id, b.Book_title, b.Book_author, bt.book_type, gt.genre_type, b.publication, b.no_of_pages, b.book_price, b.book_cover_photo, b.Book_status from books b, book_type bt, genre_type gt where b.Book_type_id=bt.type_id and b.book_genre_id = gt.genre_id and b.book_status='active'";
   console.log(qry);
   
    db.query(qry,(err,result)=>{
        
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all books data',
                data:result
            });
        } 

    });
       
});

//get data from book_type
app.get('/booktype',(req,res)=>{
    // console.log("Get all books list")

    let qry ="select * from book_type";
    db.query(qry,(err,result)=>{
        
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all book type data',
                data:result
            });
        }

    });
       
});

//get data from genre_type
app.get('/genretype',(req,res)=>{
    // console.log("Get all books list")

    let qry ="select * from genre_type";
    db.query(qry,(err,result)=>{
        
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all genre type data',
                data:result
            });
        }

    });
       
});



//get single data

app.get('/books/:book_id',(req,res)=>{
    let bookid=req.params.book_id;
    console.log(bookid);
    let qry='select * from books where book_id=' + bookid;

    console.log(qry);

    db.query(qry,(err,result)=>{
        
        if(err)
        {
            console.log(err,'errs');
        }
        
         if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'Data not found',
                data:result
            });
        }
    })
});


//Create data
app.post('/books',(req,res)=>{
    console.log('data posted');
    e=req.body;
    console.log(e.booktitle);
    console.log(e.bookauthor);

  
    //let booktitle=req.body.Book_title;
    //let bookauthor=req.body.Book_author;
   // let booktypeid=req.body.Book_type_id;
   let qry='insert into books (Book_title,Book_author,Book_type_id,Book_genre_id,Publication,No_of_pages,Book_price,Book_status) values("'+  e.booktitle + '","' + e.bookauthor + '",' + e.booktype +',' + e.genretype +',"' + e.publication +'",' + e.noofpages +',"' + e.bookprice +'","active")';

    /* let qry='insert into books (Book_id,Book_title,Book_author,Book_type_id,Book_genre_id,Publication,No_of_pages,Book_price,Book_cover_photo,Book_status) values ( 1,'
    + e.booktitle + ',' + e.bookauthor +' )';
 */
    console.log(qry);

     db.query(qry,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result');
        res.send({
                message:'Book details added sucessfully',
        
            });
        

    });  
 

});

//update data

app.put('/books/:book_id',(req,res)=>{
    console.log(req.body,'update data');

    let bookid=req.params.book_id;
    console.log(bookid);
    let booktitle=req.body.booktitle;
    console.log(booktitle);
    let bookauthor=req.body.bookauthor;
    console.log(bookauthor);
    let booktype=req.body.booktype;
    let genretype=req.body.genretype;
    let publication=req.body.publication;
    let noofpages=req.body.noofpages;
    let bookprice=req.body.bookprice;

    


    
     let qry='update books set Book_title ="' + booktitle + '", Book_author="'
     + bookauthor  + '", Book_type_id='
     + booktype +', Book_genre_id='
     + genretype +', Publication="'
     + publication + '",No_of_pages='
     + noofpages +', Book_price="'
     + bookprice+'" where book_id =' + bookid ;

     console.log(qry);

      db.query(qry,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result');
        res.send({
                message:'Book details updated sucessfully',
        
            });
        });  

});

//Deactivated data
app.put('/books/status/:book_id',(req,res)=>{
    console.log(req.body,'deactivate data');

    let bookid=req.params.book_id;
    console.log(bookid);
    let booktitle=req.body.booktitle;
    //console.log(booktitle);
    let bookauthor=req.body.bookauthor;
    //console.log(bookauthor);
    


    
     let qry='update books set Book_status="deactivate" where book_id =' + bookid ;

     console.log(qry);

      db.query(qry,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result');
        res.send({
                message:'Book deactivated Sucessfully',
        
            });
        });  

});

//deete single data

app.delete('/books/:book_id',(req,res)=>{
    let bookid=req.params.book_id;

    let qry= 'delete from books wherre  book_id =' + bookid ;
    db.qry(qry,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result');
        res.send({
                message:'data deleted',
        
            });
        });

});



app.listen(3000,()=>{
    console.log("server is running on port 3000...");
});