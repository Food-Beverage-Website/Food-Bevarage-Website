const { exec } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');

const startBackend = () => {
  exec('npm start', { cwd: backendPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting backend: ${error}`);
    } else {
      console.log(stdout);
    }
  });
};

const startFrontend = () => {
  exec('ng serve', { cwd: frontendPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting frontend: ${error}`);
    } else {
      console.log(stdout);
      
    }
  });

};

// Start backend and frontend concurrently
startBackend();
startFrontend();

const url = "http://localhost:4200/";
	console.log(`Frontend is running at ${url}`);