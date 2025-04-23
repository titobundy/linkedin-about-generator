#!/usr/bin/env node

// Script para buscar una imagen de alta calidad en Pexels relacionada con conexiones profesionales
const https = require('https');
const fs = require('fs');
const path = require('path');

// Reemplaza con tu API key de Pexels
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY';

// Función para hacer una solicitud HTTP
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Función para verificar si una URL es accesible
async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const statusCode = res.statusCode;
      res.resume(); // Liberar memoria
      resolve(statusCode >= 200 && statusCode < 300);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function main() {
  try {
    if (PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY') {
      console.error('Por favor, actualiza el script con tu API key de Pexels');
      process.exit(1);
    }

    console.log('Buscando imagen relacionada con conexiones profesionales...');
    const searchQuery = 'professional networking';
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`;
    
    const response = await makeRequest(searchUrl, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });
    
    if (response.data.photos && response.data.photos.length > 0) {
      const photo = response.data.photos[0];
      const imageUrl = photo.src.large2x; // Alta calidad
      const photographer = photo.photographer;
      
      console.log(`\nImagen encontrada:`);
      console.log(`URL: ${imageUrl}`);
      console.log(`Fotógrafo: ${photographer}`);
      console.log(`ID de Pexels: ${photo.id}`);
      
      // Verificar que la URL de la imagen es accesible
      console.log('\nVerificando que la imagen es accesible...');
      const isAccessible = await checkUrl(imageUrl);
      
      if (isAccessible) {
        console.log('\n✅ Imagen verificada y accesible');
        
        // Generar el código CSS
        const cssCode = `
/* Background image from Pexels */
body {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(243, 242, 239, 0.9)), url("${imageUrl}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Photo credit */
.photo-credit {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
  color: #666;
  text-decoration: none;
  z-index: 10;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  body {
    background-image: linear-gradient(to bottom, rgba(29, 34, 38, 0.7), rgba(29, 34, 38, 0.9)), url("${imageUrl}");
  }
  
  .photo-credit {
    color: #aaa;
  }
}
`;
        
        // Guardar el CSS generado en un archivo
        const cssPath = path.join(process.cwd(), 'src', 'app', 'background.css');
        fs.writeFileSync(cssPath, cssCode);
        
        console.log(`\nCódigo CSS generado y guardado en: ${cssPath}`);
        console.log('\nPara usar este fondo, añade la siguiente línea al archivo src/app/layout.tsx:');
        console.log('import "./background.css";');
        
        console.log('\nY añade el siguiente elemento al layout para dar crédito al fotógrafo:');
        console.log(`<a href="https://www.pexels.com/photo/${photo.id}" target="_blank" rel="noopener noreferrer" className="photo-credit">Photo by ${photographer} on Pexels</a>`);
      } else {
        console.error('\n❌ La imagen no es accesible');
      }
    } else {
      console.error('No se encontraron imágenes');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Ejecutar el script
main();