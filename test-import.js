const path = require('path');
const fullPath = path.resolve(__dirname, 'lib/supabase');
console.log('Looking for:', fullPath);
console.log('Exists:', require('fs').existsSync(fullPath));
