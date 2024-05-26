import mongoose, { connect } from "mongoose";

const connectDatabase = () => {
    console.log('Conectando...');

    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Atlas Conectado'))
        .catch((err) => { console.log(err) });
};

export default connectDatabase;