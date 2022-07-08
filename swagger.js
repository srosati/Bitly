import autogen from 'swagger-autogen';

const swaggerAutogen = autogen();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles);
