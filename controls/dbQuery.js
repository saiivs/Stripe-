
const db = require('../modal/schema')

module.exports = {
    productDetails:async(data,email)=>{
        console.log({data});
        let user = await db.users.findOne({userEmail:email});
        let prodStatus = "complete"
        if(user){
            let skus = user.skus;
            if(skus != data.length){
                prodStatus ="Incomplete"
            }else{
               await db.users.updateOne({userEmail:email},{$set:{productStatus:prodStatus}});
            }
        }
        let prodExist = await db.products.findOne({userEmail:email});
        if(!prodExist){
        let proData = {
                    userEmail: email,
                    productStatus:prodStatus,
                    productTable:data
                }
                return new Promise(async(res,rej)=>{
                    let proDetails = new db.products(proData);
                    await proDetails.save();
                    let updated = await db.users.updateOne({userEmail:email},{$set:{Status:true}});
                    res(updated)
                })
        }else{
            console.log("databse");
            let tableUpdate = await db.products.updateOne({userEmail:email},{$set:{productTable:data}});
            if(prodStatus == "complete"){
                await db.products.updateOne({userEmail:email},{$set:{productStatus:prodStatus}})
                await db.users.updateOne({userEmail:email},{$set:{productStatus:prodStatus}});
            }
            console.log({tableUpdate});
            return tableUpdate
        }
        
    },

    createUser:async(userData)=>{
        let dbUsers = await db.users.findOne({userEmail:userData.email});
        if(!dbUsers){
        let user = {
                    userName:userData.name,
                    userEmail:userData.email,
                    company:userData.company,
                    planName:userData.planName,
                    skus:userData.skus
                }
        let data = new db.users(user)
        return data.save().then((data)=>{
            return data
        });
        }else{
            return true;
        }
        
    },

    GetSkus:(email)=>{
        return new Promise(async(res,rej)=>{
            let response = {}
            let ArrLen = false
            let user = await db.users.findOne({userEmail:email});
            response.userName = user.userName
            let prod = await db.products.findOne({userEmail:email});
            if(prod){
                console.log("got the products");
                if(user.skus == prod.productTable.length) ArrLen = true;
                if(ArrLen){
                    response.status ="complete";
                    response.data = prod
                    res(response)
                }else{
                    let newArr = []
                    let obj = {}
                    for(let i = 0; i<user.skus;i++){
                        if(prod.productTable[i]){
                            newArr.push(prod.productTable[i])
                        }else{
                            newArr.push(obj) 
                        }
                    }
                    console.log("from databse incompletedata");
                    response.status = "incomplete";
                    response.data = newArr;
                    res(response)
                }
            }else{
                let user = await db.users.findOne({userEmail:email});
                if(user) {
                    response.status = "newUser";
                    response.data = user
                    res(response)
                }else{
                    res(false)
                }
                
            }
           
            
        })
    },

    appendPassword:async(pass,email)=>{
        console.log({pass,email});
        let passwrd
        return  passwrd = await db.users.updateOne({userEmail:email},{$set:{password:pass}});
    },

    getUserData:(email,pass)=>{
        return new Promise(async(res,rej)=>{
            let userData = await db.users.findOne({ userEmail:email });
            console.log({userData});
            let response ={
                status:"userNotExist"
            } 
            if(userData){
                response.status = userData.password == pass ? true : false;
                if(response.status){
                    res(response)
                }else{
                    response.status=false
                    res(response)
                }
            }else{
                res(response)
            }
        })
    },

    getProTable:(email)=>{
        console.log({email});
        return new Promise(async(res,rej)=>{
            let table = await db.products.findOne({ userEmail:email });
            if(table){
                res(table);
            }else{
                res(false);
            }
        })
    },

    saveEditData:async(edit,artID,email)=>{
        console.log("db edit");
        console.log(artID);
        let updates = await db.products.updateOne({ userEmail:email,'productTable.ArticleId':artID },{ $set:{
             'productTable.$.ArticleId':edit.ArticleId,
             'productTable.$.ProductName': edit.ProductName,
             'productTable.$.ProductLink':edit.ProductLink  
            }});
        console.log({updates});
        return
    },

    getUsers:async()=>{
        let users = await db.users.find({});
        if(users){
            return users
        }else{
            return false;
        }
    },

    checkUser:async(email)=>{
        console.log("databvase");
        let user = await db.users.findOne({userEmail:email});
        if(user){
            return true;
        }else{
            return false;
        }
    },

    getProdStatus:async(email)=>{
        let prod = await db.products.findOne({userEmail:email});
        if(prod){
            let status = prod.productStatus;
            return status;
        }else{
            return false
        }
    },

    getUser:async(email)=>{
        let user = await db.users.findOne({userEmail:email});
        if(user){
            return user;
        }else{
            return false
        }
    },

    checkUserPassExist:async(email)=>{
        let user = await db.users.findOne({userEmail:email});
        if(user){
            let flag = user.password != "" ? true : false;
            return flag
        }else{
            return false;
        }
    }
}