command I used:
- `npm create vite@latest client`
- `npm install`
- `npm install tailwindcss @tailwindcss/vite` (https://tailwindcss.com/docs/installation/using-vite)
- `npm run dev`
- `npm i react-router-dom`
- `npm init -y`

Create the server:
- Create an api folder in the root directory.
- Run `npm i express` in the root directory.
- Create an `index.js` file inside the api folder.
- Install Nodemon: `npm i nodemon`
- Add the following script to your `package.json`

Connect to the database:
- `npm i mongoose` in root directory.
- `npm i dotenv` , use this tool to load env var in the file of .env . Example: `dotenv.config(); mongoose.connect(process.env.MONGODB)`,  add `.env` file to the root directory and add the MONGODB variable.