const path = require('path');
const fs = require('fs').promises;
const TelegramBot = require('node-telegram-bot-api');
const token = 'your_token'
const bot = new TelegramBot(token, {polling: true})
let download = require('download-file');


bot.on('document', async(message)=>{
   
try {
    const chatId=message.chat.id 
    const fileName=message.document.file_name
    bot.sendMessage(chatId, 'Document keldi')
  let a= await bot.getFile(message.document.file_id)
  let  url =`https://api.telegram.org/file/bot${token}/${a.file_path}`
  
let options = {
    directory: "./files",
    filename:fileName
}

    download(url, options, function(err){
    if (err) throw err
    
})  



const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert)
async function main() {
    let pdfName=null
    const ext = '.pdf'
    if(fileName.charAt(fileName.length-1)=='c'){
       pdfName=fileName.slice(0,fileName.length-4)+ext 
    }
    else{
       pdfName=fileName.slice(0,fileName.length-5)+ext 
    }
    console.log(pdfName);
    const inputPath = path.join(__dirname, `/files/${fileName}`);
    const outputPath = path.join(__dirname, `/resources/${pdfName}`)

    // Read file
    const docxBuf = await fs.readFile(inputPath)

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
    
  // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf)
    await bot.sendDocument(chatId, `resources/${pdfName}`)

}

main().catch(function (err) {
    console.log(`Error converting file: ${err}`);
});
      
  } catch (error) {
       console.log(error+"")
  }
})