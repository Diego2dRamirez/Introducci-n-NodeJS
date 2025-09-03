const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require("picocolors");

// Carpeta de donde queremos enlistar los archivos
const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`❌ No se pudeo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filesPromisses = files.map(async file => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath);
    } catch (error) {
      console.error(`No se puede leer el archico ${filePath}`);
      process.exit(1)
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileSIze = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${pc.blue(fileType)} ${pc.white(file.padEnd(20))} ${pc.green(fileSIze.toString().padStart(10))} ${pc.red(fileModified)}`
  });

  const filesInfo = await Promise.all(filesPromisses)

  filesInfo.forEach(file => console.log(file))

}

ls(folder)
