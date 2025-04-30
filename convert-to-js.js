const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to convert a TypeScript file to JavaScript
function convertTsToJs(filePath) {
  // Skip if not a TypeScript file
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) {
    return;
  }

  console.log(`Converting ${filePath}`);

  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove TypeScript-specific syntax
  content = content
    // Remove import type statements
    .replace(/import\s+type\s+{[^}]*}\s+from\s+['"][^'"]*['"]/g, '')
    // Remove export type statements
    .replace(/export\s+type\s+[^;]*;/g, '')
    // Remove interface declarations
    .replace(/interface\s+[^{]*{[^}]*}/g, '')
    // Remove type declarations
    .replace(/type\s+[^=]*=\s*[^;]*;/g, '')
    // Remove type annotations from function parameters
    .replace(/:\s*[A-Za-z<>[\](){}|&,\s]*(?=[,)])/g, '')
    // Remove return type annotations
    .replace(/\)\s*:\s*[A-Za-z<>[\](){}|&,\s]*(?={)/g, ')')
    // Remove variable type annotations
    .replace(/:\s*[A-Za-z<>[\](){}|&,\s]*(?=[=;])/g, '')
    // Remove generic type parameters
    .replace(/<[^>]*>/g, '')
    // Remove 'as' type assertions
    .replace(/\s+as\s+[A-Za-z<>[\](){}|&,\s]*/g, '')
    // Remove any remaining TypeScript-specific syntax
    .replace(/declare\s+/g, '')
    .replace(/namespace\s+/g, '')
    .replace(/module\s+/g, '')
    .replace(/readonly\s+/g, '')
    .replace(/implements\s+[A-Za-z<>[\](){}|&,\s]*/g, '')
    .replace(/extends\s+[A-Za-z<>[\](){}|&,\s]*(?={)/g, '');

  // Determine the new file path
  const newFilePath = filePath
    .replace(/\.tsx$/, '.jsx')
    .replace(/\.ts$/, '.js');

  // Create the directory if it doesn't exist
  const dir = path.dirname(newFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the converted content to the new file
  fs.writeFileSync(newFilePath, content);

  // Delete the original TypeScript file
  fs.unlinkSync(filePath);

  console.log(`Converted ${filePath} to ${newFilePath}`);
}

// Main function to convert all TypeScript files in the src directory
function convertProject() {
  const srcPath = path.join(__dirname, 'src');
  const files = getAllFiles(srcPath);

  files.forEach(file => {
    convertTsToJs(file);
  });

  console.log('Conversion complete!');
}

// Run the conversion
convertProject();
