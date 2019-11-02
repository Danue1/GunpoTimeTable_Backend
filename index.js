// https://github.com/notkimwol/GunpoTimeTable_BackEnd.git

const koa = require('koa');
const app = new koa();

const Timetable = require('comcigan-parser');
const timetable = new Timetable();

app.listen(4000, ()=>{
   console.log('koa in 4000');
});