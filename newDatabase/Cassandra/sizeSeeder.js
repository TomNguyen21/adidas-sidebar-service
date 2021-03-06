const fs = require('fs');
const v8 = require('v8');
const csv = require('csvtojson');
let fileindex = 1;
let csvFilePath = `./seedFiles/colorInfo10_${fileindex}.csv`;
let filename = `./seedFiles/sizeInfo10_${fileindex}.csv`;
let writeStream = fs.createWriteStream(filename);

let colorArray = ["WHITE", "BLACK", "GRAY", "RED", "BLUE", "BROWN", "MAROON", "YELLOW", "TAN", "CAMO", "BROWN", "RED", "WHITE", "BLUE", "BLACK", "GRAY"];
var url = [ "https://hr-front-end-capstone-adidas.s3-us-west-1.amazonaws.com/Carousel/Options/SuperStar_Black/superstar_Black.jpg","https://hr-front-end-capstone-adidas.s3-us-west-1.amazonaws.com/Carousel/Options/SuperStar_White/Superstar_white.jpg", "https://hr-front-end-capstone-adidas.s3-us-west-1.amazonaws.com/Carousel/Options/SuperStar_White_Sparkle/Superstar_White_Sparkle.jpg", "https://hr-front-end-capstone-adidas.s3-us-west-1.amazonaws.com/Carousel/Options/SuperStar_White_Silver/1.jpg", "https://hr-front-end-capstone-adidas.s3-us-west-1.amazonaws.com/Carousel/Options/SuperStar_White_Black/Superstar_White_Black.jpg" ];

let colorAmount = [3, 4, 2, 5, 2, 3, 4, 5, 3, 2, 6, 4, 3];
var sizeArray = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];
var quantityArray = [1, 2, 3, 4, 5, 1, 3, 2, 1, 1];



const writeLine = (writer, callback) => {
  csv()
  .fromFile(csvFilePath)
  .then((shoes) => {
    //declare file path
      let i = 0;
      let writing = () => {
        let ok = true;
        do {
          var shoe = shoes[i];
          var string = '';
          for (var j = 0; j < sizeArray.length; j++) {
            let shoe_id = shoe.id;
            let color = shoe.color;
            let size = sizeArray[j];
            let quantity = quantityArray[(i+j) % quantityArray.length];

            string += `${shoe_id},${color},${size},${quantity}\n`
          }
          if (i === shoes.length - 1) {
            writer.write(string, 'utf-8', callback);
          } else {
            ok = writer.write(string, 'utf-8')
          }
          if(i % 1000000 === 0) {
            console.log(`${i} shoes`)
          }
          i += 1;
        } while(i < shoes.length && ok)
        if (i < shoes.length) {
          // writeFile 2/ 3
          writer.once('drain', writing)
        }
      // return new Promise(function (resolve) {
      //   resolve(final_str)
      // })
      }
      writing();
    });
      // writeNtimes(writeStream, () => {
      //   console.log('size written!')
      //   writeStream.end();
      // })
};


// const writeStream = fs.createWriteStream(`./seedFiles/newColor${fileIdx}.csv`)
writeStream.write('id,color,size,quantity\n');
// writeNTimes 2/ 2
writeLine(writeStream, () => {
    console.log('size written! hopefully')
    writeStream.end();
  });