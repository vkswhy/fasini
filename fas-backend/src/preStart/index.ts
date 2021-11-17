import path from 'path';
import dotenv from 'dotenv';
(() => {
    const result = dotenv.config({
        path: path.join(__dirname,`dev.env`)
    });
})();

