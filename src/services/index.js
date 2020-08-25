// Get Unique Brands from Json Data
export const getCategories = (products) => {
    var unique = [];
    products.map((product, index) => {
            // product.tags.map((tag) => {
        if (unique.indexOf(product.category) === -1) {
            unique.push(product.category);
            // })
        }
     })
    
    console.log(unique)
    return unique;
}


// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    let min = 10, max = 1000;

    products.map((product, index) => {
        let v = product.productPrice;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return {'min':min, 'max':max};
}

export const getlastweek = (products) => {
    var date = new Date();
    date.setDate(date.getDate()-7 )
    var finaldate = date.getFullYear()+'-'+0+parseInt(date.getMonth()+ 1)+'-'+date.getDate();
    var today=date(date.now())
    products.map((product, index) => {
        let v = product.Date;
        finaldate = (v.localeCompare( finaldate) )? v : finaldate;
        today = (v.localeCompare( today)) ? v : today;
    })

    return {'min':finaldate, 'max':today};
}

export const getVisibleproducts = (data, { category, value, sortBy }) => {
    console.log('category',category)
    return data.products.filter(product => {
        var brandMatch;

       
            for (var i=0;i<category.length;i++){
                brandMatch=(product.category.match(category[i]))
         
           

              }   
        console.log('brandmatch',brandMatch)
        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.productPrice;
        const endPriceMatch = typeof value.max !== 'number' || product.productPrice <= value.max;

        const startseven = typeof value.min !== 'String' || value.min .localeCompare( product.Date);
        const endseven = typeof value.max !== 'String' || product.Date.localeCompare( value.max);
        return brandMatch ||  startPriceMatch && endPriceMatch  ;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.productPrice < product1.productPrice ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.productPrice > product1.productPrice ? -1 : 1;
        }
        else if (sortBy === 'HighToLowRating') {
            return product2.rating < product1.rating ? -1 : 1;
        } 
        else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.productName.localeCompare(product2.productName);
        } else if (sortBy === 'DescOrder') {
            return product2.productName.localeCompare(product1.productName);
        } 
       else{
            return product2.id > product1.id ? -1 : 1;
        }
    });
}
// export const getVisibleproducts = (data, { category, value, sortBy }) => {
//     console.log(data);
//     console.log(category);
//     return data.products.filter(product => {
//              if(product.category)
//                 brandMatch = product.category.match(cat => category.includes(cat){ 
//                 return(
//                 item.match(product.category)
//                 )}
//             )
//         else
//             brandMatch = true;
       
//         const startPriceMatch = typeof value.min !== 'number' || value.min <= product.productPrice;
//         const endPriceMatch = typeof value.max !== 'number' ||product.productPrice <= value.max;
//         return product && brandMatch && startPriceMatch && endPriceMatch;
        
//     })
//     .sort((product1, product2) => {
//         if (sortBy === 'HighToLow') {
//             return product2.productPrice < product1.productPrice ? -1 : 1;
//         } else if (sortBy === 'LowToHigh') {
//             return product2.productPrice > product1.productPrice ? -1 : 1;
//         } else if (sortBy === 'Newest') {
//             return product2.id < product1.id ? -1 : 1;
//         } else if (sortBy === 'AscOrder') {
//             return product1.productName.localeCompare(product2.productName);
//         } else if (sortBy === 'DescOrder') {
//             return product2.productName.localeCompare(product1.productName);
//         } else{
//             return product2.id > product1.id ? -1 : 1;
//         }
         
//     });
        


    //     if(product.category)
    //         brandMatch = category.map((item)=>{
    //             return(
    //             item.match(product.category)
    //             )}
    //         )
    //     else
    //         brandMatch = true;

    //     const startPriceMatch = typeof value.min !== 'number' || value.min <= product.Price;
    //     const endPriceMatch = typeof value.max !== 'number' || product.productPrice <= value.max;

    //     return brandMatch && startPriceMatch && endPriceMatch;
    


export const getCartTotal = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseInt(cartItems[i].qty, 10)*parseInt((cartItems[i].productPrice), 10);
    }
    return total;
}



// Get Trending Collection
export const getTrendingCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,8)
}

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,5)
}

// Get TOP Collection
export const getTopCollection = products => {
    const items = products.filter(product => {
        return product.rating > 4;
    })
    return items.slice(0,8)
}


// Get Related Items
export const getRelatedItems = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })

    return items.slice(0,4)

}



// Get Best Seller
export const getBestSeller = (products,category) => {
    console.log('cat',category)
    const items = products.filter(product => {
        if(product.category === category){
            return product
        }
    })

    return items.slice(0,8)
}

export const getNewestProduct = (products) => {
    const items = products.filter(product => {
        let today = new Date();
        let final = today.getFullYear()+'-'+0+parseInt(today.getMonth()+1)+'-'+today.getDate();  
        console.log(final)        
        if(product.Date === final) {
            return product
        }
    })

    return items.slice(0,8)
}



// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element.id === id;
    })
    return items;
}


