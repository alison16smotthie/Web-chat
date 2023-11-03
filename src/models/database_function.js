
function render_database(database,req,res, next, page){
    
    database.find({}).then(async (data) => { 
        data = await data.map(res => res.toObject());

        res.render(page,{data});
    }).catch(err =>{
        console.log(err);
        res.render('index.cl7');
    });
}

function render_toObjDB(mongoose){
    return mongoose ? mongoose.toObject() : mongoose;
}

function render_list_database(list_mongoose){
    return list_mongoose.map(mongoose => mongoose.toObject());
}

module.exports = {
    render_database,
    render_toObjDB,
    render_list_database,
};
























