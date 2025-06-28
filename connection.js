const mongoose=require("mongoose");

async function connectmdb(url) {
    return mongoose.connect(url)

}

module.exports={
    connectmdb,
};
