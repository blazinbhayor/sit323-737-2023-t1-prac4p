const express= require("express");
const res = require("express/lib/response");
const winston = require('winston');
const app= express();
app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculate-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

 // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Home page request
// curl http://localhost:3000/
app.get('/', (req, res) => {
  res.send("Welcome to Simple Calculator");
});

// curl http://localhost:3000/add/:num1/:num2
app.get('/add/:num1/:num2', (req, res) =>{
  try{
    const number1 = parseFloat(req.params.num1);
    const number2 = parseFloat(req.params.num2);

    if(isNaN(number1)) {
      logger.error("First number is incorrectly defined");
      throw new Error("Number 1 incorrectly defined");
  }
  if(isNaN(number2)) {
      logger.error("Second number is incorrectly defined");
      throw new Error("Number 2 incorrectly defined");
  }

  if (number1 === NaN || number2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+ number1 +' and '+number2+' received for addition');

    const result = number1 + number2;
    //res.send(result.toString());
    res.send("Addition Operation was used, and the result of " + number1 + " added with " + number2 + " is " + result);
    res.status(200).json({statuscode:200, data: result });
  } catch (error){
    res.send("An error occurred. Please check that you inputs are valid. " + error);
    res.status(500).json({statuscode:500, msg: error.toString() });
  }
});

app.get('/subtract/:num1/:num2', (req, res) =>{
  try{
    const number1 = parseFloat(req.params.num1);
    const number2 = parseFloat(req.params.num2);

    if(isNaN(number1)) {
      logger.error("First number is incorrectly defined");
      throw new Error("Number 1 incorrectly defined");
  }
  if(isNaN(number2)) {
      logger.error("Second number is incorrectly defined");
      throw new Error("Number 2 incorrectly defined");
  }

  if (number1 === NaN || number2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+ number1 +' and '+number2+' received for subtraction');

    const result = number1 - number2;
    //res.send(result.toString());
    console.log("Subtraction Operation was used, and the result of " + number1 + " subtracted from " + number2 + " is " + result);
    res.status(200).json({statuscode:200, data: result });
  } catch (error){
    res.send("An error occurred. Please check that you inputs are valid. " + error);
    res.status(500).json({statuscode:500, msg: error.toString() });
  }
});

app.get('/multiply/:num1/:num2', (req, res) =>{
  try{
    const number1 = parseFloat(req.params.num1);
    const number2 = parseFloat(req.params.num2);

    if(isNaN(number1)) {
      logger.error("First number is incorrectly defined");
      throw new Error("Number 1 incorrectly defined");
  }
  if(isNaN(number2)) {
      logger.error("Second number is incorrectly defined");
      throw new Error("Number 2 incorrectly defined");
  }

  if (number1 === NaN || number2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+ number1 +' and '+number2+' received for multiplication');

    const result = number1 * number2;
    //res.send(result.toString());
    console.log("Multiplication Operation was used, and the result of " + number1 + " multiplied by " + number2 + " is " + result);
    res.status(200).json({statuscode:200, data: result });
  } catch (error){
    res.send("An error occurred. Please check that you inputs are valid. " + error);
    res.status(500).json({statuscode:500, msg: error.toString() });
  }
});

app.get('/divide/:num1/:num2', (req, res) =>{
  try{
    const number1 = parseFloat(req.params.num1);
    const number2 = parseFloat(req.params.num2);

    if(isNaN(number1)) {
      logger.error("First number is incorrectly defined");
      throw new Error("Number 1 incorrectly defined");
  }
  if(isNaN(number2)) {
      logger.error("Second number is incorrectly defined");
      throw new Error("Number 2 incorrectly defined");
  }

  if (number1 === NaN || number2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }

  if (number2 == 0){
    logger.error("Second number is zero, and incorrectly defined");
    throw new Error("The second number cannot be zero");
  }

  logger.info('Parameters '+ number1 +' and '+number2+' received for division');

    const result = number1 / number2;
    //res.send(result.toString());
    console.log("Division Operation was used, and the result of " + number1 + " divided by " + number2 + " is " + result);
    res.status(200).json({statuscode:200, data: result });
  } catch (error){
    res.send("An error occurred. Please check that you inputs are valid. " + error);
    res.status(500).json({statuscode:500, msg: error.toString() });
  }
});

const port = 3000;
app.listen(port, () =>{
    console.log('Server is running on port: ' + port);
});