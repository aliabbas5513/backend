import express from "express";

const app = express();

app.use(express.json())
let products = [
    {
        id : 1,
        name : "HP HS45 headphone",
        price : 4500,
        imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThUdGr1LTS0AMaRip2t_w4gZ5ygWAROiXuIPLc0AtmZA&s=10",
        desc : "a comfortable and high-quality headset"
    },
      {
        id : 2,
        name : "PCc PD78 headphone",
        price : 3500,
        imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwoOjPc1mU0hRwnp2iJDDZbj7F-6CibCmZH3Z3R-6-CQ&s=10",
        desc : "a comfortable and high-quality headset"
    },

];

app.get("/products", (req , res) => {
    try{
         res.status(200).json(products)
    }catch(error){
        res.status(500).json({message : "something went wrong"})
    }

});


app.post("/products", (req , res)=> {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});



app.delete("/products/:id", (req , res) =>{
    const {id} = req.params;
    products = products.filter((product) => product.id !== parseInt(id));
    res.status(204).send();
});

app.put("/products/:id", (req,res)=>{
    const {id} = req.params;
    const updatedProduct = req.body;
    console.log(updatedProduct)
    const index = products.findIndex((product)=> product.id === parseInt(id));
    if(index !== -1){
        products[index] = {...products[index], ...updatedProduct};
        res.json(products[index]);
    } else {
        res.status(404).json({message : "product not found"})
    }
});



app.listen(5050, () => {
    console.log("server is running on port 5050");
    
});