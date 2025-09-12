// Transcripciòn de Audio 
const fs = require('node:fs');
const path = require('path');

async function transcribeAudio(audioFilePath, apikey) {
  try {
    // Verificar si el archivo existe
    if (!fs.existsSync(audioFilePath)) {
      throw new Error('Eñ archivo de audio no existe')
    }
    // Leer el archivo de audio
    const audioFIle = fs.readFileSync(audioFilePath);
    // Crear un blob con el contenido del archivo
    const blob = new Blob([audioFIle]);
    // Crear FormData para la solicitud
    const formData = new FormData();

    // Añadir el archivo y el modelo a FormData
    formData.append('file', blob, path.basename(audioFilePath));
    formData.append('model', 'whisper-1');

    // Realizar la solicitud a la API de Whisper
    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apikey}`
        },
        body: formData
      });

    // Verificar si la respuesta es correcta
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la API: ${JSON.stringify(errorData)}`)
    }

    // Obtener los datos de la respuesta
    const data = await response.json();
    const transcription = data.text;

    // Crear la ruta para el archivo de salida
    const outputFilePath = path.join(
      path.dirname(audioFilePath),
      path.basename(audioFilePath,
        path.extname(audioFilePath)) + '_transcription.txt'
    );

    // Guardar la transcripción en un archivo
    fs.writeFileSync(outputFilePath, transcription);

    console.log(`Transcripción guardada en ${outputFilePath}`);
    return transcription;

  } catch (error) {
    console.error('Error durante la transcripción:', error.message);
    throw error;
  }
}

const audioPath = './audio.mp3';
const openaiApiKey = "" //ERROR DE LA APIKEY / CREDITOS AGOTADOS

transcribeAudio(audioPath, openaiApiKey)
  .then(transcription => {
    console.log('Transcripción completada con éxito');
    console.log(transcription);
  })
  .catch(error => {
    console.error('Fallo en la transcripción', error);
  })

// -----------------------------




// path.dirname(): Obtiene el directorio de una ruta de archivo.
// path.basename(): Obtiene el nombre base de un archivo (sin la ruta).
// path.extname(): Obtiene la extensión de un archivo.
// path.join(): Une segmentos de ruta en una sola ruta.
