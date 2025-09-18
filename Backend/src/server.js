import {app} from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to connect to DB", error);
});