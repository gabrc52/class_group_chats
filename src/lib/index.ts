// place files you want to import through the `$lib` alias in this folder.

import { MATRIX_TOKEN } from '$env/static/private';
import * as matrix from 'matrix-js-sdk';

export const matrixClient = matrix.createClient({ 
    baseUrl: 'https://matrix-synapse.mit.edu',
    accessToken: MATRIX_TOKEN,
});