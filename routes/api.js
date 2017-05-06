// var Menu = require("../models/menu")
var Company = require("../models/company")
var Category = require("../models/category")
var SubCategory = require("../models/subcategory")
var Item = require("../models/item")

// var Company = require("../models/company")

module.exports = function(app){

//create a new company
app.post("/company", function(req, res){    

    company_name = req.body.name;
    Company.create({"comapny_name" : company_name}, function(err, company){
        if (err) return res.json({status : "fasle" , msg : err})
        return res.json({status : "true" , msg : "Added the compny", data : company})
    })
});

app.get("/", function(req, res){
    return res.json({status : "true" , data : {"version" : "v0.01"}})

})





// app.post("/company", function(req, res){
//     console.log("incompany2")

//     company_name = req.body.comapny_name;


//     Company.create({"comapny_name" : company_name}, function(err){
//         if (err) return res.json({status : "fasle" , msg : err})
//         return res.json({status : "true" , msg : "Added the compny"})

//     })



// });


//create a category
app.post("/:_company_id/category/", function(req, res){
    company_id = req.params._company_id;

    category_name = req.body.name;


    Company.findById(company_id, function(err, foundCompany){
        if(err)  return res.json({status : "fasle" , msg : err})
        console.log(foundCompany)
        if(foundCompany != null){
            Category.create({"category_name": category_name, "company_id" : company_id}, function (err, category){
                 if (err) return res.json({status : "fasle" , msg : err})
                 foundCompany.categories.push(category._id)
                 foundCompany.save()
                return res.json({status : "true" , msg : "Added the category", res: category})
            });            
        }
        else{             
        return res.json({status : "false" , msg : "no such compny"})
        }
    });
});



// app.post("/cat", function(req, res){
//     console.log("incompany2")

//     company_id = req.body.company_id;

//     Company.findById(company_id, function(err, foundCompany){
//         if(err)  return res.json({status : "fasle" , msg : err})
//         console.log(foundCompany)
//         if(foundCompany != null){
//             Category.create({"category_name": "pizza"}, function (err, category){
//                  if (err) return res.json({status : "fasle" , msg : err})
//                  foundCompany.categories.push(category._id)
//                  foundCompany.save()
//                 return res.json({status : "true" , msg : "Added the category", res: category})
//             })
            
//         }
//         else{
             
//         return res.json({status : "false" , msg : "no such compny"})
//         }
//     })
// });



//create a sub-category



app.post("/:_company_id/:_category_id/sub_category", function(req, res){
    company_id = req.params._company_id;
    category_id = req.params._category_id;
    sub_category_name = req.body.name

    Company.findById(company_id, function(err, foundCompany){
        if(err)  return res.json({status : "fasle" , msg : err})
        
        if(foundCompany != null){
            Category.findById(category_id, function(err, foundCategory){
                if(err)  return res.json({status : "fasle" , msg : err})
                if(foundCategory != null){
                    SubCategory.create({"sub_category_name": sub_category_name, "category_id":category_id }, function(err, subCategories){
                        if(err)  return res.json({status : "fasle" , msg : err})
                        foundCategory.subCategories.push(subCategories._id)
                        foundCategory.save()
                        return res.json({status : "true" , msg : "Added the sub-category", data: subCategories})
                    })
                }
                else{
                    return res.json({status : "false" , msg : "no such category"})
                }
            })
        }
        else{
            return res.json({status : "false" , msg : "no such compny"})
        }
    })
})

// app.post("/subcat", function(req, res){
//     company_id = req.body.company_id;
//     category_id = req.body.category_id;

//     Company.findById(company_id, function(err, foundCompany){
//         if(err)  return res.json({status : "fasle" , msg : err})
//         // console.log(foundCompany)
//         if(foundCompany != null){
//             Category.findById(category_id, function(err, foundCategory){
//                 if(err)  return res.json({status : "fasle" , msg : err})
//                 if(foundCategory != null){
//                     SubCategory.create({"sub_category_name": "large"}, function(err, subCategories){
//                         if(err)  return res.json({status : "fasle" , msg : err})
//                         foundCategory.subCategories.push(subCategories._id)
//                         foundCategory.save()
//                         return res.json({status : "true" , msg : "Added the sub-category", res: category})
//                     })
//                 }
//             })
//         }
//     })
// })


//create a new Item

app.post("/:_comapny_id/:_category_id/:_sub_category_id/item", function(req, res){
    company_id = req.params._comapny_id;
    category_id = req.params._category_id;
    sub_cat_id = req.params._sub_category_id;
    item_name = req.body.item.name;
    item_price = req.body.item.price;
    item_currency = req.body.item.currency;

    Company.findById(company_id, function(err, foundCompany){
         if(err)  return res.json({status : "fasle" , msg : err})
         if(foundCompany != null){
             Category.findById(category_id, function(err, foundCategory){
                  if(err)  return res.json({status : "fasle" , msg : err})
                  if(foundCategory != null){
                      SubCategory.findById(sub_cat_id, function(err, foundSubCategory){
                           if(err)  return res.json({status : "fasle" , msg : err})
                           if(foundSubCategory != null){
                               Item.create({"name": item_name, "price": item_price, "currency": item_currency, "subCategory_id": sub_cat_id}, function(err, item){
                                    if(err)  return res.json({status : "fasle" , msg : err})
                                    foundSubCategory.items.push(item._id)
                                    foundSubCategory.save()
                                    return res.json({status : "true" , msg : "Added the sub-category", data: item})

                               })
                               
                           }
                           else{
                               return res.json({status : "false" , msg : "no such sub-category"})
                           }
                      })
                  }
                  else{
                      return res.json({status : "false" , msg : "no such category"})
                  }
             })
         }
         else{
             return res.json({status : "false" , msg : "no such compny"})
         }
    })


});




// app.post("/item", function(req, res){
//     company_id = req.body.company_id;
//     category_id = req.body.category_id;
//     sub_cat_id = req.body.sub_cat_id;

//     Company.findById(company_id, function(err, foundCompany){
//          if(err)  return res.json({status : "fasle" , msg : err})
//          if(foundCompany != null){
//              Category.findById(category_id, function(err, foundCategory){
//                   if(err)  return res.json({status : "fasle" , msg : err})
//                   if(foundCategory != null){
//                       SubCategory.findById(sub_cat_id, function(err, foundSubCategory){
//                            if(err)  return res.json({status : "fasle" , msg : err})
//                            if(foundSubCategory != null){
//                                Item.create({"name": "paratag", "price": 45.89, "currency": "INR"}, function(err, item){
//                                     if(err)  return res.json({status : "fasle" , msg : err})
//                                     foundSubCategory.items.push(item._id)
//                                     foundSubCategory.save()
//                                     return res.json({status : "true" , msg : "Added the sub-category", res: item})

//                                })
                               
//                            }
//                       })
//                   }
//              })
//          }
//     })


// });

//get categories
app.get("/company/:_company_id", function(req, res){
    company_id = req.params._company_id;
    console.log(company_id)
    Company.findById(company_id).populate({
        path : 'categories',
        model : 'Category',
        populate : {
            path : 'subCategories',
            model : 'SubCategory',
            populate : {
                path : 'items',
                model : 'Item'
            }
        }
    }).exec(function(err, data){
        return res.json({data})

    })

});


app.get("/company", function(req, res){
    Company.find(function(err, docs){
        return res.json(docs)
    })

})












    //other routes..
}


//http://localhost:4000/api/58f61a132d44240d085ca2fa/58f643382d44240d085ca2fb/58f643b7f459fc1b099266f0/item

