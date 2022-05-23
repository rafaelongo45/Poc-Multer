import cors from 'cors';
import multer from "multer";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const saveConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname)
  }
});

const upload = multer({storage: saveConfig})

app.post('/avatar', upload.single('image'), (req,res) => {
  const response = `<img src="${req.file.path}" />`;
  res.send(response)
});

app.listen('5000', console.log('rodando na porta 5000'));