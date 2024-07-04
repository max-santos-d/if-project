import mongoose, { connect } from "mongoose"; // ou imprtar direto - import {connect} from "mongoose";

export default () => {
    return new Promise((resolve, regect) => {

        console.log('Conectando...');
        
        mongoose.connect(process.env.MONGO_URI)
            .then(() => resolve(console.log('MongoDB Atlas Conectado')))
            .catch((err) => regect (console.log(err)) )    
    });    
};
